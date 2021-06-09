import { Display } from "./display";
import { TalkClient } from "node-kakao";

export class MainDisplay extends Display {
	constructor(client: TalkClient){
		super("MainDisplay", client);
	}
	public onLine(line: string){
		switch(line){
		}
	}
	public getDisplayText(){
		let list = this.client.channelList.all(); //ChainedIterator<TalkChannel>
		console.log(list);
		return "asdf";
	}
}