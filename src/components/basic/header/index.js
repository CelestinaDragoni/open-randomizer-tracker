import React from "react";
import "./index.sass";

export class HeaderSidebarPrimary extends React.PureComponent {

    render() {

        let handle = '';
        if (this.props.handle) {
            handle = this.props.handle;
        }

        return <h1 className={`ort-header-sidebar-primary ${handle}`}>{this.props.children}</h1>;
    }

}

export class HeaderSidebarSecondary extends React.PureComponent {

    render() {
        return <h2 className='ort-header-sidebar-secondary'>{this.props.children}</h2>;
    }

}

export class HeaderSidebarSubsection extends React.PureComponent {

    render() {
        return <h3 className='ort-header-sidebar-subsection'>{this.props.children}</h3>;
    }

}
