import clone from 'clone';

export default class ModuleService {

    static instance = null;

    static getInstance() {
        if (ModuleService.instance) {
            return ModuleService.instance;
        }
        return ModuleService.instance = new ModuleService(); 
    }

    constructor() {}

    

}
