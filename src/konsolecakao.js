"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KonsoleCakao = void 0;
const node_kakao_1 = require("node-kakao");
const readline = require("readline");
class KonsoleCakao {
    constructor(userInfo) {
        this.userInfo = userInfo;
        this.client = new node_kakao_1.TalkClient();
    }
    async login() {
        console.log("로그인 중..");
        const api = await node_kakao_1.AuthApiClient.create(this.userInfo.deviceName, this.userInfo.uuid);
        const loginRes = await api.login({
            email: this.userInfo.email,
            password: this.userInfo.password,
            forced: true,
        });
        if (!loginRes.success) {
            return loginRes.status;
            // 디바이스가 등록되지 않은 경우
            if (loginRes.status === node_kakao_1.KnownAuthStatusCode.DEVICE_NOT_REGISTERED) {
                console.log('디바이스가 등록되지 않았습니다. 카카오톡에서 디바이스 인증번호를 확인한 후 입력해주세요.');
                let registerRes = await this.register(api);
                if (registerRes !== 200) {
                    throw new Error("디바이스 등록에 실패했습니다.");
                }
            }
        }
        console.log(`액세스 토큰을 받았습니다: ${loginRes.result.accessToken}`);
        const res = await this.client.login(loginRes.result);
        if (!res.success)
            return res.status;
        // 성공
        return 200;
    }
    async register(api) {
        const form = {
            email: this.userInfo.email,
            password: this.userInfo.password,
            forced: true,
        };
        const passcodeRes = await api.requestPasscode(form);
        if (!passcodeRes.success)
            throw new Error(`Passcode request failed with status: ${passcodeRes.status}`);
        const inputInterface = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        const passcode = await new Promise((resolve) => inputInterface.question('인증번호: ', resolve));
        inputInterface.close();
        const registerRes = await api.registerDevice(form, passcode, true);
        if (!registerRes.success)
            return registerRes.status;
        return 200;
    }
}
exports.KonsoleCakao = KonsoleCakao;
