import * as React from "react"
import { assign } from "lodash"

export interface ITextColumnProps {
    headerText?: string;
    hoverText?: string;
    modelProp?: string;
    width?: number|string;
    minWidthVisible?: number;
    bodyCellStyle?: React.CSSProperties;
    headerCellStyle?: React.CSSProperties;
    data?: Array<string>;
}

export class TextColumn extends React.Component<ITextColumnProps, {}> {

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
            }, cellStyle, this.props.headerCellStyle),
            bodyCellStyle: assign({}, {
                color: "#272727",
                height: 48,
                lineHeight: "48px",
                fontSize: "13px",
            }, cellStyle, this.props.bodyCellStyle)
        };
    }

    render(): JSX.Element {

        const { colStyle, headerCellStyle, bodyCellStyle } = this.getStyles();

        return (
            <div style={colStyle}>
                {this.props.headerText && <div style={headerCellStyle}>{this.props.headerText}</div>}
                {this.props.data.map((d: string, i: number) => <div style={bodyCellStyle} key={"text_"+i}>{d}</div>)}
            </div>
        );
    }
}