import React from "react";
import "./index.sass";

export default class LayoutClassic extends React.PureComponent {

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
                You are Currently In Configuration Mode, Press ESC to Enter Broadcast Mode
            </div>
        </div>
    }

}
