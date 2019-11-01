import React from 'react';
import {RootContext} from '../../context/RootContext';

import LinkToThePastModule from '../../modules/lttp/controller';

import "./index.sass";

export default class ModuleView extends React.Component {
    static contextType = RootContext;

    render() {

        const zoom = this.context.config.zoom;
        const style = {'transform':`scale(${zoom})`};

        let moduleComponent = null;

        switch(this.context.config.module) {
            case 'lttp':
                moduleComponent = <LinkToThePastModule/>;
                break;
            default:
                moduleComponent = <div>Invalid Module</div>;
        }

        return <div className='ort-module'>
            <div className='ort-module-wrapper' style={style}>
                {moduleComponent}
            </div>
        </div>;

    }

}