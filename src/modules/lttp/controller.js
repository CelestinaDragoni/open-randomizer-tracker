import React from "react";
import clone from 'clone';

import KeysanityTriforce from './layouts/keysanity-triforce';
import Keysanity from './layouts/keysanity';
import StandardTriforce from './layouts/standard-triforce';
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
        this.config = Config;
    }

    componentWillMount() {
        this.currentLayout = this.context.config.moduleLayout;
    }

    componentWillUnmount() {
        this.state = {};
        this.currentLayout = null;
    }

    render() {

        const moduleLayout = this.context.config.moduleLayout;

        let layoutComponent = null;
        switch(moduleLayout) {
            case 'keysanity-triforce':
                layoutComponent = <KeysanityTriforce controller={this}/>;
                break;
            case 'keysanity':
                layoutComponent = <Keysanity controller={this}/>;
                break;
            case 'standard-triforce':
                layoutComponent = <StandardTriforce controller={this}/>;
                break;
            default:
                layoutComponent = <Standard controller={this}/>;
        }

        return layoutComponent;

    }

}
