import * as React from "react"
import * as Measure from "react-measure"
import Checkbox from "material-ui/Checkbox"

export interface IDataTableProps {
    data: Array<any>;
}

export interface IDataTableState {
    totalWidth: number;
}

interface IColData {
    style: React.CSSProperties;
    isVisible?: boolean;
}

export class DataTable extends React.Component<IDataTableProps, IDataTableState> {
    colsData: Array<IColData> = [];
    colsCount: number;

    constructor() {
        super();
        this.state = { totalWidth: 0 };
    }

    componentWillMount(nextProps: IDataTableProps) {
        this.setColStyles();
    }

    render(): JSX.Element {
        var tableStyle = {
            tableLayout: "fixed",
            border: "2px solid red",
            width: "100%"
        };
        return (
            <Measure whitelist={["width"]}
                onMeasure={(dimensions: any) => {
                    if(dimensions.width > 0) {
                        this.setColStyles(dimensions.width);
                        this.setState({totalWidth: dimensions.width});
                    }
                }}>
                <table style={tableStyle}>
                    <thead>
                        <tr>
                            {(this.props.children as any[]).map((child: any, i: number) => {
                                if(!this.colsData[i].isVisible) return false;
                                switch(child.type.name) {
                                    case "SelectionColumn":
                                        return <th key={"th_"+i} style={this.colsData[i].style}><Checkbox /></th>;
                                    case "TextColumn":
                                        return <th key={"th_"+i} style={this.colsData[i].style}>{child.props.headerText || ""}</th>;
                                    default:
                                        return false;
                                }
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.data.map((entry: any, i: number) =>
                            <tr key={"tr_"+i}>
                                {(this.props.children as any[]).map((child: any, j: number) => {
                                    if(!this.colsData[j].isVisible) return false;
                                    switch(child.type.name) {
                                        case "SelectionColumn":
                                            return <td key={"td_"+j} style={this.colsData[j].style}><Checkbox /></td>;
                                        case "TextColumn":
                                            return <td key={"td_"+j} style={this.colsData[j].style}>{entry[child.props.modelProp] || ""}</td>;
                                        default:
                                            return false;
                                    }
                                })}
                            </tr>
                        )}
                        <tr>
                            <td>{this.state.totalWidth}</td>
                        </tr>
                        <tr className="last-row">
                            <td>Pagination</td>
                        </tr>
                    </tbody>
                </table>
            </Measure>
        );
    }
    setColStyles(totalWidth?: number): void {
        for(var index = 0; index < (this.props.children as any[]).length; index++) {
            this.colsData.push({
                style: {
                    paddingLeft: 5,
                    paddingRight: 5,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                },
                isVisible: true
            });
        }
    }

    //----------

    isColVisible(totalWidth: number, colData: IColData) {
        var minVisibleWidth = colData.minVisibleContainerWidth;
        return !minVisibleWidth || totalWidth > minVisibleWidth;
    }
    sumFixed(): number {
        var result = 0;
        this.colsData.forEach((colData: IColData) => {
            var width = colData.width;
            if(typeof width === "number" && colData.isVisible) {
                result += width;
            }
        });
        return result;
    }
    avgVariableAvailableWidth(): number {
        var invisibleVariableTotalWidth = 0;
        var visibleColsCount = 0;
        this.colsData.forEach((colData: IColData) => {
            var width = colData.width;
            if(typeof width === "string") {
                if(!colData.isVisible) {
                    invisibleVariableTotalWidth += parseInt(width.substring(0, width.length - 1));
                }
                else {
                    visibleColsCount++;
                }
            }
        });
        return invisibleVariableTotalWidth > 0? invisibleVariableTotalWidth / visibleColsCount : 0;
    }
    calcColWidth(totalWidth: number, variableWidth: number, avgAvailableWidth: number, width: number|string): any {
        var result = width;
        if(typeof width === "string") {
            var withNum = parseInt(width.substring(0, width.length - 1)) / 100;
            var pixels = withNum * variableWidth + avgAvailableWidth;
            result = (pixels * 100 / totalWidth) + "%";
        }
        return result;
    }
    setColStyles(totalWidth: number): void {
        this.colsData.forEach((colData: IColData) => colData.isVisible = this.isColVisible(totalWidth, colData));
        var variableWidth = totalWidth - this.sumFixed();
        var avgAvailableWidth = this.avgVariableAvailableWidth();
        this.colsData.forEach((colData: IColData) => colData.style = {
            paddingLeft: 5,
            paddingRight: 5,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: this.calcColWidth(totalWidth, variableWidth, avgAvailableWidth, colData.width)
        });
    }
}