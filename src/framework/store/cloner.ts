
import { ICloner } from "./abstractions"

export class Cloner implements ICloner {

    private mixin(dest: any, src: any, copyFunc: Function) {
        var self = this;

        var name: any;
        var s: any;
        var i: any;
        var empty: any = {};
		for(name in src){
			// the (!(name in empty) || empty[name] !== s) condition avoids copying properties in "source"
			// inherited from Object.prototype.	 For example, if dest has a custom toString() method,
			// don't overwrite it with the toString() method that source inherited from Object.prototype
			s = src[name];
			if(!(name in dest) || (dest[name] !== s && (!(name in empty) || empty[name] !== s))){
				dest[name] = copyFunc ? copyFunc.call(this, s) : s;
			}
		}
		return dest;
    } 

    public clone(source: any): any {
        var self = this;

        var src = <any>source;
        if(!src || typeof src != "object" || Object.prototype.toString.call(src) === "[object Function]"){
            // null, undefined, any non-object, or function
            return src;	// anything
        }
        if((<any>src).nodeType && "cloneNode" in src){
            // DOM Node
            return src.cloneNode(true); // Node
        }
        if(src instanceof Date){
            // Date
            return new Date(src.getTime());	// Date
        }
        if(src instanceof RegExp){
            // RegExp
            return new RegExp(src);   // RegExp
        }
        var r: any;
        var i: any;
        var l: any;
        if(src instanceof Array){
            // array
            r = [];
            for(i = 0, l = src.length; i < l; ++i){
                if(i in src){
                    r.push(this.clone(src[i]));
                }
            }
            // we don't clone functions for performance reasons
            //		}else if(d.isFunction(src)){
            //			// function
            //			r = function(){ return src.apply(this, arguments); };
        }else{
            // generic objects
            r = src.constructor ? new src.constructor() : {};
        }
        return this.mixin(r, src, this.clone);
    }
}