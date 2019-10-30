import React from "react";
import "./index.sass";

export default class LayoutClassic extends React.PureComponent {

    render() {
        return <div className='ort-layout-classic'>
            <div className='ort-layout-classic-left'>
                {this.props.children[0]}
            </div>
            <div className='ort-layout-classic-right'>
                {this.props.children[1]}
            </div>
        </div>
    }

}
