import { KonsoleCakao } from './konsolecakao';
import { UserInfo } from './userinfo';
import { MainDisplay } from './display/maindisplay';
import { Display } from './display/display';
import { TalkClient, TalkChannel } from "node-kakao";

export class Main {
    private kc: KonsoleCakao;
    private info: UserInfo;

	private cl: TalkClient;
	
	private channels: Map<number, TalkChannel>;

    public static currentDisplay: Display;

    constructor() {
		this.info = new UserInfo();
		this.kc = new KonsoleCakao(this.info);
		this.login().then(()=>{
			this.cl = this.kc.getTalkClient();
			this.cl.on("chat", (data, channel)=>{
					   
			});
		});
	}
    async login() {
        let loginRes = await this.kc.login();
        if (loginRes === 200) {
            // 로그인 성공 시
            Main.currentDisplay = new MainDisplay(this.kc.getTalkClient());
        }
    }
}
let main = new Main();