import React from "react";
import "./index.sass";

import {RootContext} from '../../../../context/RootContext';
export default class LayoutClassic extends React.PureComponent {

    static contextType = RootContext;

    render() {

        const style = {};
        if (this.props.backgroundColor && this.props.backgroundColor !== '') {
            style.backgroundColor = this.props.backgroundColor;
        }

        const classBroadcast = (this.props.broadcast) ? 'broadcast' : '';

        return <div className={`ort-layout-classic ${classBroadcast}`} style={style}>
            <div className='ort-layout-classic-left'>
                {this.props.children[0]}
            </div>
            <div className='ort-layout-classic-right'>
                {this.props.children[1]}
            </div>
            <div className='ort-layout-classic-broadcast'>
                {this.context.language._('config-mode')}
            </div>
        </div>;
    }

}
