import React from 'react';
import {RootContext} from '../../context/RootContext';
import {HeaderSidebarPrimary, HeaderSidebarSecondary, HeaderSidebarSubsection} from '../../components/basic/header'
import Container from '../../components/basic/container'
import Select from '../../components/basic/input/select'
import Input from '../../components/basic/input/input'
import Slider from '../../components/basic/input/slider'
import Toggle from '../../components/basic/input/toggle'

import "./index.sass";

export default class ConfigView extends React.Component {
    static contextType = RootContext;

    onChangeModule = (val) => {
        this.context.config.module = val;
    }

    onChangeModuleLayout = (val) => {
        this.context.config.moduleLayout = val;
    }

    onChangeBackgroundColor = (val) => {
        this.context.config.backgroundColor = val;
    }

    onChangeZoom = (val) => {
        this.context.config.zoom = val;
    }

    onChangeAlwaysOnTop = (val) => {
        this.context.config.alwaysOnTop = val;
    }

    render() {

        const moduleKey = this.context.config.module;
        const moduleLayout = this.context.config.moduleLayout;
        const moduleOptions = this.context.module.options();
        const moduleLayoutOptions = this.context.module.layoutOptions(moduleKey);

        const backgroundColor = this.context.config.backgroundColor;
        const zoom = this.context.config.zoom;
        const zoomPercentage = zoom*100;
        const alwaysOnTop = this.context.config.alwaysOnTop;

        return <div className='ort-sidebar-profile'>

            <HeaderSidebarPrimary>Configuration</HeaderSidebarPrimary>

            <div className='ort-sidebar-profile-content'>

                <HeaderSidebarSecondary>Module</HeaderSidebarSecondary>

                    <Container>
                        <strong>Module:</strong>
                    </Container>
                    <Container>
                        <Select value={moduleKey}  options={moduleOptions} onChange={this.onChangeModule}/>
                    </Container>
                     <Container>
                        <div><strong>Layout:</strong></div>
                    </Container>
                    <Container final>
                        <Select value={moduleLayout} options={moduleLayoutOptions} onChange={this.onChangeModuleLayout}/>
                    </Container>

                <HeaderSidebarSecondary>Options</HeaderSidebarSecondary>
                    
                    <Container>
                        <strong>Background Color</strong>
                    </Container>
                    <Container>
                        <Input value={backgroundColor} onChange={this.onChangeBackgroundColor}/>
                    </Container>
                    <Container>
                        <strong>Always On Top</strong>
                    </Container>
                    <Container>
                        <Toggle value={alwaysOnTop} onChange={this.onChangeAlwaysOnTop}/>
                    </Container>
                    <Container>
                        <strong>Zoom Level ({zoomPercentage}%)</strong>
                    </Container>
                    <Container final>
                        <Slider value={zoom} min={.5} max={2} step={.25} onChange={this.onChangeZoom}/>
                    </Container>
                <HeaderSidebarSecondary>Extras</HeaderSidebarSecondary>
                    <Container>
                        <strong>Enable Timer</strong>
                    </Container>
                    <Container>
                        <Toggle value={alwaysOnTop} onChange={this.onChangeAlwaysOnTop}/>
                    </Container>
                    <Container>
                        <strong>Game Title</strong>
                    </Container>
                    <Container>
                        <Input value={backgroundColor} onChange={this.onChangeBackgroundColor}/>
                    </Container>

            </div>
        </div>;
    }
}