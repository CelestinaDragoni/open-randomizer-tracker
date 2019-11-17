import React from "react";
import PropTypes from "prop-types";
import "./index.sass";

export default class GameTitle extends React.PureComponent {

    /** React PropTypes **/
    static propTypes = {
        fontSize:PropTypes.integer,
        fontFamily:PropTypes.string,
        children:PropTypes.element,
    };

    /** React PropType Defaults **/
    static defaultProps = {
        fontSize:14,
        fontFamily:'Sans-Serif',
        children:null,
    };

    render() {
        const style = {
            'fontSize':`${this.props.fontSize}px`,
            'fontFamily':this.props.fontFamily
        };
        return <div className='ort-game-title' style={style}>{this.props.children}</div>;
    }

}
