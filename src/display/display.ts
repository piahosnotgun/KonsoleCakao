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
            autoPadding: true,
            fullUnicode: true,
            forceUnicode: true,
        });
        let box = blessed.box({
            width: '100%',
            height: 3,
            content: 'KonsoleCakao / ' + this.name,
            tags: true,
            border: {
                type: 'line',
            },
            style: {
                border: {
                    fg: 'yellow',
                },
            },
        });
		this.screen.append(box);
    }
}