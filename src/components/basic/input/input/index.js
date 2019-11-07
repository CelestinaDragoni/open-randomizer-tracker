import React from "react";
import "./index.sass";

export default class Input extends React.Component {

    onChange = (e) => {
        if (this.props.onChange) {
            this.props.onChange(e.target.value);
        }
    }

    render() {
        return <input type='text' value={this.props.value} onChange={this.onChange} className='ort-input'/>;
    }

}
