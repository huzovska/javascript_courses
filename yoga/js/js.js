class Options {
	constructor(height, width, bg, fontSize, textAlign = 'center'){
		this.height = height;
		this.width = width;
		this.bg = bg;
		this.fontSize = fontSize;
		this.textAlign = textAlign;
	}
	newDiv() {
		let div = document.createElement('div'),
			text = document.createElement('p');
		document.body.appendChild(div);
		div.appendChild(text);
		let param = `height:${this.height}px; width:${this.width}px; background-color:${this.bg}; font-size:${this.fontSize}px; text-align:${this.textAlign}`;
		div.style.cssText = param;
		text.textContent = 'option';
	}
}
let divBlock = new Options(200, 366, 'red', 100, 'left');

let btn = document.querySelector('button');
btn.addEventListener('click', () => divBlock.newDiv());