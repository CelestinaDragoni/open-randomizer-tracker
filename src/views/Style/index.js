import React from 'react';
import PropTypes from 'prop-types';
import clone from 'clone';

import {RootContext} from '../../context/RootContext';
import {HeaderSidebarPrimary, HeaderSidebarSecondary} from '../../components/basic/header';
import Container from '../../components/basic/container';
import Select from '../../components/basic/input/select';
import Input from '../../components/basic/input/input';
import Slider from '../../components/basic/input/slider';
import Toggle from '../../components/basic/input/toggle';

import "./index.sass";

export default class StyleView extends React.Component {

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

    render() {

        const {
            backgroundColor, 
            zoom, 
            alwaysOnTop,
            timer, 
            timerFont, 
            timerFontSize, 
            gameTitle, 
            gameTitleFont, 
            gameTitleFontSize, 
            fontOptions
        } = this.context.config;

        const zoomPercentage = zoom*100;

        let elementAlwaysOnTop = null;
        if (!this.props.web) {
            elementAlwaysOnTop = <>
                <Container>
                    <strong>{_('always-on-top')}</strong>
                </Container>
                <Container>
                    <Toggle target='alwaysOnTop' value={alwaysOnTop} onChange={this.onChange}/>
                </Container>
            </>;
        }

        return <div className='ort-sidebar-config'>
            <HeaderSidebarPrimary>{_('styles')}</HeaderSidebarPrimary>
            <div className='ort-sidebar-config-content'>

                <HeaderSidebarSecondary>{_('options')}</HeaderSidebarSecondary>
                <Container>
                    <strong>{_('background-color')}</strong>
                </Container>
                <Container>
                    <Input target='backgroundColor' value={backgroundColor} onChange={this.onChange}/>
                </Container>
                {elementAlwaysOnTop}
                <Container>
                    <strong>{_('zoom-level')} ({zoomPercentage}%)</strong>
                </Container>
                <Container final>
                    <Slider target='zoom' value={zoom} min={1} max={2} step={.25} onChange={this.onChange}/>
                </Container>


                <HeaderSidebarSecondary>{_('timer')}</HeaderSidebarSecondary>
                <Container>
                    <strong>{_('enable-timer')}</strong>
                </Container>
                <Container>
                    <Toggle target='timer' value={timer} onChange={this.onChange}/>
                </Container>
                <Container>
                    <strong>{_('timer-font')}</strong>
                </Container>
                <Container>
                    <Select target='timerFont' value={timerFont} options={fontOptions} onChange={this.onChange}/>
                </Container>
                <Container>
                    <strong>{_('timer-font-size')} ({timerFontSize}px)</strong>
                </Container>
                <Container final>
                    <Slider target='timerFontSize' value={timerFontSize} min={12} max={100} step={1} onChange={this.onChange}/>
                </Container>


                <HeaderSidebarSecondary>{_('current-game-title')}</HeaderSidebarSecondary>
                <Container>
                    <strong>{_('game-title')}</strong>
                </Container>
                <Container>
                    <Input target='gameTitle' value={gameTitle} onChange={this.onChange}/>
                </Container>
                <Container>
                    <strong>{_('game-title-font')}</strong>
                </Container>
                <Container>
                    <Select target='gameTitleFont' value={gameTitleFont} options={fontOptions} onChange={this.onChange}/>
                </Container>
                <Container>
                    <strong>{_('game-title-font-size')} ({gameTitleFontSize}px)</strong>
                </Container>
                <Container final>
                    <Slider target='gameTitleFontSize' value={gameTitleFontSize} min={12} max={100} step={1} onChange={this.onChange}/>
                </Container>
            </div>
        </div>;
    }
}
