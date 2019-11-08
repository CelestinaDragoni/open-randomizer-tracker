import React from "react";
import "./index.sass";

export default class Toggle extends React.Component {

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
