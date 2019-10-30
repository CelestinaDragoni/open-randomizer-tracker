import React from 'react';

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

    onServiceUpdate() {
        // Handles forcing the state update from a service.
        this.forceUpdate();
    }

    render() {
        return <RootContext.Provider value={this.services}>
            
            <LayoutClassic>
                <ConfigView/>
                <ModuleView/>
            </LayoutClassic>
        </RootContext.Provider>
    }

}