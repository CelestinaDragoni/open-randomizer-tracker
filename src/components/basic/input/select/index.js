import React from "react";
import "./index.sass";

export default class Select extends React.Component {

    render() {

        const options = [];
        if (this.props.options && this.props.options.length > 0) {
            for (const option of this.props.options) {
                const value     = (typeof option.value === 'undefined') ? '' : option.value;
                const label     = (typeof option.label === 'undefined') ? value : option.label;
                const className = (typeof option.className === 'undefined') ? '' : option.className;
                options.push(<option value={value} className={className}>{label}</option>);
            }
        }

        return <select className='ort-input-select'>
            {options}
        </select>;

    }

}