import React from "react";
import "./index.sass";

export default class Container extends React.PureComponent {

    render() {

        let classes = "";
        if (this.props.final) {
            classes="ort-container-final";
        }

        let elements = [];
        if (this.props.children && this.props.children.length > 0) {

            let i = 0;
            do {
                const child = this.props.children[i];
                elements.push(<div key={i} className='ort-container-column'>{child}</div>);
                i+=1;
            } while (i < this.props.children.length);

        } else {
            elements = this.props.children;
        }

        return <div className={`ort-container ${classes}`}>
            {elements}
        </div>;
    }

}
