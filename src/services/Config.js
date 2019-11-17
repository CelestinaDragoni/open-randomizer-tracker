import ConfigDefault from '../schemas/config.json';
import clone from 'clone';
import store from 'electron-store';

export default class ConfigService {

    _data = {};
    _store = null;
    static instance = null;
    static locales = ['en', 'de', 'es', 'fr', 'ja', 'ko', 'ru'];

    static getInstance(updateHandler, rootController) {
        if (ConfigService.instance) {
            return ConfigService.instance;
        }
        return ConfigService.instance = new ConfigService(updateHandler, rootController);  
    }

    // Getters
    constructor(updateHandler, rootController) {
        this._store = new store();
        if (this._store.get('config')) {
            this._data = this._store.get('config');
        } else {
            this._data = clone(ConfigDefault);
        }
        this.onUpdate = updateHandler;
        this.rootController = rootController;
    }

    _writeConfig(callback=false) {

        this.onUpdate();
        this._store.set('config', this._data);

        if (callback) {
            callback();
        }

    }

    get fontOptions() {
        return [
            {label:'Sans-Serif', value:'sans-serif'},
            {label:'Serif', value:'serif'},
            {label:'Monospace', value:'monospace'},
            {label:'Roboto', value:'roboto'},
            {label:'Roboto Medium', value:'roboto-medium'},
            {label:'Roboto Bold', value:'roboto-bold'},
            {label:'Commodore 64', value:'c64'},
            {label:'Vibes', value:'vibes'},
            {label:'Nokia', value:'nokia'},
        ];
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

    get moduleStateDefault() {
        return this._data.moduleStateDefault;
    }

    get moduleState() {
        return this._data.moduleState;
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

    get timerFont() {
        return this._data.timerFont;
    }

    get timerFontSize() {
        return this._data.timerFontSize;
    }

    get gameTitle() {
        return this._data.gameTitle;
    }

    get gameTitleFont() {
        return this._data.gameTitleFont;
    }

    get gameTitleFontSize() {
        return this._data.gameTitleFontSize;
    }

    get bounds() {
        return this._data.bounds;
    }

    get modalHelp() {
        return this._data.modalHelp;
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

    set moduleStateDefault(v) {
        this._data.moduleStateDefault = v;
        this._writeConfig();
    }

    set moduleState(v) {
        this._data.moduleState = v;
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
        this._writeConfig(this.rootController.onAlwaysOnTop);
    }

    set timer(v) {
        this._data.timer = v;
        this._writeConfig();
    }

    set timerFont(v) {
        this._data.timerFont = v;
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

    set gameTitleFont(v) {
        this._data.gameTitleFont = v;
        this._writeConfig();
    }

    set gameTitleFontSize(v) {
        this._data.gameTitleFontSize = v;
        this._writeConfig();
    }

    set bounds(v) {
        this._data.bounds = v;
        this._writeConfig();
    }

    set modalHelp(v) {
        this._data.modalHelp = v;
        this._writeConfig();
    }

}
