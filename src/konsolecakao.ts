import { AuthApiClient, ChatBuilder, KnownChatType, MentionContent, ReplyContent, TalkClient, KnownAuthStatusCode } from 'node-kakao';
import { UserInfo } from "./userinfo";
import * as readline from "readline";
import { Logger } from "./logger";

export class KonsoleCakao {
	client: TalkClient;
	userInfo: UserInfo;
	constructor(userInfo: UserInfo){
		this.userInfo = userInfo;
	}
	public getTalkClient(): TalkClient {
		return this.client;
	}
	
	public async login() {
		Logger.notice("로그인 중..");
		const api = await AuthApiClient.create(this.userInfo.deviceName, this.userInfo.uuid);
		let loginRes = await api.login({
    		email: this.userInfo.email,
    		password: this.userInfo.password,
    		forced: true,
  		});
  		if (!loginRes.success) {
			// 디바이스가 등록되지 않은 경우
			if(loginRes.status === KnownAuthStatusCode.DEVICE_NOT_REGISTERED){
				Logger.notice('디바이스가 등록되지 않았습니다. 카카오톡에서 디바이스 인증번호를 확인한 후 입력해주세요.')
				let registerRes = await this.register(api);
				if(registerRes !== 200){
					throw new Error("디바이스 등록에 실패했습니다.");
				}
			}
			loginRes = await api.login({
    			email: this.userInfo.email,
    			password: this.userInfo.password,
    			forced: true,
  			});
			if(!loginRes.success){
				//TODO: 로그인 실패 이유 구별.
				throw new Error("로그인에 실패했습니다.");
			}
		}
  		Logger.notice(`액세스 토큰을 받았습니다: ${loginRes.result.accessToken}`);
		this.client = new TalkClient();
  		const res = await this.client.login(loginRes.result);
  		if (!res.success) 
			return res.status;
		// 성공
		Logger.success("로그인 성공");
  		return 200;
	}
	
	public async register(api: AuthApiClient){
		const form = {
    		email: this.userInfo.email,
    		password: this.userInfo.password,
    		forced: true,
  		};
  		const passcodeRes = await api.requestPasscode(form);
  		if (!passcodeRes.success) throw new Error(`인증번호 요청에 실패했습니다. 에러 코드: ${passcodeRes.status}`);
  		const inputInterface = readline.createInterface({
    		input: process.stdin,
    		output: process.stdout,
		});
  		const passcode = await new Promise<string>((resolve) => inputInterface.question('인증번호: ', resolve));
  		inputInterface.close();
  		const registerRes = await api.registerDevice(form, passcode, true);
  		if (!registerRes.success) return registerRes.status;
  		return 200;
	}
}