import React from "react";
import PropTypes from 'prop-types';
import "./index.sass";

export default class Slider extends React.Component {

    /** React PropTypes **/
    static propTypes = {
        onChange:PropTypes.function,
        target:PropTypes.string,
        value:PropTypes.mixed,
        min:PropTypes.number,
        max:PropTypes.number,
        step:PropTypes.number
    };

    /** React PropType Defaults **/
    static defaultProps = {
        onChange:null,
        target:'',
        value:'',
        min:0,
        max:0,
        step:0
    };

    onChange = (e) => {
        if (this.props.onChange) {
            if (this.props.target) {
                this.props.onChange(this.props.target, e.target.value);
            } else {
                this.props.onChange(e.target.value);
            }
        }
    }

    render() {
        return <input type='range' min={this.props.min} max={this.props.max} step={this.props.step} value={this.props.value} onChange={this.onChange} className='ort-slider'/>;
    }

}
