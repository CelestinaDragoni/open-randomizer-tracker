import React from 'react';
import {remote, shell} from 'electron';
import clone from 'clone';

// Services
import ConfigService from   '../../services/Config';
import LanguageService from '../../services/Language';
import ModuleService from '../../services/Module';

// Views
import ConfigView from '../Config';
import ModuleView from '../Module';

// Modals
import HelpModal from '../../components/compound/modals/HelpModal';

// Layouts
import LayoutClassic from '../../components/compound/layout/classic';

// Context
import {RootContext} from '../../context/RootContext';

// Global Styles
import "../../styles/main.sass";

export default class RootViewController extends React.Component {

    // For performance on window scaling/writing.
    windowResizeTimeout = null;

    services = {
        config:null,
        language:null,
        module:null,
        root:null
    }

    constructor() {
        super();
        this.services.config        = ConfigService.getInstance(this.onServiceUpdate, this);
        this.services.language      = LanguageService.getInstance();
        this.services.module        = ModuleService.getInstance();

        // Don't start in broadcast mode
        if (this.services.config.broadcast) {
            this.services.config.broadcast = false;
        }

        // Reload Bounds after launch
        remote.getCurrentWindow().setBounds(this.services.config.bounds);

        // Set at Launch
        this.onAlwaysOnTop();

        // External Link Handler
        window._link = this.onExternalLink;
    }

    componentDidMount() {
        window.addEventListener('keyup', this.onToggleBroadcast);
        remote.getCurrentWindow().on('resize', this.onWindowChange);
        remote.getCurrentWindow().on('move', this.onWindowChange);
    }

    onWindowChange = () => {
        clearTimeout(this.windowResizeTimeout);
        this.windowResizeTimeout = setTimeout(this.onWindowChangeTimeout, 100);
    }

    onWindowChangeTimeout = () => {
        if (!this.services.config.broadcast) {
            this.services.config.bounds = clone(remote.getCurrentWindow().getBounds());
        }
    }

    onAlwaysOnTop = () => {
        remote.getCurrentWindow().setAlwaysOnTop(this.services.config.alwaysOnTop);
    }

    onServiceUpdate = () => {
        // Handles forcing the state update from a service.
        this.forceUpdate();
    }

    onExternalLink(e) {
        e.preventDefault();
        shell.openExternal(e.target.href);
    }

    onToggleBroadcast = (e) => {
        if(e.key === "Escape") {

            // Close Modals on ESC
            if (this.services.config.modalHelp) {
                this.services.config.modalHelp = false;
                return;
            }

            this.services.config.broadcast = !this.services.config.broadcast;

            // Scale Window In Broadcast
            if (this.services.config.broadcast) {

                const bounds = clone(remote.getCurrentWindow().getBounds());
                const moduleElement = document.querySelector('.ort-module-wrapper');

                // Save Bounds for Later
                this.services.config.bounds = clone(bounds);

                // Modify Bounds for Broadcast
                const rect = moduleElement.getBoundingClientRect();
    
                bounds.height = parseInt(rect.height, 10)+50;
                bounds.width = parseInt(rect.width, 10)+50;

                // Set Electron Bounds
                remote.getCurrentWindow().setBounds(bounds);

            // Restore Window Outside Broadcast
            } else {

                // Set Electron Bounds
                const bounds = this.services.config.bounds;
                remote.getCurrentWindow().setBounds(bounds);

            }
        }
    }

    render() {

        const {backgroundColor, modalHelp} = this.services.config;

        return <RootContext.Provider value={this.services}>
            <LayoutClassic broadcast={this.services.config.broadcast} backgroundColor={backgroundColor}>
                <ConfigView/>
                <ModuleView/>
            </LayoutClassic>
            <HelpModal target='modalHelp' display={modalHelp} title={_('help-title')}/>
        </RootContext.Provider>;
        
    }

}
