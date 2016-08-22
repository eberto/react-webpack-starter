import * as React from "react"

export interface ITextColumnProps {
    modelProp?: string;
    width?: number|string;
    minWidthVisible?: number;
    onSelect?: (entry: any) => any;
}

export class SelectionColumn extends React.Component<ITextColumnProps, {}> {

    render(): JSX.Element {
        return <div />
    }
}