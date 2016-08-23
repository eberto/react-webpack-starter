import * as React from "react"
import * as Measure from "react-measure"
import {assign} from "lodash"
import Checkbox from "material-ui/Checkbox"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import getMuiTheme from "material-ui/styles/getMuiTheme"
import FlatButton from "material-ui/FlatButton"
import ActionDelete from "material-ui/svg-icons/action/delete"
import EditorModeEdit from "material-ui/svg-icons/editor/mode-edit"

export interface IDataTableProps {
    title?: string;
    data: Array<any>;
}

export interface IDataTableState {
    totalWidth: number;
}

interface IColData {
    isVisible: boolean;
    style: React.CSSProperties;
}

export class DataTable extends React.Component<IDataTableProps, IDataTableState> {
    colsData: Array<IColData> = [];
    measuringFirstTime: boolean;

    public constructor() {
        super();
        this.state = { totalWidth: 0 };
        this.measuringFirstTime = true;
    }

    public componentWillMount() {
        this.setColStyles();
    }

    public render(): JSX.Element {
        var tableStyle = {
            tableLayout: "fixed",
            width: "100%"
        };
        var titleStyle = {
            height: 62,
            lineHeight: "62px",
            fontSize: 20
        };
        const theme = getMuiTheme({
            checkbox: {
                boxColor: "#757575"
          },
        });
        //<Checkbox style={{marginLeft: 21, width: 20}} inputStyle={{width: 20}} labelStyle={{width: 20}} />
        return (
            <MuiThemeProvider muiTheme={theme}>
                <Measure whitelist={["width"]}
                    onMeasure={(dimensions: any) => {
                        if(dimensions.width > 0 && this.state.totalWidth !== dimensions.width) {
                            if(this.measuringFirstTime) {
                                this.measuringFirstTime = false;
                                return;
                            }
                            this.setColStyles(dimensions.width);
                            this.setState({totalWidth: dimensions.width});
                        }
                    }}>
                    <table style={tableStyle} cellSpacing={0}>
                        <thead>
                            {this.props.title? <tr><td style={titleStyle}><span style={{marginLeft: 23}}>{this.props.title}</span></td></tr> : false}
                            <tr>
                                {(this.props.children as any[]).map((child: any, i: number) => {
                                    if(!this.colsData[i].isVisible) return false;
                                    var thStyle = assign({}, this.colsData[i].style, {height: 55});
                                    switch(child.type.name) {
                                        case "SelectionColumn":
                                            return false;
                                            //return <th key={"th_"+i} style={assign({}, thStyle, {paddingLeft: 0})}>Blah</th>;
                                        case "TextColumn":
                                            return <th key={"th_"+i} style={thStyle}>{child.props.headerText || ""}</th>;
                                        case "ActionsColumn":
                                                return <td key={"td_"+i} style={thStyle}>&nbsp;</td>;
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
                                        var tdStyle = assign({}, this.colsData[j].style, {height: 47, lineHeight: "47px"});
                                        switch(child.type.name) {
                                            case "SelectionColumn":
                                                return <td key={"td_"+j} style={assign({}, tdStyle, {paddingLeft: 0})}>Blah</td>;
                                            case "TextColumn":
                                                return <td key={"td_"+j} style={tdStyle}>{entry[child.props.modelProp] || ""}</td>;
                                            case "ActionsColumn":
                                                return <td key={"td_"+j} style={assign({}, tdStyle, {textAlign: "right"})}>
                                                    {child.props.onEdit? <FlatButton icon={<EditorModeEdit color="rgb(158, 158, 158)" />} style={{minWidth: 0}} /> : false}
                                                    {child.props.onDelete? <FlatButton icon={<ActionDelete color="rgb(158, 158, 158)" />} style={{minWidth: 0}} /> : false}
                                                </td>;
                                            default:
                                                return false;
                                        }
                                    })}
                                </tr>
                            )}
                            <tr className="last-row">
                                <td>Pagination</td>
                            </tr>
                        </tbody>
                    </table>
                </Measure>
            </MuiThemeProvider>
        );
    }

    private setColStyles(totalWidth?: number): void {
        if(!this.props.children) return;
        var children = this.props.children as any[];
        var visibleFixedSum = 0;
        var invisibleVariableTotalWidth = 0;
        var visibleVariableCount = 0;
        this.colsData = children.map((child: any, i: number) => {
            var width = child.props.width;
            var isVisible = !child.props.minWidthVisible || child.props.minWidthVisible < totalWidth;
            if(typeof width === "number" && isVisible) {
                visibleFixedSum += width;
            }
            else if(typeof width === "string") {
                if(!isVisible) {
                    invisibleVariableTotalWidth += parseInt(width.substring(0, width.length - 1));
                }
                else {
                    visibleVariableCount++;
                }
            }
            return { 
                isVisible: isVisible,
                style: {
                    paddingLeft: 5,
                    paddingRight: 5,
                    paddingTop: 0,
                    paddingBottom: 0,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    borderBottom: "1px solid rgb(224, 224, 224)"
                }
            };
        });
        var variableWidth = totalWidth - visibleFixedSum;
        var avgAvailableWidth = invisibleVariableTotalWidth > 0? invisibleVariableTotalWidth / visibleVariableCount : 0;
        children.forEach((child: any, i: number) =>
            this.colsData[i].style.width = DataTable.calcColWidth(totalWidth, variableWidth, avgAvailableWidth, child.props.width)
        );
    }

    private static calcColWidth(totalWidth: number, variableWidth: number, avgAvailableWidth: number, width: number|string): any {
        var result = width;
        if(typeof width === "string") {
            var withNum = parseInt(width.substring(0, width.length - 1)) / 100;
            var pixels = withNum * variableWidth + avgAvailableWidth;
            result = (pixels * 100 / totalWidth) + "%";
        }
        return result;
    }
}