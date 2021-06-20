import { TalkChannel } from 'node-kakao';

export class ChannelInfo {
	static getChannelName(channel: TalkChannel): string{
		let channelName = channel.getDisplayName();
		let userList = channel.getAllUserInfo();
		if(! channelName){
   			let list = [];
    		for (let user of userList) {
      			list.push(user.nickname);
    			channelName = list.join(', ');
  			}
		}
		return channelName;
	}
}