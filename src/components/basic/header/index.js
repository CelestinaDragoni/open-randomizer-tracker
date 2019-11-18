import React from "react";
import PropTypes from 'prop-types';
import "./index.sass";

export class HeaderSidebarPrimary extends React.PureComponent {

    /** React PropTypes **/
    static propTypes = {
        children:PropTypes.element
    };

    /** React PropType Defaults **/
    static defaultProps = {
        children:null,
    };

    render() {
        return <h1 className='ort-header-sidebar-primary'>{this.props.children}</h1>;
    }

}

export class HeaderSidebarSecondary extends React.PureComponent {

    /** React PropTypes **/
    static propTypes = {
        children:PropTypes.element
    };

    /** React PropType Defaults **/
    static defaultProps = {
        children:null,
    };

    render() {
        return <h2 className='ort-header-sidebar-secondary'>{this.props.children}</h2>;
    }

}

export class HeaderSidebarSubsection extends React.PureComponent {

    /** React PropTypes **/
    static propTypes = {
        children:PropTypes.element
    };

    /** React PropType Defaults **/
    static defaultProps = {
        children:null,
    };
    
    render() {
        return <h3 className='ort-header-sidebar-subsection'>{this.props.children}</h3>;
    }

}
