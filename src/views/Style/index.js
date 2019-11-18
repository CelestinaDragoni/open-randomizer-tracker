import React from 'react';
import PropTypes from 'prop-types';
import clone from 'clone';

import {RootContext} from '../../context/RootContext';
import {HeaderSidebarPrimary, HeaderSidebarSecondary} from '../../components/basic/header';
import Container from '../../components/basic/container';
import Spacer from '../../components/basic/spacer';
import Select from '../../components/basic/input/select';
import Input from '../../components/basic/input/input';
import TextArea from '../../components/basic/input/textarea';
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


    renderTimerControls() {

        const {
            timer, 
            timerFont, 
            timerFontColor,
            timerFontSize,
            timerPadding,
            fontOptions
        } = this.context.config;

        if (!timer) {
            return null;
        }

        return <>
            <Container>
                <strong>{_('font-family')}</strong>
            </Container>
            <Container>
                <Select target='timerFont' value={timerFont} options={fontOptions} onChange={this.onChange}/>
            </Container>
            <Container>
                <strong>{_('font-color')}</strong>
            </Container>
            <Container>
                <Input placeholder='#FFFFFF' target='timerFontColor' value={timerFontColor} onChange={this.onChange}/>
            </Container>
            <Container>
                <strong>{_('font-size')} ({timerFontSize}px)</strong>
            </Container>
            <Container>
                <Slider target='timerFontSize' value={timerFontSize} min={12} max={100} step={1} onChange={this.onChange}/>
            </Container>
            <Container>
                <strong>{_('padding')} ({timerPadding}px)</strong>
            </Container>
            <Container>
                <Slider target='timerPadding' value={timerPadding} min={0} max={100} step={1} onChange={this.onChange}/>
            </Container>
        </>;
    }

    renderGameTitleControls() {

        const {
            gameTitle, 
            gameTitleFont,
            gameTitleFontColor,
            gameTitleFontSize,
            gameTitlePadding,
            fontOptions
        } = this.context.config;

        if (gameTitle.trim() === '') {
            return null;
        }

        return <>
            <Container>
                <strong>{_('font-family')}</strong>
            </Container>
            <Container>
                <Select target='gameTitleFont' value={gameTitleFont} options={fontOptions} onChange={this.onChange}/>
            </Container>
            <Container>
                <strong>{_('font-color')}</strong>
            </Container>
            <Container>
                <Input placeholder='#FFFFFF' target='gameTitleFontColor' value={gameTitleFontColor} onChange={this.onChange}/>
            </Container>
            <Container>
                <strong>{_('font-size')} ({gameTitleFontSize}px)</strong>
            </Container>
            <Container>
                <Slider target='gameTitleFontSize' value={gameTitleFontSize} min={12} max={100} step={1} onChange={this.onChange}/>
            </Container>
            <Container>
                <strong>{_('padding')} ({gameTitlePadding}px)</strong>
            </Container>
            <Container>
                <Slider target='gameTitlePadding' value={gameTitlePadding} min={-25} max={100} step={1} onChange={this.onChange}/>
            </Container>
        </>;
    }

    render() {

        const {
            backgroundColor, 
            zoom,
            fontColor,
            timer, 
            gameTitle,
        } = this.context.config;

        const zoomPercentage = zoom*100;

        return <div className='ort-sidebar-config'>
            <HeaderSidebarPrimary>{_('styles')}</HeaderSidebarPrimary>
            <div className='ort-sidebar-config-content'>

                <HeaderSidebarSecondary>{_('module')}</HeaderSidebarSecondary>
                <Container>
                    <strong>{_('background-color')}</strong>
                </Container>
                <Container>
                    <Input placeholder='#000000' target='backgroundColor' value={backgroundColor} onChange={this.onChange}/>
                </Container>
                <Container>
                    <strong>{_('font-color')}</strong>
                </Container>
                <Container>
                    <Input target='fontColor' value={fontColor} onChange={this.onChange}/>
                </Container>
                <Container>
                    <strong>{_('zoom-level')} ({zoomPercentage}%)</strong>
                </Container>
                <Container>
                    <Slider target='zoom' value={zoom} min={1} max={2} step={.25} onChange={this.onChange}/>
                </Container>
                <Spacer/>

                <HeaderSidebarSecondary>{_('timer')}</HeaderSidebarSecondary>
                <Container>
                    <strong>{_('enable-timer')}</strong>
                </Container>
                <Container>
                    <Toggle target='timer' value={timer} onChange={this.onChange}/>
                </Container>
                {this.renderTimerControls()}
                <Spacer/>

                <HeaderSidebarSecondary>{_('current-game-title')}</HeaderSidebarSecondary>
                <Container>
                    <strong>{_('game-title')}</strong>
                </Container>
                <Container>
                    <TextArea target='gameTitle' value={gameTitle} onChange={this.onChange} placeholder={_('game-title-placeholder')}/>
                </Container>
                {this.renderGameTitleControls()}
                <Spacer/>
                
            </div>
        </div>;
    }
}
