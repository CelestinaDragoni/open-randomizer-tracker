import React from "react";
import "./styles.sass";

export default class ModuleLayout_LinkToThePast_Standard extends React.Component {

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
            state.dungeons[key] = {active:false, marker:0};
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

        this.state.dungeons[key].marker += 1;

        if (this.state.dungeons[key].marker === this.markerEnum.length) {
            this.state.dungeons[key].marker = 0;
        }

        this.forceUpdate();

    }

    /**
     * Handles toggling if the dungeon has been completed
     * @param {string} key - Dungeon Key
     * @param {object} dungeon - Dungeon Properties
     * @return {void}
     */
    onMarkerLeftClick = (key, dungeon) => {

        this.state.dungeons[key].active = !this.state.dungeons[key].active;
        this.forceUpdate();

    }

    /**
     * Changes the style for progressive items such as tunics and swords.
     * @param {string} key - Item Key
     * @param {object} item - Item Properties
     * @return {void}
     */
    onItemRightClick = (key, item) => {

        if (item.progressive) {

            let level = this.state.items[key].level;
            level = level+1;

            if (level >= item.styles.length) {
                level = 0;
            }

            this.state.items[key].level = level;
            this.forceUpdate();

        }

    }

    /**
     * Changes the active state of items, counter objects such as bottles are also handled.
     * @param {string} key - Item Key
     * @param {object} item - Item Properties
     * @return {void}
     */
    onItemLeftClick = (key, item) => {

        let active = !this.state.items[key].active;
        let counter = 0;

        if (item.counter) {

            counter = this.state.items[key].counter;
            counter = counter+1;

            if (counter > item.counter) {
                counter = 0;
                active = false;
            } else {
                active = true;
            }

        }

        this.state.items[key].active = active;
        this.state.items[key].counter = counter; 
        this.forceUpdate();
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
            const item = config.items[key];
            const element = this._renderItem(key, item, state);
            elements.push(element);
        }

        return <div className='ort-lttp-items'>
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

            if (dungeon.crystal !== false || dungeon.pendant !== false) {
                elements.push(<tr key={key}>
                    <td>{key}</td>
                    {this._renderMarker(key, dungeon, state)}
                </tr>);
            }

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