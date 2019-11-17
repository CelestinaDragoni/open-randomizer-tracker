export default class WebController {

    /** Root View Controller **/
    controller = null;

    /** If we're currently running electron **/
    isElectron = false;

    /**
     * Starts binding actions for electron.
     * @param {RootViewController} 
     * @return {void}
     **/
    init(controller) {
        this.controller = controller;
        window.addEventListener('keyup', this.onToggleBroadcast);
    }

    /**
     * Used in services/Config, gets the configuration from file if it exists.
     * @return {mixed}
     **/
    getConfig() {
        return false;
    }

    /**
     * Saves the configuration to the store.
     * @param {object} Configuration dictionary
     * @return {void}
     **/
    setConfig(config) {
        // Do nothing
    }

    /**
     * Opens external links.
     * @return {void}
     **/
    onExternalLink(e) {
        return true;
    }

    /**
     * Handles global toggling of the broadcast keys, but it also closes modals, should prob. be renamed.
     * @param {Event}
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
