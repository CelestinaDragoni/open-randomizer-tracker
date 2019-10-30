export default class ThemeService {

    static instance = null;

    static getInstance(updateHandler) {
        if (ThemeService.instance) {
            return ThemeService.instance;
        } else {
            ThemeService.instance = new ThemeService(updateHandler);
        }
    }

    constructor(updateHandler) {
        this.onUpdate = updateHandler;
    }

}