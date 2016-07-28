/// <reference path="../../lib/typings/index.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom";

import { IListener, IStore } from "./store/abstractions"

export abstract class Renderer implements IListener {

    public constructor(protected store: IStore, protected rootElementId: string) {
        store.subscribe(this);
    }

    protected getRootDiv(): HTMLElement {
        var rootDiv = document.getElementById(this.rootElementId);
        if(!rootDiv) {
            rootDiv = document.createElement("div");
            rootDiv.id = this.rootElementId;
            document.body.appendChild(rootDiv);
        }
        return rootDiv;
    }

    public abstract render(): void;

    public onStateChanged() {
        this.render();
    }
}