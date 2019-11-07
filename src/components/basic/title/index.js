import React from "react";
import "./index.sass";

export default class GameTitle extends React.PureComponent {

    render() {
        const style = {
            'fontSize':`${this.props.fontSize}px`
        };
        return <div className='ort-game-title' style={style}>{this.props.children}</div>;
    }

}
