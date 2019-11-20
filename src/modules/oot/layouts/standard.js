import React from "react";
import PropTypes from 'prop-types';
import clone from "clone";
import ItemHelper from "../../helpers/items";

import "./styles.sass";

import {RootContext} from '../../../context/RootContext';

export default class ModuleLayout_OcarinaOfTime_Standard extends React.Component {

    /** React PropTypes **/
    static propTypes = {
        config:PropTypes.object.isRequired
    };

    static contextType = RootContext;
    configService = null;
    markerLength = 10;

    /**
     * componentWillMount - Handles clearing the state and resetting it when the component will be mounted.
     * @return {void}
     */
    UNSAFE_componentWillMount() {

        this.configService = this.context.config;

        const config = this.props.config;
        const state = {items:{}, equipment:{}, songs:{}, 'songs-major':{}, dungeons:{}, 'dungeons-mini':{}};

        for (const key in config.items) {
            state.items[key] = {active:false, level:0, counter:0};
        }

        for (const key in config.equipment) {
            state.equipment[key] = {active:false, level:0, counter:0};
        }

        for (const key in config.songs) {
            state.songs[key] = {active:false};
        }

        for (const key in config['songs-major']) {
            state['songs-major'][key] = {active:false};
        }

        for (const key in config.dungeons) {
            const marker = config.dungeons[key].marker ? config.dungeons[key].marker : 0;
            state.dungeons[key] = {active:false, master:false, marker:marker, keys:0};
        }

        for (const key in config['dungeons-mini']) {
            state['dungeons-mini'][key] = {active:false, keys:0};
        }

        this.configService.moduleStateDefault = clone(state);
        this.configService.moduleState = clone(state);

    }

    /**
     * Activates item
     * @param {string} key - Item Key
     * @param {object} item - Item Properties
     * @param {string} group - Item Group
     * @return {void}
     */
    onItemLeftClick = (key, item, group) => {
        const state = this.configService.moduleState;
        state[group][key] = ItemHelper.onLeftClick(key, item, state[group][key]);
        this.configService.moduleState = state;
    }

    /**
     * Cycles item if it is progressive or a counter
     * @param {string} key - Item Key
     * @param {object} item - Item Properties
     * @param {string} group - Item Group
     * @return {void}
     */
    onItemRightClick = (key, item, group) => {
        const state = this.configService.moduleState;
        state[group][key] = ItemHelper.onRightClick(key, item, state[group][key]);
        this.configService.moduleState = state;
    }

    /**
     * Toggles marker as active
     * @param {string} key - Dungeon Key
     * @param {object} dungeon - Dungeon Properties
     * @param {string} group - Dungeon Group (regular or mini)
     * @return {void}
     */
    onMarkerLeftClick = (key, dungeon, group) => {

        if (dungeon.required) {
            return;
        }

        const state = this.configService.moduleState;
        state[group][key].active = !state[group][key].active;
        this.configService.moduleState = state;

    }

    /**
     * Cycles through markers
     * @param {string} key - Dungeon Key
     * @param {object} dungeon - Dungeon Properties
     * @param {string} group - Dungeon Group (regular or mini)
     * @return {void}
     */
    onMarkerRightClick = (key, dungeon, group) => {

        const state = this.configService.moduleState;

        state[group][key].marker += 1;

        if (state[group][key].marker === this.markerLength) {
            state[group][key].marker = 0;
        }

        this.configService.moduleState = state;

    }

    /**
     * Toggles master key
     * @param {string} key - Dungeon Key
     * @param {object} dungeon - Dungeon Properties
     * @param {string} group - Dungeon Group (regular or mini)
     * @return {void}
     */
    onMasterLeftClick = (key, dungeon, group) => {
        const state = this.configService.moduleState;
        state[group][key].master = !state[group][key].master;
        this.configService.moduleState = state;
    }

    /**
     * Increases the key amount
     * @param {string} key - Dungeon Key
     * @param {object} dungeon - Dungeon Properties
     * @param {string} group - Dungeon Group (regular or mini)
     * @return {void}
     */
    onKeyLeftClick = (key, dungeon, group) => {

        const state = this.configService.moduleState;

        if (dungeon.keys !== state[group][key].keys) {
            state[group][key].keys += 1;
        }

        this.configService.moduleState = state;

    }

    /**
     * Decreases the key amount
     * @param {string} key - Dungeon Key
     * @param {object} dungeon - Dungeon Properties
     * @param {string} group - Dungeon Group (regular or mini)
     * @return {void}
     */
    onKeyRightClick = (key, dungeon, group) => {

        const state = this.configService.moduleState;

        if (state[group][key].keys !== 0) {
            state[group][key].keys -= 1;
        }

        this.configService.moduleState = state;

    }

    /**
     * Renders the item grid
     * @return {ReactDOM}
     */
    renderItems() {
        return ItemHelper.renderItems(
            'oot', 
            'items', 
            this.configService.moduleState, 
            this.props.config, 
            this.onItemLeftClick, 
            this.onItemRightClick
        );
    }

    /**
     * Renders the equipment grid
     * @return {ReactDOM}
     */
    renderEquipment() {
        return ItemHelper.renderItems(
            'oot', 
            'equipment', 
            this.configService.moduleState, 
            this.props.config, 
            this.onItemLeftClick, 
            this.onItemRightClick
        );
    }

