import { TalkClient } from "node-kakao";

export abstract class Display {
	private _name: string;
	protected client: TalkClient;
	constructor(name: string, client: TalkClient){
		this._name = name;
		this.client = client;
	}
	get name(): string{
		return this._name;
	}
	public abstract onLine(line: string);
	public abstract getDisplayText(): string;
}