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
	public getDisplayText(): string{
		return "";
	}
}