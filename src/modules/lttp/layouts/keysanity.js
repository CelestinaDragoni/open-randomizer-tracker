import React from "react";
import "./styles.sass";

export default class ModuleLayout_LinkToThePast_Keysanity extends React.Component {

    /** Handles Marker Enumeration **/
    markerEnum = ["unknown", "crystal", "redcrystal", "courage", "power", "wisdom"];

    /**
     * componentWillMount - Handles clearing the state and resetting it when the component will be mounted.
     * @return {void}
     */
    componentWillMount() {

        const config = this.props.config;
        const state = {items:{}, dungeons:{}};

        for (const key in config.items) {
            state.items[key] = {active:false, level:0, counter:0};
        }

        for (const key in config.dungeons) {
            state.dungeons[key] = {active:false, master:false, marker:0, keys:0};
        }

        this.setState(state);

    }

    /**
     * Handles toggling between pendants and crystals
     * @param {string} key - Dungeon Key
     * @param {object} dungeon - Dungeon Properties
     * @return {void}
     */
    onMarkerRightClick = (key, dungeon) => {

        const state = this.state;

        state.dungeons[key].marker += 1;

        if (state.dungeons[key].marker === this.markerEnum.length) {
            state.dungeons[key].marker = 0;
        }

        this.setState(state);

    }

    /**
     * Handles toggling if the dungeon has been completed
     * @param {string} key - Dungeon Key
     * @param {object} dungeon - Dungeon Properties
     * @return {void}
     */
    onMarkerLeftClick = (key, dungeon) => {

        const state = this.state;
        state.dungeons[key].active = !state.dungeons[key].active;
        this.setState(state);

    }

    /**
     * Handles toggling if you have the master key
     * @param {string} key - Dungeon Key
     * @param {object} dungeon - Dungeon Properties
     * @return {void}
     */
    onMasterLeftClick = (key, dungeon) => {

        const state = this.state;

        state.dungeons[key].master = !state.dungeons[key].master;

        this.setState(state);

    }

    /**
     * Decreases the key amount
     * @param {string} key - Dungeon Key
     * @param {object} dungeon - Dungeon Properties
     * @return {void}
     */
    onKeyRightClick = (key, dungeon) => {

        const state = this.state;

        if (this.state.dungeons[key].keys === 0) {
            state.dungeons[key].keys = dungeon.keys;
        } else {
            state.dungeons[key].keys -= 1;
        }

        this.setState(state);

    }

    /**
     * Increases the key amount
     * @param {string} key - Dungeon Key
     * @param {object} dungeon - Dungeon Properties
     * @return {void}
     */
    onKeyLeftClick = (key, dungeon) => {

        const state = this.state;

        if (dungeon.keys  === state.dungeons[key].keys) {
            state.dungeons[key].keys = 0;
        } else {
            state.dungeons[key].keys += 1;
        }

        this.setState(state);

    }

    /**
     * Changes the style for progressive items such as tunics and swords. Handles counting down as well.
     * @param {string} key - Item Key
     * @param {object} item - Item Properties
     * @return {void}
     */
    onItemRightClick = (key, item) => {

        const state = this.state;

        let counter = 0;
        let active = state.items[key].active;

        if (item.counter) {

            counter = state.items[key].counter;
            counter -= 1;
            active = true;

            if (counter < 0) {
                counter += 1;
            }
            if (counter <= 0) {
                active = false;
            }

            state.items[key].active = active;
            state.items[key].counter = counter;
            

        } else if (item.progressive) {

            let level = state.items[key].level;
            level = level+1;

            if (level >= item.styles.length) {
                level = 0;
            }

            
            state.items[key].level = level;

        }

        this.setState(state);

    }

    /**
     * Changes the active state of items, counter objects such as bottles are also handled.
     * @param {string} key - Item Key
     * @param {object} item - Item Properties
     * @return {void}
     */
    onItemLeftClick = (key, item) => {

        const state = this.state;
        let active = !state.items[key].active;
        let counter = 0;

        if (item.counter) {

            counter = state.items[key].counter;
            counter += 1;
            active = true;

            if (counter > item.counter) {
                counter -= 1;
            }

        }

        state.items[key].active = active;
        state.items[key].counter = counter; 
        this.setState(state);
    }


