import { KonsoleCakao } from "./konsolecakao";
import { UserInfo } from "./userinfo";
import { MainDisplay } from "./display/maindisplay";

const info = new UserInfo();
const kc = new KonsoleCakao(info);

let currentDisplay = null;

async function login(){
	let loginRes = await kc.login();
	if(loginRes === 200){ // 로그인 성공 시
		currentDisplay = new MainDisplay(kc.getTalkClient());
	}
}
login().then();
