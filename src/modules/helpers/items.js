import React from "react";

export default class Modules_ItemHelper {

    static onLeftClick(key, item, state) {

        let active = !state.active;
        let counter = 0;

        if (item.counter) {

            counter = state.counter;
            counter += 1;
            active = true;

            if (counter > item.counter) {
                counter -= 1;
            }

        }

        state.active = active;
        state.counter = counter;

        return state;

    }

    static onRightClick(key, item, state) {

        let counter = 0;
        let active = state.active;

        if (item.counter) {

            counter = state.counter;
            counter -= 1;
            active = true;

            if (counter < 0) {
                counter += 1;
            }
            if (counter <= 0) {
                active = false;
            }

            state.active = active;
            state.counter = counter;
            
        } else if (item.progressive) {

            let level = state.level;
            level = level+1;

            if (level >= item.styles.length) {
                level = 0;
            }

            state.level = level;

        }

        return state;

    }

    static renderItems(module, group, state, config, fnClick, fnRightClick) {

        const items = config[group];
        const className = `ort-${module}-${group}`;
        const elements = [];

        for (const key in items) {
            const item = items[key];
            const element = Modules_ItemHelper.renderItem(module, group, key, item, state[group][key], fnClick, fnRightClick);
            elements.push(element);
        }

        return <div className={className}>
            {elements}
        </div>;

    }

    static renderItem(module, group, key, item, state, fnClick, fnRightClick) {

        // Elements and Classes
        let icon = `${key}.png`;
        let elementCounter = null;
        let classInactive = '';

        // Actions
        let onClick = () => fnClick(key, item, group);
        let onRightClick = null;

        // State
        const {level, counter, active} = state;

        // If item is progressive, get the right icon per the style.
        if (item.progressive) {
            icon = `${key}/${item.styles[level]}.png`;
            onRightClick = () => fnRightClick(key, item, group);
        }

        // If item is not active, gray it out.
        if (active === false && !item.required) {
            classInactive = 'inactive';
        }

        // If item is required, cannot be grayed out.
        if (item.required) {
            onClick = null;
        }

        // If item has a counter, display the count.
        if (item.counter) {
            if (counter > 0) {
                elementCounter = <span>{counter}</span>;
            }
            onRightClick = () => fnRightClick(key, item, group);
        }

        // Assemble
        return <div key={key}>
            <img className={classInactive} onClick={onClick} onContextMenu={onRightClick} src={`resources/modules/${module}/${group}/${icon}`}/>
            {elementCounter}
        </div>;        

    }

}
