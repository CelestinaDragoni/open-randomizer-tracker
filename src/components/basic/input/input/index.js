import React from "react";
import "./index.sass";

export default class Input extends React.Component {

    render() {
        return <input className='ort-input'>
            {options}
        </input>;
    }

}