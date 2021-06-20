import { Logger, ChannelInfo } from './utils';
import { UserInfo, AuthManager } from './auth';
import { DisplayManager, MainDisplay, ChannelDisplay } from './display';
import { TalkClient } from 'node-kakao';
import * as readline from 'readline';

export class KonsoleCakao {
    static talkClient: TalkClient;
    private userInfo: UserInfo;
    private authManager: AuthManager;

    private displayManager: DisplayManager;
	
	static rl = null;

    constructor() {
        this.displayManager = new DisplayManager(this);
        this.userInfo = new UserInfo();
        this.authManager = new AuthManager(this.userInfo);
		KonsoleCakao.rl = readline.createInterface({
    		input: process.stdin,
    		output: process.stdout,
		});

        this.authManager.login().then(() => {
			KonsoleCakao.talkClient = this.authManager.getTalkClient();
            this.initMain();
            KonsoleCakao.talkClient.on('chat', (data, channel) => {
                let chat = data.text;
                let sender = data.getSenderInfo(channel);
                if (typeof DisplayManager.current.channel.channelId === 'undefined') return;
                if (DisplayManager.current.channel.channelId === channel.channelId) {
                    Logger.logChat(ChannelInfo.getChannelName(channel), chat, sender.nickname);
                }
            });
        });
    }
    initMain() {
        let main = new MainDisplay();
        this.displayManager.switch(main);
    }
}

new KonsoleCakao();