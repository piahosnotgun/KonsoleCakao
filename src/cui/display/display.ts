import { TalkClient } from "node-kakao";

export class Display {
	private tc: TalkClient;
	// menuName => callback
	private menus = {};
	constructor(tc: TalkClient){
		this.tc = tc;
	}
	
}