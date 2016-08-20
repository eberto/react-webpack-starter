import * as React from "react"

export interface ITextColumnProps {
    headerText?: string;
    hoverText?: string;
    modelProp?: string;
    width?: number|string;
    minWidthVisible?: number;
}

export class TextColumn extends React.Component<ITextColumnProps, {}> {

    render(): JSX.Element {

        return (
            <tr>Blah</tr>
        );
    }
}