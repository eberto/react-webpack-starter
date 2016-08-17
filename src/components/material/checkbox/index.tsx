/// <reference path="../../../../lib/typings/index.d.ts" />

import * as React from "react"

export interface ICheckboxProps {

}

export interface ICheckboxState {

}

export class Checkbox extends React.Component<ICheckboxProps, ICheckboxState> {

    public render(): JSX.Element {
        var inputStyle = {
            position: "absolute",
            left: -9999
        };
        var fakeInputStyle = {
            border: "2px solid black",
            borderRadius: 3,
            width: 14,
            height: 14
        };
        var containerStyle = {
            position: "relative"
        };
        return (
            <div style={containerStyle}>
                <input style={inputStyle} type="checkbox" />
                <div style={fakeInputStyle}></div>
                <label>Hello</label>
            </div>
        );
    }
}