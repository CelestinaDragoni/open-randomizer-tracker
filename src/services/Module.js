import Modules from '../schemas/modules.json';

export default class ModuleService {

    /** Singleton Instance **/
    static instance = null;

    /**
     * Singleton constructor
     * @return {ModuleService}
     **/
    static getInstance() {
        if (ModuleService.instance) {
            return ModuleService.instance;
        }
        return ModuleService.instance = new ModuleService(); 
    }

    /**
     * Get module options from configuration file.
     * @return {array}
     **/
    options() {

        const options = [];

        for (const key in Modules) {
            const module = Modules[key];
            options.push({
                label:module.label,
                value:key
            });
        }

        return options;

    }

    /**
     * Get module layout options from module key and configuration file.
     * @param {string} moduleKey
     * @return {array}
     **/
    layoutOptions(moduleKey) {

        const options = [];

        if (Modules[moduleKey]) {
            for (const key in Modules[moduleKey].layouts) {
                const layout = Modules[moduleKey].layouts[key];
                options.push({
                    label:layout,
                    value:key
                });
            }
        }

        return options;

    }

}
