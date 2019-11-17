import React from "react";
import PropTypes from "prop-types";
import "./index.sass";

import {RootContext} from '../../../context/RootContext';

export default class Modal extends React.Component {

    /** React PropTypes **/
    static propTypes = {
        onClose:PropTypes.function,
        target:PropTypes.string,
        title:PropTypes.string,
        icon:PropTypes.string,
        closable:PropTypes.bool,
        actions:PropTypes.element,
        children:PropTypes.element,
        height:PropTypes.string,
        width:PropTypes.string,
        display:PropTypes.bool,
    };

    /** React PropType Defaults **/
    static defaultProps = {
        onClose:null,
        target:'',
        title:'',
        icon:null,
        closable:false,
        actions:null,
        children:null,
        height:null,
        width:null,
        display:false
    };

    static contextType = RootContext;

    onClose = () => {
        if (this.props.onClose) {
            this.props.onClose(this.props.target);
        }
        if (this.props.target) {
            this.context.config[this.props.target] = !this.context.config[this.props.target];
        }
    }

    renderTitle() {
        if (this.props.title) {

            let icon = null;
            if (this.props.icon) {
                icon = <i className={icon}/>;
            }

            let close = null;
            if (this.props.closable) {
                close = <i className={`fas fa-times close`} onClick={this.onClose}/>;
            }

            return <header>
                <span>{icon} {this.props.title}</span>
                {close}
            </header>;
        }

        return null;
    }

    renderActions() {
        if (this.props.actions) {
            return <footer>
                {this.props.actions}
            </footer>;
        }
        return null;
    }

    render() {

        const wrapperStyle = {};
        const style = {};

        if (this.props.height) {
            style.height=this.props.height;
        }

        if (this.props.width) {
            style.width=this.props.width;
        }

        if (!this.props.display) {
            wrapperStyle.opacity=0;
            wrapperStyle.zIndex=-1;
            style.marginBottom = '-100%';
        }

        return <div className='ort-modal-wrapper' style={wrapperStyle}>
            <div className='ort-modal-spacer'/>
            <div className='ort-modal' style={style}>
                {this.renderTitle()}
                <main>
                    {this.props.children}
                </main>
                {this.renderActions()}
            </div>
            <div className='ort-modal-spacer'/>
        </div>;

    }

}
