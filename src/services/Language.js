import i18n_de from '../language/de.json';
import i18n_en from '../language/en.json';
import i18n_es from '../language/es.json';
import i18n_fr from '../language/fr.json';
import i18n_ja from '../language/ja.json';
import i18n_ko from '../language/ko.json';
import i18n_ru from '../language/ru.json';

export default class LanguageService {

    /** Singleton Instance **/
    static instance = null;

    /**
     * Singleton constructor
     * @param {ConfigServer} configService - Config service injection.
     * @return {LanguageService}
     **/
    static getInstance(configService) {
        if (LanguageService.instance) {
            return LanguageService.instance;
        }
        return LanguageService.instance = new LanguageService(configService);
    }

    /**
     * Constructor
     * @param {ConfigServer} configService - Config service injection.
     * @return {void}
     **/
    constructor(configService) {
        // Global Function
        this.configService = configService;
        window._ = this._.bind(this);
    }

    /**
     * Get language options for menu
     * @return {array}
     **/
    options() {
        return [
            {label:'English', value:'en'},
            {label:'Español', value:'es'},
            {label:'Français', value:'fr'},
            {label:'Deutsch', value:'de'},
            {label:'日本語', value:'ja'},
            {label:'한국어', value:'ko'},
            {label:'русский', value:'ru'}
        ];
    }

    /**
     * Bound to window, a global function for translation. Based off the same _ function from wordpress.
     * @param {string} key
     * @return {string}
     **/
    _(key) {

        const locale = this.configService.locale;
        const fn = `_get${locale.toUpperCase()}`;
        let string = false;

        try {
            string = this[fn](key);
        } catch (e) {
            string = false;
        }

        return (string) ? string : key;
        
    }

    /**
     * Get German Text.
     * @param {string} key
     * @return {string}
     **/
    _getDE(key) {
        if(typeof i18n_de[key] !== 'undefined') {
            return i18n_de[key];
        }
        return false;
    }

    /**
     * Get English Text.
     * @param {string} key
     * @return {string}
     **/
    _getEN(key) {
        if(typeof i18n_en[key] !== 'undefined') {
            return i18n_en[key];
        }
        return false;
    }

    /**
     * Get Spanish Text.
     * @param {string} key
     * @return {string}
     **/
    _getES(key) {
        if(typeof i18n_es[key] !== 'undefined') {
            return i18n_es[key];
        }
        return false;
    }

    /**
     * Get French Text.
     * @param {string} key
     * @return {string}
     **/
    _getFR(key) {
        if(typeof i18n_fr[key] !== 'undefined') {
            return i18n_fr[key];
        }
        return false;
    }

    /**
     * Get Japanese Text.
     * @param {string} key
     * @return {string}
     **/
    _getJA(key) {
        if(typeof i18n_ja[key] !== 'undefined') {
            return i18n_ja[key];
        }
        return false;
    }

    /**
     * Get Korean Text.
     * @param {string} key
     * @return {string}
     **/
    _getKO(key) {
        if(typeof i18n_ko[key] !== 'undefined') {
            return i18n_ko[key];
        }
        return false;
    }

    /**
     * Get Russian Text.
     * @param {string} key
     * @return {string}
     **/
    _getRU(key) {
        if(typeof i18n_ru[key] !== 'undefined') {
            return i18n_ru[key];
        }
        return false;
    }

}
