import * as blessed from 'blessed';
import { KonsoleCakao } from '../';
import { Display } from './display';

export class DisplayManager {
	static current: Display;
	private kc: KonsoleCakao;
	constructor(kc: KonsoleCakao){
		this.kc = kc;
	}
	switch(display: Display){
		DisplayManager.current = display;
		DisplayManager.current.init();
	}
}