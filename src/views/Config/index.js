import React from 'react';
import PropTypes from 'prop-types';
import clone from 'clone';

import {RootContext} from '../../context/RootContext';
import {HeaderSidebarPrimary, HeaderSidebarSecondary} from '../../components/basic/header';
import Container from '../../components/basic/container';
import Select from '../../components/basic/input/select';
import Button from '../../components/basic/button';

import "./index.sass";

export default class ConfigView extends React.Component {

    /** React PropTypes **/
    static propTypes = {
        web:PropTypes.bool
    };

    /** React PropType Defaults **/
    static defaultProps = {
        web:false,
    };

    static contextType = RootContext;

    onChange = (key, value) => {
        if (key === 'moduleLayout') {
            this.context.config.moduleState = clone(this.context.config.moduleStateDefault);
        }
        this.context.config[key] = value;
    }

    onReset = () => {
        this.context.config.moduleState = clone(this.context.config.moduleStateDefault);
    }

    render() {

        const {
            module, 
            moduleLayout, 
            locale, 
        } = this.context.config;

        const moduleOptions = this.context.module.options();
        const moduleLayoutOptions = this.context.module.layoutOptions(module);
        const languageOptions = this.context.language.options();

        return <div className='ort-sidebar-config'>
            <HeaderSidebarPrimary>{_('configuration')}</HeaderSidebarPrimary>
            <div className='ort-sidebar-config-content'>

                <HeaderSidebarSecondary>{_('language')}</HeaderSidebarSecondary>
                <Container final>
                    <Select target='locale' value={locale} options={languageOptions} onChange={this.onChange}/>
                </Container>

                <HeaderSidebarSecondary>{_('module')}</HeaderSidebarSecondary>
                <Container>
                    <strong>{_('module')}</strong>
                </Container>
                <Container>
                    <Select target='module' value={module} options={moduleOptions} onChange={this.onChange}/>
                </Container>
                <Container>
                    <div><strong>{_('layout')}</strong></div> 
                </Container>
                <Container>
                    <Select target='moduleLayout' value={moduleLayout} options={moduleLayoutOptions} onChange={this.onChange}/>
                </Container>
                <Container final>
                    <Button icon='fas fa-redo-alt fa-fw' onClick={this.onReset}>{_('reset-tracker')}</Button>
                </Container>
                
            </div>
        </div>;
    }
}
