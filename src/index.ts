import { KonsoleCakao } from './konsolecakao';
import { UserInfo } from './userinfo';
import { TalkClient, TalkChannel } from 'node-kakao';
import * as readline from 'readline';
import { Long } from 'bson';
import { Logger } from './logger';

export class Main {
    private kc: KonsoleCakao;
    private info: UserInfo;

    private cl: TalkClient;

    private channels: any;

    private currentChannel: TalkChannel;

    constructor() {
		this.channels = {};
        this.info = new UserInfo();
        this.kc = new KonsoleCakao(this.info);
        this.login();
        let rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
			
        });
        rl.setPrompt('>');
        rl.prompt();
        rl.on('line', (line) => {
            this.handleLine(line);
			rl.prompt();
        });
    }
    handleLine(line: string) {
        let exp = line.split(' ');
        let cmd = exp[0];
        if (typeof cmd.split('/')[1] !== 'undefined') {
            //command
            exp.shift();
            this.handleCommand(cmd, exp);
            return;
        }
        if (typeof this.currentChannel === 'undefined') {
            Logger.notice(
                "'/채널전환' 명령어로 채널에 먼저 접속해주세요. '/채널목록' 으로 채팅 가능한 채널 목록 확인이 가능합니다."
            );
            return;
        }
        this.currentChannel.sendChat(line);
    }
    handleCommand(cmd: string, args: string[]) {
        if (cmd === '/채널목록') {
            let msg = '채팅 가능한 채널 목록: ';
			for(let key in this.channels){
				let value = this.channels[key];
                msg += key + ', ';
			}
            Logger.info(msg);
            return;
        }
        if (cmd === '/채널전환') {
            if (typeof args[0] === 'undefined') {
                Logger.info('사용법: /채널전환 <채널id>');
                return;
            }
            let channelId = Long.fromString(args[0]);
			let key = channelId.toString();
            if (typeof this.channels[key] !== "undefined") {
                this.currentChannel = this.channels[key];
                Logger.notice('채널이 전환되었습니다: ' + key);
            } else Logger.notice('존재하지 않는 채널입니다. 채널id를 확인하신 후 다시 시도해주세요.');
            return;
        }
    }
    async login() {
        let loginRes = await this.kc.login();
        this.cl = this.kc.getTalkClient();
        this.cl.on('chat', (data, channel) => {
            let channelId = channel.channelId;
			let key = channelId.toString();
            if (typeof this.channels[key] === "undefined") {
				this.channels[key] = channel;
                Logger.notice('채널이 추가되었습니다: ' + key);
            }
            let sender = data.getSenderInfo(channel);
            let name = sender.nickname;
			let channelName = channel.getName();
			if(! channelName){
				channelName = name;
			}
			Logger.logChat(channelName, data.text, name, channelId);
        });
    }
}
let main = new Main();