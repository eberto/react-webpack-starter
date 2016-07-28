
import { ICloner } from "./"

export class Cloner implements ICloner {

    private mixin(dest: any, source: any, copyFunc: Function) {
        var propName: string;
        var propValue: any;
        var empty: any = {};
		for(propName in source) {
			propValue = source[propName];
			if(!(propName in dest) || (dest[propName] !== propValue && (!(propName in empty) || empty[propName] !== propValue))) {
				dest[propName] = copyFunc ? copyFunc.call(this, propValue) : propValue;
			}
		}
		return dest;
    } 

    public clone(source: any): any {
        if(!source || typeof source != "object" || Object.prototype.toString.call(source) === "[object Function]") {
            // null, undefined, any non-object, or function
            return source;
        }
        if(source.nodeType && "cloneNode" in source) {
            // DOM Node
            return source.cloneNode(true);
        }
        if(source instanceof Date) {
            return new Date(source.getTime());
        }
        if(source instanceof RegExp) {
            return new RegExp(source);
        }
        if(source instanceof Array) {
            var arrayCopy = new Array<any>();
            for(var i = 0, l = source.length; i < l; ++i) {
                if(i in source) {
                    arrayCopy.push(this.clone(source[i]));
                }
            }
            return arrayCopy;
        } 
        else {
            // generic objects
            var objectCopy = source.constructor ? new source.constructor() : {};
            return this.mixin(objectCopy, source, this.clone);
        }
    }
}