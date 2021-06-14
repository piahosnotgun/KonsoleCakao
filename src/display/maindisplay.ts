import { Display } from './display';
import * as blessed from 'blessed';

export class MainDisplay extends Display{
	constructor(){
		super("홈");
	}
	init(){
		super.init();
		let box = blessed.box({
			top: 3,
            width: '100%',
            height: 3,
            content: '테스트',
            tags: true,
            border: {
                type: 'line',
            },
            style: {
                border: {
                    fg: 'yellow',
                },
            },
        });
		this.screen.append(box);
		this.screen.render();
	}
}