import { KonsoleCakao } from "./konsolecakao";
import { UserInfo } from "./userinfo";

const info = new UserInfo();
const kc = new KonsoleCakao(info);
kc.login().then();