import ConfigService from './Config';

import i18n_de from '../language/de.json';
import i18n_en from '../language/en.json';
import i18n_es from '../language/es.json';
import i18n_fr from '../language/fr.json';
import i18n_ja from '../language/ja.json';
import i18n_ko from '../language/ko.json';
import i18n_ru from '../language/ru.json';

export default class LanguageService {

    static instance = null;

    static getInstance() {
        if (LanguageService.instance) {
            return ConfigService.instance;
        }
        return LanguageService.instance = new LanguageService();
    }

    constructor() {
        // Global Function
        window._ = this._.bind(this);
    }

    _(key) {

        const locale = ConfigService.getInstance().locale;
        const fn = `_get${locale.toUpperCase()}`;
        let string = false;

        try {
            string = this[fn](key);
        } catch (e) {
            string = false;
        }

        return (string) ? string : key;
        
    }

    _getDE(key) {
        if(typeof i18n_de[key] !== 'undefined') {
            return i18n_de[key];
        }
        return false;
    }

    _getEN(key) {
        if(typeof i18n_en[key] !== 'undefined') {
            return i18n_en[key];
        }
        return false;
    }

    _getES(key) {
        if(typeof i18n_es[key] !== 'undefined') {
            return i18n_es[key];
        }
        return false;
    }

    _getFR(key) {
        if(typeof i18n_fr[key] !== 'undefined') {
            return i18n_fr[key];
        }
        return false;
    }

    _getJA(key) {
        if(typeof i18n_ja[key] !== 'undefined') {
            return i18n_ja[key];
        }
        return false;
    }

    _getKO(key) {
        if(typeof i18n_ko[key] !== 'undefined') {
            return i18n_ko[key];
        }
        return false;
    }

    _getRU(key) {
        if(typeof i18n_ru[key] !== 'undefined') {
            return i18n_ru[key];
        }
        return false;
    }

}
