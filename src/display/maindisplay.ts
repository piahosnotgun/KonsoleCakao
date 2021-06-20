import { Display, ChannelDisplay, DisplayManager } from './';
import { KonsoleCakao } from '../';
import { ChannelInfo, Logger } from '../utils';

export class MainDisplay extends Display {
    constructor() {
        super('홈');
    }
    init() {
        super.init();
		let channelList = this.getChannelList();
		let msg = '접속할 채팅방을 선택해주세요. (번호 입력)\n';
		let i = 0;
		let indexedList = [];
		for(let channelId in channelList){
			let channel = channelList[channelId];
            let channelName = ChannelInfo.getChannelName(channel);
			msg += "[" + (i++) +"] " + channelName + "\n";
			indexedList.push(channel);
		}
		this.rl.on('line', (line) => {
			try {
				let num = Number(line);
				if(typeof indexedList[num] === 'undefined'){
					Logger.notice('채팅방이 존재하지 않습니다. 올바른 번호를 입력해주세요.');
					return;
				}
				let channel = indexedList[num];
				let channelDisplay = new ChannelDisplay(channel);
				DisplayManager.switch(channelDisplay);
			} catch(e){
				Logger.notice('올바른 숫자를 입력해주세요.');
				return;
			}
		});
    }
    getChannelList() {
        // channelId => chatList
        let client = KonsoleCakao.talkClient;
        let channelList = client.channelList;
        let it = channelList.all();
        let result = it.next();
        let ret = {};
        while (!result.done) {
            let channel = result.value;
            let channelId = channel.channelId.toString();
            ret[channelId] = channel;
            result = it.next();
        }
        return ret;
    }
}