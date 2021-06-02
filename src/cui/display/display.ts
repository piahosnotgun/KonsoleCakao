import { TalkClient } from "node-kakao";
import { Menu } from "menu/menu";

export class Display {
	private tc: TalkClient;
	private menus: Menu[];
	constructor(tc: TalkClient){
		this.tc = tc;
	}
	public addMenu(menu: Menu){
		this.menus.push(menu);
	}
	public showMenus(){
		for(let num in this.menus){
			let menu = this.menus[num];
			if(typeof menu === undefined)
				continue;
			console.log(num + ". " + menu.getText());
		}
	}
	public select(num: int){
		if(num >= this.menus.length || num < 0){
			console.log("잘못된 숫자입니다. 다시 입력해주세요.");
		}
		let menu = this.menus[num];
		if(typeof menu === "undefined"){
			return;
		}
		menu.onSelect();
	}
}