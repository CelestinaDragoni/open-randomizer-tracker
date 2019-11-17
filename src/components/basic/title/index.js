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
        color:PropTypes.string
    };

    /** React PropType Defaults **/
    static defaultProps = {
        fontSize:14,
        fontFamily:'Sans-Serif',
        padding:5,
        children:null,
        color:'',
    };

    render() {
        const style = {
            'fontSize':`${this.props.fontSize}px`,
            'fontFamily':this.props.fontFamily,
            'marginBottom':`${this.props.padding}px`,
            'color':this.props.color
        };
        return <div className='ort-game-title' style={style}>{this.props.children}</div>;
    }

}
