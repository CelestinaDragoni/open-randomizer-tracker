import React from "react";
import "./index.sass";

export default class GameTitle extends React.PureComponent {

    render() {
        const style = {
            'fontSize':`${this.props.fontSize}px`,
            'fontFamily':this.props.fontFamily
        };
        return <div className='ort-game-title' style={style}>{this.props.children}</div>;
    }

}
