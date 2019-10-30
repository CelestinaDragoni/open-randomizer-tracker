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

    constructor(updateHandler) {
        this._data = clone(ConfigDefault);
        this.onUpdate = updateHandler;
    }

    // Getters
    get bounds() {
        return this._data.bounds;
    }

    get boundsX() {
        return this._data.bounds.x;
    }

    get boundsY() {
        return this._data.bounds.y;
    }

    get boundsHeight() {
        return this._data.bounds.height;
    }

    get boundsWidth() {
        return this._data.bounds.width;
    }

    get loading() {
        return this._data.loading
    }

    get dev() {
        return this._data.dev ? true : false;
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
    

    // Setters
    set bounds(v) {
        this._data.bounds = v;
        this._writeConfig();
    }

    set boundsX(v) {
        this._data.bounds.x = parseInt(v, 10);
        this._writeConfig();
    }

    set boundsY(v) {
        this._data.bounds.y = parseInt(v, 10);
        this._writeConfig();
    }

    set boundsHeight(v) {
        this._data.bounds.height = parseInt(v, 10);
        this._writeConfig();
    }

    set boundsWidth(v) {
        this._data.bounds.width = parseInt(v, 10);
        this._writeConfig();
    }

    set loading(v) {
        this._data.loading = v ? true : false;
        this._writeConfig();
    }

    set dev(v) {
        this._data.dev = v;
        this._writeConfig();
    }

    set broadcast(v) {
        this._data.broadcast = v;
        this._writeConfig();
    }

    set profile(v) {
        this._data.profile = v;
        this._writeConfig();
    }

    set directory(v) {
        this._data.directory = v;
        this._writeConfig();
    }

    set locale(v) {
        if (!ConfigService.locales.includes(v)) {
            v = 'en';
        }
        this._data.locale = v;
        this._writeConfig();
    }

    set panels(v) {
        this._data.panel = v;
        this._writeConfig();
    }

    set panelMapper(v) {
        this._data.panels.mapper = v ? true : false;
        this._writeConfig();
    }

    set panelTester(v) {
        this._data.panels.tester = v ? true : false;
        this._writeConfig();
    }

    set panelProfile(v) {
        this._data.panels.profile = v ? true : false;
        this._writeConfig();
    }

    _writeConfig() {
        this.onUpdate();
    }

}