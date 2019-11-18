import ConfigDefault from '../schemas/config.json';
import clone from 'clone';

export default class ConfigService {

    /** Electron or Web Controller, Handles Various Items **/
    controller = null;

    /** Data storage array **/
    _data = {};

    /** Singleton Instance **/
    static instance = null;

    /** Allowed Locales **/
    static locales = ['en', 'de', 'es', 'fr', 'ja', 'ko', 'ru'];

    /**
     * Singleton constructor
     * @param {Function} updateHandler - Update handler, in views/Root
     * @param {Controller} controller - Either an instance of controllers/Electron or controllers/Web depending on webpack.
     * @return {ConfigService}
     **/
    static getInstance(updateHandler, controller) {
        if (ConfigService.instance) {
            return ConfigService.instance;
        }
        return ConfigService.instance = new ConfigService(updateHandler, controller);  
    }

    /**
     * Constructor
     * @param {Function} updateHandler - Update handler, in views/Root
     * @param {Controller} controller - Either an instance of controllers/Electron or controllers/Web depending on webpack.
     **/
    constructor(updateHandler, controller) {
        
        this.onUpdate   = updateHandler;
        this.controller = controller;

        // Electron controller uses electron-store, web uses local storage.
        this._data = this.controller.getConfig();
        if (!this._data) {
            this._data = clone(ConfigDefault);
        }
        
    }

    /**
     * Writes the config, the write for the static storage is in the controller methods based on platform.
     * @param {Function} callback - Callback function to controller.
     * @return {void}
     **/
    _writeConfig(callback=false) {

        this.onUpdate();

        // Electron controller uses electron-store, web uses local storage.
        this.controller.setConfig(this._data);

        if (callback) {
            callback();
        }

    }




    /////////////////////////////////////////////
    ////////// Getters
    /////////////////////////////////////////////

    /**
     * GETTER: Font options, may be better suited to a JSON file in the future.
     * @return {array}
     **/
    get fontOptions() {
        return [
            {label:'Sans-Serif', value:'sans-serif'},
            {label:'Serif', value:'serif'},
            {label:'Monospace', value:'monospace'},

            // Roboto (Google)
            {label:'Roboto', value:'roboto'},
            {label:'Roboto Thin', value:'roboto-thin'},
            {label:'Roboto Bold', value:'roboto-bold'},
            {label:'Roboto Black', value:'roboto-black'},

            // Fira Sans (Google, Carrois Apostrophe)
            {label:'Fira', value:'fira'},
            {label:'Fira Thin', value:'fira-thin'},
            {label:'Fira Bold', value:'fira-bold'},
            {label:'Fira Black', value:'fira-black'},

            // Proza Libre (Google, Jasper de Waard)
            {label:'Proza Libre', value:'proza'},
            {label:'Proza Libre Bold', value:'proza-bold'},

            // Random Pixel Fonts
            {label:'Commodore 64', value:'c64'},
            {label:'Vibes', value:'vibes'},
            {label:'Famicom ', value:'nes'},
            {label:'Code Page 437', value:'codepage'},
        ];
    }

    /**
     * GETTER: Broadcast Mode
     * @return {bool} v
     **/
    get broadcast() {
        return this._data.broadcast;
    }

    /**
     * GETTER: Current Module
     * @return {string} v
     **/
    get module() {
        return this._data.module;
    }

    /**
     * GETTER: Module Layout
     * @return {string} v
     **/
    get moduleLayout() {
        return this._data.moduleLayout;
    }

    /**
     * GETTER: Module default state, handled at the module level. Used on reset.
     * @return {object} v
     **/
    get moduleStateDefault() {
        return this._data.moduleStateDefault;
    }

    /**
     * GETTER: Current module state, handled at the module level.
     * @return {object} v
     **/
    get moduleState() {
        return this._data.moduleState;
    }

    /**
     * GETTER: Current two-character language key.
     * @return {string} v
     **/
    get locale() {
        return (this._data.locale) ? this._data.locale : 'en';
    }

    /**
     * GETTER: Background color.
     * @return {string} v
     **/
    get backgroundColor() {
        return this._data.backgroundColor;
    }

    /**
     * GETTER: Font color.
     * @return {string} v
     **/
    get fontColor() {
        return this._data.fontColor;
    }

    /**
     * GETTER: Zoom level.
     * @return {number} v
     **/
    get zoom() {
        return this._data.zoom;
    }

    /**
     * GETTER: Always on top (Electron Only)
     * @return {bool} v
     **/
    get alwaysOnTop() {
        return this._data.alwaysOnTop;
    }

    /**
     * GETTER: Timer enabled.
     * @return {bool} v
     **/
    get timer() {
        return this._data.timer;
    }

    /**
     * GETTER: Timer font
     * @return {string} v
     **/
    get timerFont() {
        return this._data.timerFont;
    }

    /**
     * GETTER: Timer font color
     * @return {string} v
     **/
    get timerFontColor() {
        return this._data.timerFontColor;
    }

    /**
     * GETTER: Timer font size. (pixels)
     * @return {integer} v
     **/
    get timerFontSize() {
        return this._data.timerFontSize;
    }

    /**
     * GETTER: Timer padding. (pixels)
     * @return {integer} v
     **/
    get timerPadding() {
        return this._data.timerPadding ? this._data.timerPadding : 10;
    }

    /**
     * GETTER: Game title, if empty the game title isn't shown.
     * @return {string} v
     **/
    get gameTitle() {
        return this._data.gameTitle;
    }

    /**
     * GETTER: Game title font. 
     * @return {string} v
     **/
    get gameTitleFont() {
        return this._data.gameTitleFont;
    }

    /**
     * GETTER: Game title font color. 
     * @return {string} v
     **/
    get gameTitleFontColor() {
        return this._data.gameTitleFontColor;
    }

