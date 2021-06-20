import { KonsoleCakao } from '../';
import { Display } from './display';

export class DisplayManager {
	static current;
	private kc: KonsoleCakao;
	private static instance;
	constructor(kc: KonsoleCakao){
		this.kc = kc;
		DisplayManager.instance = this;
	}
	switch(display){
		DisplayManager.current = display;
		DisplayManager.current.init();
	}
	static getInstance(){
		return DisplayManager.instance;
	}
}