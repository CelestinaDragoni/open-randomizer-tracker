import React from "react";
import "./index.sass";

export default class Slider extends React.Component {

    onChange = (e) => {
        if (this.props.onChange) {
            this.props.onChange(e.target.value);
        }
    }

    render() {
        return <input type='range' min={this.props.min} max={this.props.max} step={this.props.step} value={this.props.value} onChange={this.onChange} className='ort-slider'/>;
    }

}
