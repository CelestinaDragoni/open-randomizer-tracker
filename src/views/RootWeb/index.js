import React from 'react';

// Services
import ConfigService from   '../../services/ConfigWeb';
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

export default class RootViewWebController extends React.Component {

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
        this.services.language      = LanguageService.getInstance(this.services.config);
        this.services.module        = ModuleService.getInstance();

        // Don't start in broadcast mode
        if (this.services.config.broadcast) {
            this.services.config.broadcast = false;
        }

        // External Link Handler
        window._link = this.onExternalLink;
    }

    componentDidMount() {
        window.addEventListener('keyup', this.onToggleBroadcast);
    }

    onExternalLink(e) {
        return true;
    }

    onToggleBroadcast = (e) => {
        if(e.key === "Escape") {

            // Close Modals on ESC
            if (this.services.config.modalHelp) {
                this.services.config.modalHelp = false;
                return;
            }

            // Toggle Broadcast
            this.services.config.broadcast = !this.services.config.broadcast;
        }
    }

    onServiceUpdate = () => {
        // Handles forcing the state update from a service.
        this.forceUpdate();
    }

    render() {

        const {backgroundColor, modalHelp} = this.services.config;

        return <RootContext.Provider value={this.services}>
            <LayoutClassic broadcast={this.services.config.broadcast} backgroundColor={backgroundColor}>
                <ConfigView web/>
                <ModuleView/>
            </LayoutClassic>
            <HelpModal target='modalHelp' display={modalHelp} title={_('help-title')}/>
        </RootContext.Provider>;
        
    }

}
