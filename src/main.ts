import { KonsoleCakao } from "./konsolecakao";
import { UserInfo } from "./userinfo";
try {
	const info = new UserInfo();
	const kc = new KonsoleCakao(info);
	kc.login().then();
} catch (e){
	console.log(e);
}