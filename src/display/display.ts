import * as blessed from 'blessed';

export class Display {
    private _name: string;
    protected screen;
    constructor(name: string) {
        this._name = name;
    }
    get name() {
        return this._name;
    }
    init() {
        this.screen = blessed.screen({
			key: true,
            autoPadding: true,
            fullUnicode: true,
            forceUnicode: true,
        });
    }
}