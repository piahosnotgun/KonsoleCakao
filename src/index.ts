import { Logger } from './utils';
import { UserInfo, AuthManager } from './auth';
import { DisplayManager, MainDisplay } from './display';
import { TalkClient } from 'node-kakao';

export class KonsoleCakao {
	static talkClient: TalkClient;
	private userInfo: UserInfo;
	private authManager: AuthManager;
	
	private displayManager: DisplayManager;
	
	constructor(){
		this.displayManager = new DisplayManager(this);
		this.userInfo = new UserInfo();
		this.authManager = new AuthManager(this.userInfo);
		
		this.authManager.login().then(()=>{
			KonsoleCakao.talkClient = this.authManager.getTalkClient();
			this.initMain();
		});
	}
	initMain(){
		let main = new MainDisplay();
		this.displayManager.switch(main);
	}
}

new KonsoleCakao();