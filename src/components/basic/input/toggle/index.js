import React from "react";
import "./index.sass";

export default class Toggle extends React.Component {

    onChange = (e) => {
        if (this.props.onChange) {
            this.props.onChange(!this.props.value);
        }
    }

    render() {
        const checked = this.props.value ? "checked" : "";
        return <label className="ort-toggle" >
          <input type="checkbox" checked={checked} readOnly/>
          <span className="toggle round" onClick={this.onChange} ></span>
        </label>;
    }

}