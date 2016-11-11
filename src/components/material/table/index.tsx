import * as React from "react"
import * as Measure from "react-measure"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import getMuiTheme from "material-ui/styles/getMuiTheme"
import {TextColumn} from "./TextColumn"
import {SelectionColumn} from "./SelectionColumn"
import {ActionsColumn} from "./ActionsColumn"

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
    width?: number;
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
        return {
            tableStyle: {
                width: "100%",
                display: "block",
                whiteSpace: "nowrap",
                overflow: "hidden"
            },
            titleStyle: {
                height: 62,
                lineHeight: "62px",
                fontSize: 20,
                marginLeft: 23
            }
        };
    }

    public render(): JSX.Element {
        const {
            tableStyle,
            titleStyle
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
                            this.setColStyles(dimensions.width);
                            this.setState({totalWidth: dimensions.width});
                        }
                    }}>
                    <div style={tableStyle}>
                        {this.props.title && <div style={titleStyle}>{this.props.title}</div>}
                        {children.map((child: any, i: number) => {
                            if(this.colsData[i].isVisible) {
                                if (child.type.name === "TextColumn") {
                                    return <TextColumn key={"text_"+child.props.modelProp} {...child.props}
                                                       width={this.colsData[i].width}
                                                       data={this.props.data.map((entry: any) => entry[child.props.modelProp] || "")}/>
                                }
                                else if (child.type.name === "SelectionColumn") {
                                    return <SelectionColumn key={"selection_"+child.props.modelProp} {...child.props}
                                                       width={this.colsData[i].width}
                                                       data={this.props.data.map((entry: any) => false /*TODO: get a selection prop*/)}/>
                                }
                                else if (child.type.name === "ActionsColumn") {
                                    return <ActionsColumn key={"actions_"+child.props.modelProp} {...child.props}
                                                            width={this.colsData[i].width}
                                                            data={this.props.data.map((entry: any) => false /*TODO: pass other stuff */)}/>
                                }
                                return child;
                            }
                        })}

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
        children.forEach((child: any, i: number) =>
            this.colsData[i].width = DataTable.calcColWidth(totalWidth, variableWidth, avgAvailableWidth, child.props.width)
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