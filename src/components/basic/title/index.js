import React from "react";
import PropTypes from "prop-types";
import "./index.sass";

export default class GameTitle extends React.PureComponent {

    /** React PropTypes **/
    static propTypes = {
        fontSize:PropTypes.integer,
        fontFamily:PropTypes.string,
        padding:PropTypes.number,
        children:PropTypes.element,
    };

    /** React PropType Defaults **/
    static defaultProps = {
        fontSize:14,
        fontFamily:'Sans-Serif',
        padding:5,
        children:null,
    };

    render() {
        const style = {
            'fontSize':`${this.props.fontSize}px`,
            'fontFamily':this.props.fontFamily,
            'marginBottom':`${this.props.padding}px`,
        };
        return <div className='ort-game-title' style={style}>{this.props.children}</div>;
    }

}
