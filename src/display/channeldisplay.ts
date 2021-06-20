import { Display } from './display';
import { TalkChannel } from 'node-kakao';
import { MainDisplay } from './maindisplay';
import { DisplayManager } from './displaymanager';
import { Logger } from '../utils';
import * as readline from 'readline';

export class ChannelDisplay extends Display {
	private _channel: TalkChannel;
	constructor(channel: TalkChannel){
		super('채팅방');
		this._channel = channel
	}
	init(){
		super.init();
		Logger.info('채팅방에 입장하셨습니다.');
		this.rl.on('line', (line) => {
			if(line === '/q'){
				let display = new MainDisplay();
				DisplayManager.getInstance().switch(display);
			} else {
				this.sendChat(line);
			}
		});
	}
	
	sendChat(msg: string){
		this._channel.sendChat(msg);
	}
	get channel(){
		return this._channel;
	}
}