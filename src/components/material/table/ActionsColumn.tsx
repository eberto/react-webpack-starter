import * as React from "react"

export interface IActionsColumnProps {
    onEdit?: (entry: any) => any;
    onDelete?: (entry: any) => any;
    width?: number|string;
    minWidthVisible?: number;
}

export class ActionsColumn extends React.Component<IActionsColumnProps, {}> {

    render(): JSX.Element {
        return <div />
    }
}