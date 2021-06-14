import * as chalk from "chalk";
import { Long } from "bson";
export class Logger {
	static logChat(channelName: string, chat: string, sender: string, channelId: Long){
		Logger.log("[" + chalk.yellow(channelName) + "] " + sender + "(" + channelId.toString() + "): " + chat);
	}
	static info(line: string){
		Logger.log(chalk.cyan("[정보] ") + line);
	}
	static warning(line: string){
		Logger.log(chalk.red("[경고] " + line));
	}
	static notice(line: string){
		Logger.log(chalk.yellow("[알림] " + line));
	}
	static success(line: string){
		Logger.log(chalk.green("[알림] " + line));
	}
	static log(line: string){
		let time = Logger.getTime();
		console.log(chalk.cyan("[" + this.getTime() + "]") + line);
	}
	static getTime(): string{
		let date = new Date();
		let dateStr = date.getFullYear() + "-" + date.getMonth()+ "-" + date.getDay() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
		return dateStr;
	}
}