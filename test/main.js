"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var node_kakao_1 = require("node-kakao");
// Supply env variables or replace to value.
var DEVICE_UUID = "asdf";
var DEVICE_NAME = "asdf";
var EMAIL = "luciape@naver.com";
var PASSWORD = "12345679";
var CLIENT = new node_kakao_1.TalkClient();
CLIENT.on('chat', function (data, channel) {
    var sender = data.getSenderInfo(channel);
    if (!sender)
        return;
    if (data.text === '안녕하세요') {
        // 답장 형식
        // 안녕하세요 @xxx
        channel.sendChat(new node_kakao_1.ChatBuilder()
            .append(new node_kakao_1.ReplyContent(data.chat))
            .text('안녕하세요 ')
            .append(new node_kakao_1.MentionContent(sender))
            .build(node_kakao_1.KnownChatType.REPLY));
        // 일반 텍스트
        // channel.sendChat('안녕하세요');
    }
});
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var api, loginRes, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, node_kakao_1.AuthApiClient.create(DEVICE_NAME, DEVICE_UUID)];
                case 1:
                    api = _a.sent();
                    return [4 /*yield*/, api.login({
                            email: EMAIL,
                            password: PASSWORD,
                            // This option force login even other devices are logon
                            forced: true
                        })];
                case 2:
                    loginRes = _a.sent();
                    if (!loginRes.success)
                        throw new Error("Web login failed with status: " + loginRes.status);
                    console.log("Received access token: " + loginRes.result.accessToken);
                    return [4 /*yield*/, CLIENT.login(loginRes.result)];
                case 3:
                    res = _a.sent();
                    if (!res.success)
                        throw new Error("Login failed with status: " + res.status);
                    console.log('Login success');
                    return [2 /*return*/];
            }
        });
    });
}
main().then();