    /**
     * Renders the minor songs grid
     * @return {ReactDOM}
     */
    renderMinorSongs() {
        return ItemHelper.renderItems(
            'oot', 
            'songs', 
            this.configService.moduleState, 
            this.props.config, 
            this.onItemLeftClick, 
            this.onItemRightClick
        );

    }

    /**
     * Renders the major grid
     * @return {ReactDOM}
     */
    renderMajorSongs() {
        return ItemHelper.renderItems(
            'oot', 
            'songs-major', 
            this.configService.moduleState, 
            this.props.config, 
            this.onItemLeftClick, 
            this.onItemRightClick
        );
    }

    /**
     * Renders the dungeon table
     * @param {string} stateKey - Dungeon or Dungeon Mini
     * @return {ReactDOM}
     */
    renderDungeon(stateKey) {

        const config = this.props.config;
        const dungeons = config[stateKey];
        const headers = [];

        for (const key in dungeons) {
            headers.push(<th key={`header-${key}`}>{key}</th>);
        }

        return <div className='ort-oot-dungeons'>
            <table>
                <thead>
                    {headers}
                </thead>
                <tbody>
                    {this._renderDungeonMarkers(stateKey, dungeons)}
                    {this._renderDungeonMasterKey(stateKey, dungeons)}
                    {this._renderDungeonSmallKeys(stateKey, dungeons)}
                </tbody>
            </table>
        </div>;
    }

    /**
     * Renders the dungeon markers (Dungeons only)
     * @param {string} stateKey - Dungeon key
     * @param {object} dungeons - List of Dungeons
     * @return {ReactDOM}
     */
    _renderDungeonMarkers(stateKey, dungeons) {

        if (stateKey === 'dungeons-mini') {
            return null;
        }

        const moduleState = this.configService.moduleState;
        const elements = [];

        for (const key in dungeons) {

            const dungeon = dungeons[key];
            const state = moduleState[stateKey][key];
            const onLeftClick = () => this.onMarkerLeftClick(key, dungeon, stateKey);
            const onRightClick = () => this.onMarkerRightClick(key, dungeon, stateKey);
            let className = '';

            // If item is not active, gray it out.
            if (state.active === false && !dungeon.required) {
                className = 'inactive';
            }

            elements.push(<td className={`action ${className}`} onClick={onLeftClick} onContextMenu={onRightClick}>
                <img src={`resources/modules/oot/icons/${state.marker}.png`}/>
            </td>);

        }

        return <tr>{elements}</tr>;

    }

    /**
     * Renders the dungeon master keys (Dungeons only)
     * @param {string} stateKey - Dungeon key
     * @param {object} dungeons - List of Dungeons
     * @return {ReactDOM}
     */
    _renderDungeonMasterKey(stateKey, dungeons) {

        if (stateKey === 'dungeons-mini') {
            return null;
        }

        const moduleState = this.configService.moduleState;
        const elements = [];

        for (const key in dungeons) {

            const dungeon = dungeons[key];
            const state = moduleState[stateKey][key];
            const onLeftClick = () => this.onMasterLeftClick(key, dungeon, stateKey);
            let className = '';

            if (!dungeon.master) {
                elements.push(<td></td>);
                continue;
            }

            // If item is not active, gray it out.
            if (state.master === false) {
                className = 'inactive';
            }

            elements.push(<td className={`action ${className}`} onClick={onLeftClick}>
                <img src={`resources/modules/oot/icons/master.png`}/>
            </td>);

        }

        return <tr>{elements}</tr>;

    }

    /**
     * Renders the dungeon key counter
     * @param {string} stateKey - Dungeon key
     * @param {object} dungeons - List of Dungeons
     * @return {ReactDOM}
     */
    _renderDungeonSmallKeys(stateKey, dungeons) {

        const moduleState = this.configService.moduleState;
        const elements = [];
        
        for (const key in dungeons) {

            const dungeon = dungeons[key];
            const state = moduleState[stateKey][key];

            const onLeftClick = () => this.onKeyLeftClick(key, dungeon, stateKey);
            const onRightClick = () => this.onKeyRightClick(key, dungeon, stateKey);

            let className = '';

            if (!dungeon.keys) {
                elements.push(<td></td>);
                continue;
            }

            // If item is not active, gray it out.
            if (state.keys <= 0) {
                className = 'inactive';
            } else if (state.keys === dungeon.keys) {
                className = 'maxed';
            }

            elements.push(<td className={`action ${className}`} onClick={onLeftClick} onContextMenu={onRightClick}>
                <img src={`resources/modules/oot/icons/key.png`}/>{state.keys}
            </td>);

        }

        return <tr>{elements}</tr>;

    }

    render() {
        return <div className='ort-oot'>
            <div className='top'>
                {this.renderEquipment()}
                {this.renderItems()}
                {this.renderMinorSongs()}
                {this.renderMajorSongs()}
            </div>
            <div className='bottom'>
                <div>{this.renderDungeon('dungeons')}</div>
                <div>{this.renderDungeon('dungeons-mini')}</div>
            </div>
        </div>;
    }

}
