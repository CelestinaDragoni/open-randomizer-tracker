import React from "react";
import PropTypes from 'prop-types';
import "./index.sass";

export default class TextArea extends React.Component {

    /** React PropTypes **/
    static propTypes = {
        onChange:PropTypes.function,
        target:PropTypes.string,
        value:PropTypes.mixed,
        maxLength:PropTypes.string,
        height:PropTypes.number,
        placeholder:PropTypes.string
    };

    /** React PropType Defaults **/
    static defaultProps = {
        onChange:null,
        target:'',
        value:'',
        maxLength:'128',
        height:50,
        placeholder:''
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

        const {height, placeholder, maxLength} = this.props;

        const style = {
            height:`${height}px`
        };

        return <textarea style={style} placeholder={placeholder} maxLength={maxLength} type='text' value={this.props.value} onChange={this.onChange} className='ort-textarea'/>;
    }

}
