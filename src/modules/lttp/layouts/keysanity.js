import React from "react";
import PropTypes from 'prop-types';
import clone from "clone";
import "./styles.sass";

import ModuleLayout_LinkToThePast_ItemsComponent from './components/items.js';
import {RootContext} from '../../../context/RootContext';

export default class ModuleLayout_LinkToThePast_Keysanity extends React.Component {

    /** React PropTypes **/
    static propTypes = {
        config:PropTypes.object.isRequired,
        triforce:PropTypes.bool,
    };

    /** React PropType Defaults **/
    static defaultProps = {
        triforce:false
    };

    static contextType = RootContext;
    configService = null;

    /** Handles Marker Enumeration **/
    markerEnum = ["unknown", "crystal", "redcrystal", "courage", "power", "wisdom"];

    /**
     * componentWillMount - Handles clearing the state and resetting it when the component will be mounted.
     * @return {void}
     */
    UNSAFE_componentWillMount() {

        this.configService = this.context.config;

        const config = this.props.config;
        const state = {items:{}, dungeons:{}};

        for (const key in config.items) {
            const counter = config.items[key].default ? config.items[key].default : 0;
            const active = counter ? true : false;
            state.items[key] = {active:active, level:0, counter:counter};
        }

        for (const key in config.dungeons) {
            state.dungeons[key] = {active:false, master:false, marker:0, keys:0};
        }

        this.configService.moduleStateDefault = clone(state);
        this.configService.moduleState = clone(state);

    }

    /**
     * Handles toggling between pendants and crystals
     * @param {string} key - Dungeon Key
     * @param {object} dungeon - Dungeon Properties
     * @return {void}
     */
    onMarkerRightClick = (key, dungeon) => {

        const state = this.configService.moduleState;

        state.dungeons[key].marker += 1;

        if (state.dungeons[key].marker === this.markerEnum.length) {
            state.dungeons[key].marker = 0;
        }

        this.configService.moduleState = state;

    }

    /**
     * Handles toggling if the dungeon has been completed
     * @param {string} key - Dungeon Key
     * @param {object} dungeon - Dungeon Properties
     * @return {void}
     */
    onMarkerLeftClick = (key, dungeon) => {

        const state = this.configService.moduleState;
        state.dungeons[key].active = !state.dungeons[key].active;
        this.configService.moduleState = state;

    }

    /**
     * Handles toggling if you have the master key
     * @param {string} key - Dungeon Key
     * @param {object} dungeon - Dungeon Properties
     * @return {void}
     */
    onMasterLeftClick = (key, dungeon) => {

        const state = this.configService.moduleState;

        state.dungeons[key].master = !state.dungeons[key].master;

        this.configService.moduleState = state;

    }

    /**
     * Decreases the key amount
     * @param {string} key - Dungeon Key
     * @param {object} dungeon - Dungeon Properties
     * @return {void}
     */
    onKeyRightClick = (key, dungeon) => {

        const state = this.configService.moduleState;

        if (state.dungeons[key].keys !== 0) {
            state.dungeons[key].keys -= 1;
        }

        this.configService.moduleState = state;

    }

    /**
     * Increases the key amount
     * @param {string} key - Dungeon Key
     * @param {object} dungeon - Dungeon Properties
     * @return {void}
     */
    onKeyLeftClick = (key, dungeon) => {

        const state = this.configService.moduleState;

        if (dungeon.keys !== state.dungeons[key].keys) {
            state.dungeons[key].keys += 1;
        }

        this.configService.moduleState = state;

    }

    /**
     * Renders the dungeon table.
     * @return {ReactDOM}
     */
    renderDungeons() {

        const state = this.configService.moduleState;

        const config = this.props.config;
        const elements = [];

        for (const key in config.dungeons) {

            const dungeon = config.dungeons[key];

            elements.push(<tr key={key}>
                
                {this._renderMarker(key, dungeon, state)}
                {this._renderMaster(key, dungeon, state)}
                {this._renderKeys(key, dungeon, state)}
            </tr>);

        }

        return <table className='ort-lttp-dungeons'>
            <tbody>
                {elements}
            </tbody>
        </table>;

    }

    /**
     * Private function, Renders the dungeon markers and binds actions.
     * @param {string} key - Dungeon Key
     * @param {object} dungeon - Dungeon properties
     * @param {object} state - The current state of this class
     * @return {ReactDOM}
     */
    _renderMarker(key, dungeon, state) {

        let element = null;
        let elementClass = null;
        let onLeftClick = null;
        let onRightClick = null;

        if (dungeon.crystal !== false || dungeon.pendant !== false) {

            const inactive = state.dungeons[key].active ? '' : 'inactive';
            const icon = this.markerEnum[state.dungeons[key].marker] + '.png';

            element = <img className={inactive} src={'resources/modules/lttp/icons/' + icon}/>;
            elementClass = 'action';

            onLeftClick = () => this.onMarkerLeftClick(key, dungeon);
            onRightClick = () => this.onMarkerRightClick(key, dungeon);
        }

        return <>
            <td className={elementClass} onClick={onLeftClick} onContextMenu={onRightClick}>{key}</td>
            <td className={elementClass} onClick={onLeftClick} onContextMenu={onRightClick}>{element}</td>
        </>;
    }

    /**
     * Private function, Renders the dungeon master keys and binds actions.
     * @param {string} key - Dungeon Key
     * @param {object} dungeon - Dungeon properties
     * @param {object} state - The current state of this class
     * @return {ReactDOM}
     */
    _renderMaster(key, dungeon, state) {

        let element = null;
        let elementClass = null;
        let onLeftClick = null;

        if (dungeon.master !== false) {

            const inactive = state.dungeons[key].master ? '' : 'inactive';
            element = <img className={inactive} src={'resources/modules/lttp/icons/master.png'}/>;
            elementClass = 'action';

            onLeftClick = () => this.onMasterLeftClick(key, dungeon);
        }

        return <td className={elementClass} onClick={onLeftClick}>{element}</td>;

    }

    /**
     * Private function, Renders the dungeon key counters and binds actions.
     * @param {string} key - Dungeon Key
     * @param {object} dungeon - Dungeon properties
     * @param {object} state - The current state of this class
     * @return {ReactDOM}
     */
    _renderKeys(key, dungeon, state) {

        const keys = state.dungeons[key].keys;

        let element = null;
        let elementText = null;
        let elementClass = null;
        let onLeftClick = null;
        let onRightClick = null;

        if (dungeon.keys > 0) {

            let classState = '';

            if (keys === 0) {
                classState = 'inactive';
            } else if (keys === dungeon.keys) {
                classState = 'maxed';
            }

            element = <img className={classState} src={'resources/modules/lttp/icons/key.png'}/>;
            elementText = <span className={classState}>{keys}/{dungeon.keys}</span>;
            elementClass = 'action';

            onLeftClick = () => this.onKeyLeftClick(key, dungeon);
            onRightClick = () => this.onKeyRightClick(key, dungeon);

        }

        return <>
            <td className={elementClass} onClick={onLeftClick} onContextMenu={onRightClick}>{element}</td>
            <td className={elementClass} onClick={onLeftClick} onContextMenu={onRightClick}>{elementText}</td>
        </>;

    }

    /**
     * Renders React View
     * @return {ReactDOM}
     */
    render() {
        const {triforce, config} = this.props;
        return <div className='ort-lttp'>
            <div className='left'>
                <ModuleLayout_LinkToThePast_ItemsComponent config={config} triforce={triforce} keysanity/>
            </div>
            <div className='right'>
                {this.renderDungeons()}
            </div>
        </div>;
    }
}
