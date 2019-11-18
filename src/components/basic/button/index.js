import React from "react";
import PropTypes from 'prop-types';
import "./index.sass";

export default class Button extends React.Component {

    /** React PropTypes **/
    static propTypes = {
        disabled:PropTypes.bool,
        onClick:PropTypes.function,
        value:PropTypes.mixed,
        type:PropTypes.string,
        href:PropTypes.href,
        target:PropTypes.href,
        icon:PropTypes.icon,
        children:PropTypes.element
    };

    /** React PropType Defaults **/
    static defaultProps = {
        disabled:false,
        onClick:null,
        value:'',
        type:'',
        href:null,
        target:null,
        icon:null,
        children:null
    };

    static Type = {
        Menu:'menu',
        SubMenu:'submenu',
        Panel:'panel',
        PanelDanger:'panelDanger'
    }

    styles = {
        menu: {
            enabled: 'button-menu',
            disabled: 'button-menu-disabled'
        },
        submenu: {
            enabled: 'button-submenu',
            disabled: 'button-submenu-disabled'
        },
        panel: {
            enabled: 'button-panel',
            disabled: 'button-panel-disabled'
        },
        panelDanger: {
            enabled: 'button-panel-danger',
            disabled: 'button-panel-danger-disabled'
        }
    }

    onClick = () => {
        if (!this.props.disabled) {
            this.props.onClick(this.props.value);
        }
    }

    render() {

        // Handle Theme
        let type = 'panel';
        if (this.props.type) {
            if (this.styles[this.props.type]) {
                type = this.props.type;
            }
        }

        // Handle Disabled State
        let styleName = this.styles[type].enabled;
        if (this.props.disabled) {
            styleName = this.styles[type].disabled;
        }

        // Handle HREF Buttons
        // eslint-disable-next-line
        let href = 'javascript:;'; // This is fine
        let hrefTarget = '_self';
        if (this.props.href) {
            href = this.props.href;
            if (this.props.target) {
                hrefTarget = this.props.target;
            }
        }

        // Handle on click
        let onClick = null;
        if (this.props.onClick) {
            onClick = this.onClick;
        }

        // Handle Icon
        let icon = null;
        if (this.props.icon) {
            icon = <i className={`${this.props.icon}`}/>;
        }

        return <a className={`button ${styleName}`} onClick={onClick} href={href} target={hrefTarget}>
            {icon}  {this.props.children}
        </a>;


    }

}
