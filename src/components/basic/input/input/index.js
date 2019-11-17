import React from "react";
import PropTypes from 'prop-types';
import "./index.sass";

export default class Input extends React.Component {

    /** React PropTypes **/
    static propTypes = {
        onChange:PropTypes.function,
        target:PropTypes.string,
        value:PropTypes.mixed,
        maxLength:PropTypes.string
    };

    /** React PropType Defaults **/
    static defaultProps = {
        onChange:null,
        target:'',
        value:'',
        maxLength:'128'
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
        let maxLength = '128';
        if (this.props.maxLength) {
            maxLength = this.props.maxLength;
        }
        return <input maxLength={maxLength} type='text' value={this.props.value} onChange={this.onChange} className='ort-input'/>;
    }

}
