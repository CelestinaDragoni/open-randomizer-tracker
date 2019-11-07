import React from 'react';
import {RootContext} from '../../context/RootContext';

import Timer from '../../components/basic/timer';
import GameTitle from '../../components/basic/title';
import LinkToThePastModule from '../../modules/lttp/controller';

import "./index.sass";

export default class ModuleView extends React.Component {
    static contextType = RootContext;

    render() {

        const zoom = this.context.config.zoom;
        const timer = this.context.config.timer;
        const timerFontSize = this.context.config.timerFontSize;
        const gameTitle = this.context.config.gameTitle;
        const gameTitleFontSize = this.context.config.gameTitleFontSize;
        const style = {'transform':`scale(${zoom})`};

        let moduleComponent = null;

        switch(this.context.config.module) {
            case 'lttp':
                moduleComponent = <LinkToThePastModule/>;
                break;
            default:
                moduleComponent = <div>Invalid Module</div>;
        }

        let elementGameTitle = null;
        if (gameTitle.trim() !== '') {
            elementGameTitle = <GameTitle fontSize={gameTitleFontSize}>{gameTitle}</GameTitle>;
        }

        let elementTimer = null;
        if (timer) {
            elementTimer = <Timer fontSize={timerFontSize}/>;
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