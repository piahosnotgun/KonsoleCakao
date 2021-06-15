import { Display } from './display';
import { KonsoleCakao } from '../';
import { ChannelInfo } from '../utils';
import * as blessed from 'blessed';

export class MainDisplay extends Display {
    constructor() {
        super('홈');
    }
    init() {
        super.init();
        let container = blessed.box({
            parent: this.screen,
            top: 1,
            width: '100%',
            height: '90%',
            padding: {
                top: 1,
            },
            content: 'KonsoleCakao / ' + this.name,
            border: {
                type: 'line',
            },
            style: {
                border: {
                    fg: 'yellow',
                },
            },
        });
        let boxes = [];
        let focusedIndex = 0;
        let i = 0;
        let list = this.getChatList();
        for (let channelId in list) {
            let channel = list[channelId];
            let chatbox = blessed.button({
                parent: container,
                mouse: true,
                keys: true,
                width: 30,
                height: 3,
                top: i * 3 + 1,
                name: channelId,
                content: ChannelInfo.getChannelName(channel),
                tags: true,
                border: {
                    type: 'line',
                },
                style: {
                    focus: {
                        bg: 'yellow',
                    },
                    border: {
                        fg: 'yellow',
                    },
                },
            });
            boxes.push(chatbox);
            container.append(chatbox);
            chatbox.on('press', () => {
                container.setContent(chatbox.getContent() + ' 클릭됨');
            });
            i++;
        }
        boxes[focusedIndex].focus();
        this.screen.key('up', () => {
            if (focusedIndex === 0) return;
            boxes[--focusedIndex].focus();
        });
        this.screen.key('down', () => {
            if (focusedIndex + 1 >= boxes.length) {
                return;
            }
            boxes[++focusedIndex].focus();
        });
        this.screen.key('enter', () => {
            boxes[focusedIndex].press();
        });
        this.screen.render();
    }
    getChatList() {
        // channelId => chatList
        let client = KonsoleCakao.talkClient;
        let channelList = client.channelList;
        let it = channelList.all();
        let result = it.next();
        let ret = {};
        while (!result.done) {
            let channel = result.value;
            let channelId = channel.channelId.toString();
            let channelName = ChannelInfo.getChannelName(channel);
            ret[channelId] = channel;
            result = it.next();
        }
        console.log(ret);
        return ret;
    }
}