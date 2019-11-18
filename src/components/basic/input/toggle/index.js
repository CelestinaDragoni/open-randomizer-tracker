import React from "react";
import PropTypes from 'prop-types';
import "./index.sass";

export default class Toggle extends React.Component {

    /** React PropTypes **/
    static propTypes = {
        onChange:PropTypes.function,
        target:PropTypes.string,
        value:PropTypes.bool
    };

    /** React PropType Defaults **/
    static defaultProps = {
        onChange:null,
        target:'',
        value:false
    };

    onChange = (e) => {
        if (this.props.onChange) {
            if (this.props.target) {
                this.props.onChange(this.props.target, !this.props.value);
            } else {
                this.props.onChange(!this.props.value);
            }
        }
    }

    render() {
        const checked = this.props.value ? "checked" : "";
        return <label className="ort-toggle" >
            <input type="checkbox" checked={checked} readOnly/>
            <span className="toggle round" onClick={this.onChange}></span>
        </label>;
    }

}
