export default class WebController {

    /** Root View Controller **/
    controller = null;

    /** If we're currently running electron **/
    isElectron = false;

    /**
     * Starts binding actions for electron.
     * @param {RootViewController} controller
     * @return {void}
     **/
    init(controller) {
        this.controller = controller;
        window.addEventListener('keyup', this.onToggleBroadcast);
        window._link = this.onExternalLink;
    }

    /**
     * Used in services/Config, gets the configuration from file if it exists.
     * @return {mixed}
     **/
    getConfig() {
        const config = JSON.parse(localStorage.getItem('config'));
        return config !== null ? config : false;
    }

    /**
     * Saves the configuration to the store.
     * @param {object} config - Configuration dictionary
     * @return {void}
     **/
    setConfig(config) {
        localStorage.setItem('config', JSON.stringify(config));
    }

    /**
     * Opens external links.
     * @param {Event} e
     * @return {bool}
     **/
    onExternalLink(e) {
        return true;
    }

    /**
     * Handles global toggling of the broadcast keys, but it also closes modals, should prob. be renamed.
     * @param {Event} e
     * @return {void}
     **/
    onToggleBroadcast = (e) => {
        if(e.key === "Escape") {

            // Close Modals on ESC
            if (this.controller.services.config.modalHelp) {
                this.controller.services.config.modalHelp = false;
                return;
            }

            this.controller.services.config.broadcast = !this.controller.services.config.broadcast;
        }
    }

}
