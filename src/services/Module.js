import clone from 'clone';
import Modules from '../schemas/modules.json';

export default class ModuleService {

    static instance = null;

    static getInstance() {
        if (ModuleService.instance) {
            return ModuleService.instance;
        }
        return ModuleService.instance = new ModuleService(); 
    }

    constructor() {}

    options() {

        const options = [];

        console.log(Modules)

        for (const key in Modules) {
            const module = Modules[key];
            options.push({
                label:module.label,
                value:key
            });
        }

        return options;

    }

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
