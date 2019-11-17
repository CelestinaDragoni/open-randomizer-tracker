import React from 'react';
import {RootContext} from '../../context/RootContext';

import Timer from '../../components/basic/timer';
import GameTitle from '../../components/basic/title';
import LinkToThePastModule from '../../modules/lttp/controller';

import "./index.sass";

export default class ModuleView extends React.Component {
    static contextType = RootContext;

    render() {

        const {
            zoom,
            fontColor,
            timer, 
            timerFont, 
            timerFontColor,
            timerFontSize, 
            timerPadding, 
            gameTitle, 
            gameTitleFontColor,
            gameTitleFontSize,
            gameTitleFont, 
            gameTitlePadding,
            module 
        } = this.context.config;

        // Module Styles
        const styleWrapper = {
            'transform':`scale(${zoom})`
        };
        const styleComponent = {
            'color':fontColor
        };

        // Get Module Component
        let moduleComponent = null;
        switch(module) {
        case 'lttp':
            moduleComponent = <div style={styleComponent}><LinkToThePastModule/></div>;
            break;
        default:
            moduleComponent = <div>Invalid Module</div>;
        }

        // Timer Element
        let elementTimer = null;
        if (timer) {
            elementTimer = <Timer color={timerFontColor} fontSize={timerFontSize} fontFamily={timerFont} padding={timerPadding}/>;
        }

        // Game Title Element
        let elementGameTitle = null;
        if (gameTitle.trim() !== '') {
            elementGameTitle = <GameTitle color={gameTitleFontColor} fontSize={gameTitleFontSize} fontFamily={gameTitleFont} padding={gameTitlePadding}>{gameTitle}</GameTitle>;
        }

        return <div className='ort-module'>
            <div className='ort-module-wrapper' style={styleWrapper}>
                {elementTimer}
                {elementGameTitle}
                {moduleComponent}
            </div>
        </div>;

    }

}
