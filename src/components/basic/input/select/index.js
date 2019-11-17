import React from "react";
import PropTypes from 'prop-types';
import "./index.sass";

import {RootContext} from '../../../../context/RootContext';

export default class Select extends React.Component {

    /** React PropTypes **/
    static propTypes = {
        onChange:PropTypes.function,
        target:PropTypes.string,
        value:PropTypes.mixed,
        options:PropTypes.array
    };

    /** React PropType Defaults **/
    static defaultProps = {
        onChange:null,
        target:'',
        value:'',
        options:[]
    };

    static contextType = RootContext;

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

        const options = [];
        if (this.props.options && this.props.options.length > 0) {
            let count = 0;
            for (const option of this.props.options) {
                const value     = (typeof option.value === 'undefined') ? '' : option.value;
                const label     = (typeof option.label === 'undefined') ? value : this.context.language._(option.label);
                const className = (typeof option.className === 'undefined') ? '' : option.className;
                options.push(<option key={count} value={value} className={className}>{label}</option>);
                count+=1;
            }
        }

        return <select value={this.props.value} className='ort-input-select' onChange={this.onChange}>
            {options}
        </select>;

    }

}
