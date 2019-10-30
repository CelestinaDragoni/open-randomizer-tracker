import React from "react";
import "./styles.sass";

export default class ModuleLayout_LinkToThePast_Keysanity extends React.Component {

    crystalEnum = ["crystal", "bomb-crystal", "courage", "power", "wisdom"];

    onCrystalRightClick = () => {


    }

    onCrystalLeftClick = () => {


    }

    renderItems() {
        const state = this.props.controller.state;
        const config = this.props.controller.config;
        const elements = [];

        console.log(config.items);

        for (const key in config.items) {

            const item = config.items[key];

            let icon = null;
            if (item.progressive) {
                icon = `${key}/${item.styles[0]}.png`;
            } else {
                icon = `${key}.png`;
            }

            elements.push(
                <div key={key}>
                    <img className='inactive' src={window.location.origin + `/resources/modules/lttp/items/${icon}`}/>
                </div>
            );

        }

        return <div className='ort-lttp-keysanity-items'>
            {elements}

        </div>
    }

    renderDungeons() {

        const state = this.props.controller.state;
        const config = this.props.controller.config;
        const elements = [];

        for (const key in config.dungeons) {

            const dungeon = config.dungeons[key];

            let crystal = null;
            let crystalActionClass = null
            if (dungeon.crystal !== false || dungeon.pendant !== false) {
                crystal = <img className='inactive' src={window.location.origin + '/resources/modules/lttp/icons/crystal.png'}/>
                crystalActionClass = 'action'
            }

            let keys = null;
            let keysLabel = null;
            let keysActionClass = null;
            if (dungeon.keys > 0) {
                keys        = <img className='inactive' src={window.location.origin + '/resources/modules/lttp/icons/key.png'}/> 
                keysLabel   = <span className='inactive'>0/{dungeon.keys}</span>;
                keysActionClass = 'action';
            }

            elements.push(<tr key={key} >
                <td>{key}</td>
                <td className={crystalActionClass}>{crystal}</td>
                <td className={keysActionClass}>{keys}</td>
                <td className={keysActionClass}>{keysLabel}</td>
            </tr>);
        }

        return <table className='ort-lttp-keysanity-dungeons'>
            <tbody>
                {elements}
            </tbody>
        </table>
    }

    render() {
        const itemElements = this.renderItems();
        const dungeonElements = this.renderDungeons();

        return <div className='ort-lttp-keysanity'>
            <div className='left'>
                {itemElements}
            </div>
            <div className='right'>
                {dungeonElements}
            </div>
        </div>;
    }
}