    /**
     * GETTER: Game title font size. (pixels)
     * @return {integer} v
     **/
    get gameTitleFontSize() {
        return this._data.gameTitleFontSize;
    }

    /**
     * GETTER: Game title padding. (pixels)
     * @return {integer} v
     **/
    get gameTitlePadding() {
        return this._data.gameTitlePadding ? this._data.gameTitlePadding : 10;
    }

    /**
     * GETTER: Window size via an electron bounds (Electron Only)
     * @return {object} v
     **/
    get bounds() {
        return this._data.bounds;
    }


    /**
     * GETTER: Help window dialog display state.
     * @return {bool} v
     **/
    get modalHelp() {
        return this._data.modalHelp;
    }



    /////////////////////////////////////////////
    ////////// Setters
    /////////////////////////////////////////////

    /**
     * SETTER: Sets the broadcast mode state.
     * @param {bool} v
     * @return {void}
     **/
    set broadcast(v) {
        this._data.broadcast = v;
        this._writeConfig();
    }

    /**
     * SETTER: Sets the module.
     * @param {string} v
     * @return {void}
     **/
    set module(v) {
        this._data.module = v;
        this._writeConfig();
    }

    /**
     * SETTER: Sets the module layout.
     * @param {string} v
     * @return {void}
     **/
    set moduleLayout(v) {
        this._data.moduleLayout = v;
        this._writeConfig();
    }

    /**
     * SETTER: Sets the module state default, usually when a new module is mounted.
     * @param {object} v
     * @return {void}
     **/
    set moduleStateDefault(v) {
        this._data.moduleStateDefault = v;
        this._writeConfig();
    }

    /**
     * SETTER: Sets the module state, usually when a tracker state has changed.
     * @param {object} v
     * @return {void}
     **/
    set moduleState(v) {
        this._data.moduleState = v;
        this._writeConfig();
    }

    /**
     * SETTER: Sets the two-character language key.
     * @param {string} v
     * @return {void}
     **/
    set locale(v) {
        if (!ConfigService.locales.includes(v)) {
            v = 'en';
        }
        this._data.locale = v;
        this._writeConfig();
    }

    /**
     * SETTER: Background color, trims it accordingly.
     * @param {string} v
     * @return {void}
     **/
    set backgroundColor(v) {
        v = v.trim();
        this._data.backgroundColor = v;
        this._writeConfig();
    }

    /**
     * SETTER: Font color, trims it accordingly.
     * @param {string} v
     * @return {void}
     **/
    set fontColor(v) {
        v = v.trim();
        this._data.fontColor = v;
        this._writeConfig();
    }
    /**
     * SETTER: Zoom level.
     * @param {integer} v
     * @return {void}
     **/
    set zoom(v) {
        this._data.zoom = v;
        this._writeConfig();
    }

    /**
     * SETTER: Sets always on top state, triggers controller (Electron Only)
     * @param {bool} v
     * @return {void}
     **/
    set alwaysOnTop(v) {
        this._data.alwaysOnTop = v;
        if (this.controller.onAlwaysOnTop) {
            this._writeConfig(this.controller.onAlwaysOnTop);
        } else {
            this._writeConfig();
        }
    }

    /**
     * SETTER: Sets timer enabled/disabled state.
     * @param {bool} v
     * @return {void}
     **/
    set timer(v) {
        this._data.timer = v;
        this._writeConfig();
    }

    /**
     * SETTER: Timer font family.
     * @param {string} v
     * @return {void}
     **/
    set timerFont(v) {
        this._data.timerFont = v;
        this._writeConfig();
    }

    /**
     * SETTER: Timer font color.
     * @param {string} v
     * @return {void}
     **/
    set timerFontColor(v) {
        this._data.timerFontColor = v;
        this._writeConfig();
    }

    /**
     * SETTER: Timer font size. (Pixels)
     * @param {integer} v
     * @return {void}
     **/
    set timerFontSize(v) {
        this._data.timerFontSize = v;
        this._writeConfig();
    }

    /**
     * SETTER: Timer font padding. (Pixels)
     * @param {integer} v
     * @return {void}
     **/
    set timerPadding(v) {
        this._data.timerPadding = v;
        this._writeConfig();
    }

    /**
     * SETTER: Game title
     * @param {string} v
     * @return {void}
     **/
    set gameTitle(v) {
        this._data.gameTitle = v;
        this._writeConfig();
    }

    /**
     * SETTER: Game title font.
     * @param {string} v
     * @return {void}
     **/
    set gameTitleFont(v) {
        this._data.gameTitleFont = v;
        this._writeConfig();
    }

    /**
     * SETTER: Game title font color.
     * @param {string} v
     * @return {void}
     **/
    set gameTitleFontColor(v) {
        this._data.gameTitleFontColor = v;
        this._writeConfig();
    }

    /**
     * SETTER: Game title font size. (Pixels)
     * @param {integer} v
     * @return {void}
     **/
    set gameTitleFontSize(v) {
        this._data.gameTitleFontSize = v;
        this._writeConfig();
    }

    /**
     * SETTER: Game title font padding. (Pixels)
     * @param {integer} v
     * @return {void}
     **/
    set gameTitlePadding(v) {
        this._data.gameTitlePadding = v;
        this._writeConfig();
    }

    /**
     * SETTER: Window bounds (Electron Only)
     * @param {object} v
     * @return {void}
     **/
    set bounds(v) {
        this._data.bounds = v;
        this._writeConfig();
    }

    /**
     * SETTER: Help Modal display/hide
     * @param {bool} v
     * @return {void}
     **/
    set modalHelp(v) {
        this._data.modalHelp = v;
        this._writeConfig();
    }

}
