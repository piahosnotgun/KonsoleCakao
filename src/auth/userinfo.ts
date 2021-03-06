import { util } from 'node-kakao';
import * as fs from 'fs';
import { Logger } from '../utils';

export class UserInfo {
    uuid: string;
    deviceName: string;
    email: string;
    password: string;
    // 유저 정보가 있는 파일 읽어옴. 파일에 빈 항목이 있을 경우 에러 리턴 후 종료.
    constructor() {
        let fileName = './deviceInfo.json';
        let data = {
            email: '',
            password: '',
            deviceName: '',
            uuid: '',
        };
        if (fs.existsSync(fileName)) {
            let file = fs.readFileSync(fileName, 'utf-8');
            data = JSON.parse(file);
        } else {
			fs.writeFileSync(fileName, JSON.stringify(data));
        }
        if (data.deviceName === '' || data.password === '' || data.email === '') {
            throw new Error('유저 정보가 정확하지 않습니다');
        }
        if (typeof data.uuid === undefined || data.uuid === '') {
            // 유저 정보는 입력되었으나, uuid가 생성되지 않은 경우.
            this.uuid = util.randomWin32DeviceUUID();
        } else {
            this.uuid = data.uuid;
        }
        //init userinfo
        this.deviceName = data.deviceName;
        this.email = data.email;
        this.password = data.password;
        this.save();
    }
    save() {
        let data = JSON.stringify({
            deviceName: this.deviceName,
            uuid: this.uuid,
            email: this.email,
            password: this.password,
        });
        fs.writeFile('./deviceInfo.json', data, 'utf-8', () => {
            Logger.info('디바이스 정보가 저장되었습니다.');
        });
    }
}