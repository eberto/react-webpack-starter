import * as React from "react"
import {assign} from "lodash"
import FlatButton from "material-ui/FlatButton"
import ActionDelete from "material-ui/svg-icons/action/delete"
import EditorModeEdit from "material-ui/svg-icons/editor/mode-edit"

export interface IActionsColumnProps {
    onEdit?: (entry: any) => any;
    onDelete?: (entry: any) => any;
    width?: number|string;
    minWidthVisible?: number;
    data?: Array<boolean>;
}

export class ActionsColumn extends React.Component<IActionsColumnProps, {}> {

    private getStyles() {
        var cellStyle = {
            boxSizing: "border-box",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            borderBottom: "1px solid #E0E0E0",
            textAlign: "right",
            paddingRight: 21
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
            }, cellStyle),
            actionButtonStyle: {
                minWidth: 0,
                    color: "rgb(158, 158, 158)"
            }
        };
    }


    render(): JSX.Element {

        const { colStyle, headerCellStyle, bodyCellStyle, actionButtonStyle } = this.getStyles();

        return <div style={colStyle}>
            <div style={headerCellStyle} />
            {this.props.data.map((d: boolean, i: number) => <div style={bodyCellStyle} key={"check_"+i}>
                {this.props.onEdit && <FlatButton icon={<EditorModeEdit color={actionButtonStyle.color} />} style={actionButtonStyle} />}
                {this.props.onDelete && <FlatButton icon={<ActionDelete color={actionButtonStyle.color} />} style={actionButtonStyle} />}
            </div>)}
        </div>
    }
}