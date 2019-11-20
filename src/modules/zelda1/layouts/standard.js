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
        const state = {items:{}};

        for (const key in config.items) {
            state.items[key] = {active:false, level:0, counter:0};
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
     * Renders the item grid
     * @return {ReactDOM}
     */
    renderItems() {
        return ItemHelper.renderItems(
            'zelda1', 
            'items', 
            this.configService.moduleState, 
            this.props.config, 
            this.onItemLeftClick, 
            this.onItemRightClick
        );
    }

    render() {
        return <div className='ort-zelda1'>
            <div className='top'>
                {this.renderItems()}
            </div>
        </div>;
    }

}
