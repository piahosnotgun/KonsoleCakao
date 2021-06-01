"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInfo = void 0;
const node_kakao_1 = require("node-kakao");
const fs = require("fs");
class UserInfo {
    // 유저 정보가 있는 파일 읽어옴. 파일에 빈 항목이 있을 경우 에러 리턴 후 종료. 
    // TODO: 위 파일에 없는 내용은 readline으로 정보 읽어옴
    construct() {
        let fileName = "../deviceInfo.json";
        let file = fs.readFileSync(fileName, "utf-8");
        let data = JSON.parse(file);
        if (data.deviceName === "" || data.password === "" || data.email === "") {
            throw new Error("유저 정보가 정확하지 않습니다. deviceInfo.json의 정보를 수정해주세요.");
        }
        if (data.uuid === "") { // 유저 정보는 입력되었으나, uuid가 생성되지 않은 경우.
            this.uuid = node_kakao_1.util.randomWin32DeviceUUID();
        }
        //init userinfo
        this.deviceName = data.deviceName;
        this.email = data.email;
        this.password = data.password;
    }
    save() {
        //TODO: 유저 정보 세이브
    }
}
exports.UserInfo = UserInfo;
