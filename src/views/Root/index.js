import React from 'react';
import PropTypes from 'prop-types';

// Services
import ConfigService from   '../../services/Config';
import LanguageService from '../../services/Language';
import ModuleService from '../../services/Module';

// Views
import ConfigView from '../Config';
import ModuleView from '../Module';
import StyleView from '../Style';

// Modals
import HelpModal from '../../components/compound/modals/HelpModal';

// Layouts
import LayoutClassic from '../../components/compound/layout/classic';

// Context
import {RootContext} from '../../context/RootContext';

// Global Styles
import "../../styles/main.sass";

export default class RootViewController extends React.Component {

    /** React PropTypes **/
    static propTypes = {
        controller:PropTypes.object.isRequired
    };

    services = {
        config:null,
        language:null,
        module:null,
        root:null
    }

    constructor(props) {

        super();

        // Initalize Controller (Form of dependency injection depending on electron or web interface)
        props.controller.init(this);

        // Initalize Global Services
        this.services.config        = ConfigService.getInstance(this.onServiceUpdate, props.controller);
        this.services.language      = LanguageService.getInstance(this.services.config);
        this.services.module        = ModuleService.getInstance();

        // Stuff that shouldn't be true when launching.
        this.services.config.broadcast = false;
        this.services.config.modalHelp = false;

        // Reload bounds after launch (Electron only)
        if (props.controller.setWindowBounds) {
            props.controller.setWindowBounds();
        }

        // Set always on top (Electron only)
        if (props.controller.onAlwaysOnTop) {
            props.controller.onAlwaysOnTop();
        }

    }

    onServiceUpdate = () => {
        // Handles forcing the state update from a service.
        this.forceUpdate();
    }

    render() {

        const {backgroundColor, modalHelp} = this.services.config;
        const web = !this.props.controller.isElectron;

        return <RootContext.Provider value={this.services}>
            <LayoutClassic broadcast={this.services.config.broadcast} backgroundColor={backgroundColor}>
                <ConfigView web={web}/>
                <ModuleView web={web}/>
                <StyleView web={web}/>
            </LayoutClassic>
            <HelpModal target='modalHelp' display={modalHelp} title={_('help-title')} web={web}/>
        </RootContext.Provider>;
        
    }

}
