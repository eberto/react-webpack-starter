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
    headerStyle: React.CSSProperties;
    bodyStyle: React.CSSProperties;
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

    public getStyles(): any {
        var rowStyle = {
            boxSizing: "border-box",
            display: "block",
            borderBottom: "1px solid #E0E0E0",
            whiteSpace: "nowrap",
            overflow: "hidden"
        };
        var cellStyle = {
            boxSizing: "border-box",
            display: "inline-block",
            textAlign: "left",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            paddingLeft: 0,
            paddingRight: 0,
            position: "relative"
        };
        var headerCellStyle = assign({}, {
            height: 56,
            lineHeight: "56px",
            fontSize: "12px",
            color: "rgb(158, 158, 158)",
        }, cellStyle);
        return {
            tableStyle: {
                width: "100%",
                paddingLeft: 0,
                paddingRight: 0,
                display: "block"
            },
            titleStyle: {
                height: 62,
                lineHeight: "62px",
                fontSize: 20,
                marginLeft: 23
            },
            headerRowStyle: assign({}, {
                height: 56
            }, rowStyle),
            bodyRowStyle: assign({}, {
                color: "#272727",
                height: 48
            }, rowStyle),
            footerRowStyle:  assign({
                height: 56
            }, rowStyle),
            headerCellStyle: headerCellStyle,
            bodyCellStyle: assign({}, {
                height: 48,
                lineHeight: "48px",
                fontSize: "13px",
            }, cellStyle),
            footerCellStyle: assign({}, headerCellStyle),
            checkboxStyle: {
                height: 24,
                margin: "auto",
                position: "absolute",
                left: 21,
                right: 0,
                top: 0,
                bottom: 0
            },
            actionButtonStyle: {
                minWidth: 0,
                color: "rgb(158, 158, 158)"
            }
        };
    }

    public render(): JSX.Element {
        const {
            tableStyle,
            titleStyle,
            headerRowStyle,
            bodyRowStyle,
            footerRowStyle,
            footerCellStyle,
            checkboxStyle,
            actionButtonStyle
        } = this.getStyles();

        const theme = getMuiTheme({
            checkbox: {
                boxColor: "#757575"
            }
        });
        var children = this.props.children as any[];
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
                    <div style={tableStyle}>
                        {this.props.title && <div style={titleStyle}>{this.props.title}</div>}
                        <div style={headerRowStyle}>
                            {children.map((child: any, i: number) =>
                                this.colsData[i].isVisible &&
                                <div key={"header_"+i} style={this.colsData[i].headerStyle}>
                                    {child.type.name === "SelectionColumn" && <Checkbox style={checkboxStyle} />}
                                    {child.type.name === "TextColumn" && child.props.headerText || ""}
                                </div>
                            )}
                        </div>
                        {this.props.data.map((entry: any, i: number) =>
                            <div key={"row_"+i} style={bodyRowStyle}>
                                {children.map((child: any, j: number) =>
                                    this.colsData[j].isVisible &&
                                    <div key={"cell_"+i+"_"+j} style={this.colsData[j].bodyStyle}>
                                        {child.type.name === "SelectionColumn" && <Checkbox style={checkboxStyle} />}
                                        {child.type.name === "TextColumn" && entry[child.props.modelProp] || ""}
                                        {child.type.name === "ActionsColumn" && child.props.onEdit && <FlatButton icon={<EditorModeEdit color={actionButtonStyle.color} />} style={actionButtonStyle} />}
                                        {child.type.name === "ActionsColumn" && child.props.onDelete && <FlatButton icon={<ActionDelete color={actionButtonStyle.color} />} style={actionButtonStyle} />}
                                    </div>
                                )}
                            </div>
                        )}
                        <div style={footerRowStyle}>
                            <div style={footerCellStyle}>
                                Pagination
                            </div>
                        </div>
                    </div>
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
                headerStyle: {},
                bodyStyle: {}
            };
        });
        var variableWidth = totalWidth - visibleFixedSum;
        var avgAvailableWidth = invisibleVariableTotalWidth > 0? (invisibleVariableTotalWidth * variableWidth / 100)  / visibleVariableCount : 0;

        const {
            headerCellStyle,
            bodyCellStyle
        } = this.getStyles();

        children.forEach((child: any, i: number) => {
            var colWidth = DataTable.calcColWidth(totalWidth, variableWidth, avgAvailableWidth, child.props.width);
            this.colsData[i].headerStyle = assign({}, headerCellStyle, {width: colWidth}, child.props.headerCellStyle);
            this.colsData[i].bodyStyle = assign({}, bodyCellStyle, {width: colWidth}, child.props.cellStyle);
            if(child.type.name === "ActionsColumn") {
                this.colsData[i].bodyStyle.textAlign = "right";
                this.colsData[i].bodyStyle.paddingRight = 19;
            }
        });
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