import { Display } from "display/display";
import * as readline from "readline";
import { TalkClient } from "node-kakao";

export class ConsoleInterface {
	public static currentDisplay: Display;
	private rl; 
	constructor(client: TalkClient){
		this.rl = readline.createInterface({
  			input: process.stdin,
  			output: process.stdout
		});
		this.rl.setPrompt("> ");
		this.rl.prompt();
		this.rl.on("line", (line)=>{
			// 메뉴 선택 또는 채팅.
		});
	}
}