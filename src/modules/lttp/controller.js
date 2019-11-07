import React from "react";

import Keysanity from './layouts/keysanity';
import Standard from './layouts/standard';

import Config from './config.json';

import {RootContext} from '../../context/RootContext';

export default class Module_LinkToThePast_Controller extends React.Component {

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
        case 'keysanity-triforce':
            layoutComponent = <Keysanity config={Config} triforce/>;
            break;
        case 'keysanity':
            layoutComponent = <Keysanity config={Config}/>;
            break;
        case 'standard-triforce':
            layoutComponent = <Standard config={Config} triforce/>;
            break;
        default:
            layoutComponent = <Standard config={Config}/>;
        }

        return layoutComponent;

    }

}
