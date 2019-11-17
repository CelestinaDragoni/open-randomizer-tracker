import React from 'react';
import {RootContext} from '../../context/RootContext';

import Timer from '../../components/basic/timer';
import GameTitle from '../../components/basic/title';
import LinkToThePastModule from '../../modules/lttp/controller';

import "./index.sass";

export default class ModuleView extends React.Component {
    static contextType = RootContext;

    render() {

        const {zoom, timer, timerFont, timerFontSize, timerPadding, gameTitle, gameTitleFontSize, gameTitleFont, gameTitlePadding} = this.context.config;
        const style = {'transform':`scale(${zoom})`};
        let moduleComponent = null;

        switch(this.context.config.module) {
        case 'lttp':
            moduleComponent = <LinkToThePastModule/>;
            break;
        default:
            moduleComponent = <div>Invalid Module</div>;
        }

        let elementTimer = null;
        if (timer) {
            elementTimer = <Timer fontSize={timerFontSize} fontFamily={timerFont} padding={timerPadding}/>;
        }

        let elementGameTitle = null;
        if (gameTitle.trim() !== '') {
            elementGameTitle = <GameTitle fontSize={gameTitleFontSize} fontFamily={gameTitleFont} padding={gameTitlePadding}>{gameTitle}</GameTitle>;
        }

        return <div className='ort-module'>
            <div className='ort-module-wrapper' style={style}>
                {elementTimer}
                {elementGameTitle}
                {moduleComponent}
            </div>
        </div>;

    }

}
