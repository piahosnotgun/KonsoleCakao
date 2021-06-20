import { Display } from './display';
import { TalkChannel } from 'node-kakao';
import { MainDisplay } from './maindisplay';
import { DisplayManager } from './displaymanager';
import { Logger, ChannelInfo } from '../utils';
import * as readline from 'readline';

export class ChannelDisplay extends Display {
	private _channel: TalkChannel;
	constructor(channel: TalkChannel){
		super('채팅방');
		this._channel = channel
	}
	init(){
		super.init();
		console.log('\x1B[2J');
		Logger.info('채팅방에 입장하셨습니다.');
		this.rl.on('line', (line) => {
			if(line === '/q'){
				console.log('\x1B[2J');
				let display = new MainDisplay();
				DisplayManager.getInstance().switch(display);
			} else {
				this.sendChat(line);
				console.log('\x1B[2A');
				Logger.logChat(ChannelInfo.getChannelName(this._channel), line, "당신");
			}
			this.rl.prompt();
		});
	}
	
	sendChat(msg: string){
		this._channel.sendChat(msg);
	}
	get channel(){
		return this._channel;
	}
}