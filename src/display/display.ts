import { KonsoleCakao } from '../';

export class Display {
    private _name: string;
	protected rl;
    constructor(name: string) {
        this._name = name;
		this.rl = KonsoleCakao.rl;
    }
    get name() {
        return this._name;
    }
    init() {
		this.rl.removeAllListeners('line');
    }
}