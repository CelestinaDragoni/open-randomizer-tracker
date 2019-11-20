import React from "react";
import Standard from './layouts/standard';
import Config from './config.json';
import {RootContext} from '../../context/RootContext';

export default class Module_Zelda1 extends React.Component {

    static contextType = RootContext;
    static instance = null;

    config = null;
    currentLayout = null;
    
    constructor() {
        super();
    }

    render() {

        const moduleLayout = this.context.config.moduleLayout;

        let layoutComponent = null;
        switch(moduleLayout) {
        default:
            layoutComponent = <Standard config={Config}/>;
        }

        return layoutComponent;

    }

}
