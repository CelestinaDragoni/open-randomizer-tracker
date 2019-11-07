import ConfigDefault from '../schemas/config.json';
import clone from 'clone';

export default class ConfigService {

    _data = {};
    static instance = null;
    static locales = ['en', 'de', 'es', 'fr', 'ja', 'ko', 'ru'];

    static getInstance(updateHandler) {
        if (ConfigService.instance) {
            return ConfigService.instance;
        }
        return ConfigService.instance = new ConfigService(updateHandler);  
    }

    // Getters
    constructor(updateHandler) {
        this._data = clone(ConfigDefault);
        this.onUpdate = updateHandler;
    }

    get broadcast() {
        return this._data.broadcast;
    }

    get module() {
        return this._data.module;
    }

    get moduleLayout() {
        return this._data.moduleLayout;
    }

    get locale() {
        return (this._data.locale) ? this._data.locale : 'en';
    }

    get backgroundColor() {
        return this._data.backgroundColor;
    }

    get zoom() {
        return this._data.zoom;
    }

    get alwaysOnTop() {
        return this._data.alwaysOnTop;
    }

    get timer() {
        return this._data.timer;
    }

    get timerFontSize() {
        return this._data.timerFontSize;
    }

    get gameTitle() {
        return this._data.gameTitle;
    }

    get gameTitleFontSize() {
        return this._data.gameTitleFontSize;
    }


    // Setters
    set broadcast(v) {
        this._data.broadcast = v;
        this._writeConfig();
    }

    set module(v) {
        this._data.module = v;
        this._writeConfig();
    }

    set moduleLayout(v) {
        this._data.moduleLayout = v;
        this._writeConfig();
    }

    set locale(v) {
        if (!ConfigService.locales.includes(v)) {
            v = 'en';
        }
        this._data.locale = v;
        this._writeConfig();
    }

    set backgroundColor(v) {
        v = v.trim();

        if (v.length > 7) {
            v = v.substring(0, 7);
        }

        this._data.backgroundColor = v;
        this._writeConfig();
    }

    set zoom(v) {
        this._data.zoom = v;
        this._writeConfig();
    }

    set alwaysOnTop(v) {
        this._data.alwaysOnTop = v;
        this._writeConfig();
    }

    set timer(v) {
        this._data.timer = v;
        this._writeConfig();
    }

    set timerFontSize(v) {
        this._data.timerFontSize = v;
        this._writeConfig();
    }

    set gameTitle(v) {
        this._data.gameTitle = v;
        this._writeConfig();
    }

    set gameTitleFontSize(v) {
        this._data.gameTitleFontSize = v;
        this._writeConfig();
    }



    _writeConfig() {
        this.onUpdate();
    }

}
