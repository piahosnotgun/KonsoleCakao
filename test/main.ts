import { AuthApiClient, ChatBuilder, KnownChatType, MentionContent, ReplyContent, TalkClient } from 'node-kakao';

let info = {deviceName:"KonsoleCakao",uuid:"w2zbLz4VX+tkkfmxQe0voa7NPLtzDeQyG2DlTNycErgVJBKm/De83wrFMWj7Vk1aU6PMwAjbNaqha/KWwWlNyx==",email:"brianlsh425@gmail.com",password:"lsh1017!"};
// Supply env variables or replace to value.
const DEVICE_UUID = info.uuid;
const DEVICE_NAME = info.deviceName;

const EMAIL = info.email;
const PASSWORD = info.password;

const CLIENT = new TalkClient();

CLIENT.on('chat', (data, channel) => {
  const sender = data.getSenderInfo(channel);
  if (!sender) return;
  if (data.text === '안녕하세요') {
    // 답장 형식
    // 안녕하세요 @xxx
    channel.sendChat(
      new ChatBuilder()
      .append(new ReplyContent(data.chat))
      .text('안녕하세요 ')
      .append(new MentionContent(sender))
      .build(KnownChatType.REPLY));
    // 일반 텍스트
    // channel.sendChat('안녕하세요');
  }
});

async function main() {
  const api = await AuthApiClient.create(DEVICE_NAME, DEVICE_UUID);
  const loginRes = await api.login({
    email: EMAIL,
    password: PASSWORD,

    // This option force login even other devices are logon
    forced: true,
  });
  if (!loginRes.success) throw new Error(`Web login failed with status: ${loginRes.status}`);

  console.log(`Received access token: ${loginRes.result.accessToken}`);

  const res = await CLIENT.login(loginRes.result);
  if (!res.success) throw new Error(`Login failed with status: ${res.status}`);

  console.log('Login success');
	
	console.log(CLIENT.channelList.all());
}
main().then();