"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const konsolecakao_1 = require("./konsolecakao");
const userinfo_1 = require("./userinfo");
const info = new userinfo_1.UserInfo();
console.log(info);
const kc = new konsolecakao_1.KonsoleCakao(info);
console.log(kc);
kc.login().then();
