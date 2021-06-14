import * as blessed from 'blessed';

let screen = blessed.screen({
	autoPadding: true
});
var box = blessed.box({
  top: 'center',
  left: 'center',
  width: '50%',
  height: '50%',
  content: 'Hello {bold}world{/bold}!',
  tags: true,
  border: {
    type: 'line'
  },
  style: {
    fg: 'white',
    bg: 'magenta',
    border: {
      fg: '#f0f0f0'
    }
  }
});
screen.append(box);
screen.render();
let screen2 = blessed.screen({
	autoPadding:true
})
screen2.render();