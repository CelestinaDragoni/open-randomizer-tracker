import React from 'react';
//import {remote, shell} from 'electron';

// Services
import ConfigService from   '../../services/Config';
import LanguageService from '../../services/Language';

// Views
import ConfigView from '../Config';
import ModuleView from '../Module';

// Layouts
import LayoutClassic from '../../components/compound/layout/classic';

// Context
import {RootContext} from '../../context/RootContext';

// Global Styles
import "../../styles/main.sass";

export default class RootViewController extends React.Component {

    services = {
        config:null,
        mappings:null,
        profiles:null,
        themes:null,
        joystick:null,
        language:null
    }

    constructor() {
        super();
        this.services.config      = ConfigService.getInstance(this.onServiceUpdate);
        this.services.language    = LanguageService.getInstance();
    }

    componentWillMount() {

    }

    componentDidMount() {
        window.addEventListener('keyup', this.onToggleBroadcast);
    }

    onServiceUpdate = () => {
        // Handles forcing the state update from a service.
        this.forceUpdate();
    }

    onToggleBroadcast = (e) => {
        if(e.key === "Escape") {
            this.services.config.broadcast = !this.services.config.broadcast
            // Scale Window In Broadcast
            if (this.services.config.broadcast) {


            // Restore Window Outside Broadcast
            } else {


            }
        }
    }

    render() {
        return <RootContext.Provider value={this.services}>
            <LayoutClassic broadcast={this.services.config.broadcast}>
                <ConfigView/>
                <ModuleView/>
            </LayoutClassic>
        </RootContext.Provider>
    }

}