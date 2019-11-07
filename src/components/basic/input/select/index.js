import React from "react";
import "./index.sass";

export default class Select extends React.Component {

    onChange = (e) => {
        if (this.props.onChange) {
            this.props.onChange(e.target.value);
        }
    }

    render() {

        const options = [];
        if (this.props.options && this.props.options.length > 0) {
            let count = 0;
            for (const option of this.props.options) {
                const value     = (typeof option.value === 'undefined') ? '' : option.value;
                const label     = (typeof option.label === 'undefined') ? value : option.label;
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