    /**
     * Renders the item grid
     * @return {ReactDOM}
     */
    renderItems() {
        const state = this.state;
        const config = this.props.config;
        const elements = [];

        for (const key in config.items) {
            if (key === 'triforce' && !this.props.triforce) {
                continue;
            }
            const item = config.items[key];
            const element = this._renderItem(key, item, state);
            elements.push(element);
        }

        return <div className='ort-lttp-items keysanity'>
            {elements}
        </div>
    }

        /**
         * Private function, Renders the item view and actions.
         * @param {string} key - Item Key
         * @param {object} item - Item properties
         * @param {object} state - The current state of this class
         * @return {ReactDOM}
         */
        _renderItem(key, item, state) {

            // Elements and Classes
            let icon = `${key}.png`;
            let elementCounter = null;
            let classInactive = '';

            // Actions
            let onClick = () => this.onItemLeftClick(key, item);
            let onRightClick = null;

            // State
            const {active, level, counter} = state.items[key];

            // If item is progressive, get the right icon per the style.
            if (item.progressive) {
                icon = `${key}/${item.styles[level]}.png`;
                onRightClick = () => this.onItemRightClick(key, item);
            }

            // If item is not active, gray it out.
            if (state.items[key].active === false && !item.required) {
                classInactive = 'inactive'
            }

            // If item is required, cannot be grayed out (tunic only)
            if (item.required) {
                onClick = null;
            }

            // If item has a counter, display the count (bottles only)
            if (item.counter) {
                if (counter > 0) {
                    elementCounter = <span>{counter}</span>;
                }
                onRightClick = () => this.onItemRightClick(key, item);
            }

            // Assemble
            return <div key={key}>
                <img className={classInactive} onClick={onClick} onContextMenu={onRightClick} src={window.location.origin + `/resources/modules/lttp/items/${icon}`}/>
                {elementCounter}
            </div>;

        }

    /**
     * Renders the dungeon table.
     * @return {ReactDOM}
     */
    renderDungeons() {

        const state = this.state;
        const config = this.props.config;
        const elements = [];

        for (const key in config.dungeons) {

            const dungeon = config.dungeons[key];

            elements.push(<tr key={key}>
                <td>{key}</td>
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
         * @param {object} item - Dungeon properties
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

                element = <img className={inactive} src={window.location.origin + '/resources/modules/lttp/icons/' + icon}/>
                elementClass = 'action';

                onLeftClick = () => this.onMarkerLeftClick(key, dungeon);
                onRightClick = () => this.onMarkerRightClick(key, dungeon);
            }

            return <td className={elementClass} onClick={onLeftClick} onContextMenu={onRightClick}>{element}</td>;

        }

        /**
         * Private function, Renders the dungeon master keys and binds actions.
         * @param {string} key - Dungeon Key
         * @param {object} item - Dungeon properties
         * @param {object} state - The current state of this class
         * @return {ReactDOM}
         */
        _renderMaster(key, dungeon, state) {

            let element = null;
            let elementClass = null;
            let onLeftClick = null;

            if (dungeon.master !== false) {

                const inactive = state.dungeons[key].master ? '' : 'inactive';
                element = <img className={inactive} src={window.location.origin + '/resources/modules/lttp/icons/master.png'}/>;
                elementClass = 'action';

                onLeftClick = () => this.onMasterLeftClick(key, dungeon);
            }

            return <td className={elementClass} onClick={onLeftClick}>{element}</td>;

        }

        /**
         * Private function, Renders the dungeon key counters and binds actions.
         * @param {string} key - Dungeon Key
         * @param {object} item - Dungeon properties
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

                element = <img className={classState} src={window.location.origin + '/resources/modules/lttp/icons/key.png'}/>;
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
        return <div className='ort-lttp'>
            <div className='left'>
                {this.renderItems()}
            </div>
            <div className='right'>
                {this.renderDungeons()}
            </div>
        </div>;
    }
}