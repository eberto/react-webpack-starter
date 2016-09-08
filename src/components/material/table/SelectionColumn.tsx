import * as React from "react"
import Checkbox from "material-ui/Checkbox"
import { assign } from "lodash"

export interface ISelectionColumnProps {
    modelProp?: string;
    width?: number|string;
    minWidthVisible?: number;
    onSelect?: (entry: any) => any;
    data?: Array<boolean>;
    bodyCellStyle?: React.CSSProperties;
}

export class SelectionColumn extends React.Component<ISelectionColumnProps, {}> {

    private getStyles() {
        var cellStyle = {
            boxSizing: "border-box",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            borderBottom: "1px solid #E0E0E0"
        };
        return {
            colStyle: {
                boxSizing: "border-box",
                display: "inline-block",
                width: this.props.width
            },
            headerCellStyle: assign({}, {
                height: 56,
                lineHeight: "56px",
                fontSize: "12px",
                color: "rgb(158, 158, 158)",
                position: "relative"
            }, cellStyle),
            bodyCellStyle: assign({}, {
                color: "#272727",
                height: 48,
                lineHeight: "48px",
                fontSize: "13px",
                position: "relative"
            }, cellStyle, this.props.bodyCellStyle),
            checkboxStyle: {
                height: 24,
                margin: "auto",
                position: "absolute",
                left: 21,
                right: 0,
                top: 0,
                bottom: 0
            },
        };
    }

    render(): JSX.Element {

        const { colStyle, headerCellStyle, bodyCellStyle, checkboxStyle } = this.getStyles();

        return <div style={colStyle}>
            <div style={headerCellStyle}><Checkbox style={checkboxStyle} /></div>
            {this.props.data.map((d: boolean, i: number) => <div style={bodyCellStyle} key={"check_"+i}><Checkbox style={checkboxStyle} /></div>)}
        </div>
    }
}