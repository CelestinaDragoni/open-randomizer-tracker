import {remote, shell} from 'electron';
import clone from 'clone';
import store from 'electron-store';

export default class ElectronController {

    /** Root View Controller **/
    controller = null;

    /** Electron Store Object **/
    store = null;

    /** Timeout Reference for Window Resize **/
    windowResizeTimeout = null;

    /** If we're currently running electron **/
    isElectron = true;

    /**
     * Starts binding actions for electron.
     * @param {RootViewController} controller
     * @return {void}
     **/
    init(controller) {
        
        this.controller = controller;
        this.store = new store();

        window.addEventListener('keyup', this.onToggleBroadcast);
        remote.getCurrentWindow().on('resize', this.onWindowChange);
        remote.getCurrentWindow().on('move', this.onWindowChange);
    
    }

    /**
     * Used in services/Config, gets the configuration from file if it exists.
     * @return {mixed}
     **/
    getConfig() {
        return this.store.get('config');
    }

    /**
     * Saves the configuration to the store.
     * @param {object} config - Configuration dictionary
     * @return {void}
     **/
    setConfig(config) {
        this.store.set('config', config);
    }

    /**
     * Sets the last window bounds on startup.
     * @return {void}
     **/
    setWindowBounds() {
        remote.getCurrentWindow().setBounds(this.controller.services.config.bounds);
    }

    /**
     * Event: Handles window resize and puts it into the store. Uses a timeout for performance reasons.
     * @return {void}
     **/
    onWindowChange = () => {
        clearTimeout(this.windowResizeTimeout);
        this.windowResizeTimeout = setTimeout(this.onWindowChangeTimeout, 500);
    }

    /**
     * Timeout Function: Writes the bounds to the configuration.
     * @return {void}
     **/
    onWindowChangeTimeout = () => {
        if (!this.controller.services.config.broadcast) {
            this.controller.services.config.bounds = clone(remote.getCurrentWindow().getBounds());
        }
    }

    /**
     * Used on startup and in services/Config, toggles the always on top dialog state.
     * @return {void}
     **/
    onAlwaysOnTop = () => {
        remote.getCurrentWindow().setAlwaysOnTop(this.controller.services.config.alwaysOnTop);
    }

    /**
     * Used to handle external URLs in electron.
     * @param {Event} e
     * @return {void}
     **/
    onExternalLink(e) {
        e.preventDefault();
        shell.openExternal(e.target.href);
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

            // Scale Window In Broadcast
            if (this.controller.services.config.broadcast) {

                const bounds = clone(remote.getCurrentWindow().getBounds());
                const moduleElement = document.querySelector('.ort-module-wrapper');

                // Save Bounds for Later
                this.controller.services.config.bounds = clone(bounds);

                // Modify Bounds for Broadcast
                const rect = moduleElement.getBoundingClientRect();
    
                bounds.height = parseInt(rect.height, 10)+50;
                bounds.width = parseInt(rect.width, 10)+50;

                // Set Electron Bounds
                remote.getCurrentWindow().setBounds(bounds);

            // Restore Window Outside Broadcast
            } else {

                // Set Electron Bounds
                const bounds = this.controller.services.config.bounds;
                remote.getCurrentWindow().setBounds(bounds);

            }
        }
        
    }
}
