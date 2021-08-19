class ColorCreator {

	#document;
	#colorList;
	#colorForm;
	#loading;
	#secondsToWaitOnLoading;
	#reloadButton;
	#colorButtonArea;
	#colorChangeIncrement;

	constructor(document) {
		this.#document = document;
		this.#colorList = this.#document.getElementById("colorList");
		this.#colorForm = this.#document.getElementById("color-form");
		this.#loading = this.#document.getElementById("loading");
		this.#secondsToWaitOnLoading = 1;
		this.#reloadButton = this.#document.getElementById("btn-reload");
		this.#colorButtonArea = this.#document.querySelector(".colorButtonArea");
		this.#colorChangeIncrement = 10;
	}

	load() {
		setTimeout(() => {
			this.#loading.style.display = "none";
			for (let i = 0; i < 50; i++) {
				this.addColorItem(this.generateRandomColor());
			}
			this.#colorForm.style.display = 'block';
		}, this.#secondsToWaitOnLoading * 1000);
	}

	setSecondsToWaitOnLoading(sec) {
		this.#secondsToWaitOnLoading = sec;
	}

	decToHex(number) {
		return number.toString(16).padStart(2, "0")
	}

	getRandomNumber(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max + 1));
	}

	generateRandomColor() {
		let hexCode = '#';
		for (let i = 0; i < 3; i++) {
			hexCode += this.decToHex(this.getRandomNumber(0, 255));
		}
		return hexCode.trim();
	}

	addColorItem(color) {
		const newItem = this.#document.createElement("LI");
		newItem.classList.add("color");
		newItem.style.backgroundColor = color;
		newItem.innerHTML = `
			${color}
			<span class="deleteIcon"><i class="fa fa-trash"></i></span>
		`;
		this.#colorList.appendChild(newItem);
	}

	addEventListener_handleColorForm() {
		this.#colorForm.addEventListener("submit", (e) => {
			e.preventDefault();
			const amountOfColors = Number(this.#document.getElementById("color-amount").value);
			for (let i = 0; i < amountOfColors; i++) {
				this.addColorItem(this.generateRandomColor());
			}
		});
	}

	addEventListener_removeColorBox() {
		this.#colorList.addEventListener("click", (e) => {
			const isDeleteButton = e.target.closest(".deleteIcon");
			if (isDeleteButton !== null) {
				const item = e.target.closest("li");
				this.#colorList.removeChild(item);
			}
		});
	}

	addEventListener_reloadButton() {
		this.#reloadButton.onclick = () => {
			// Array.from(this.#colorList.children).forEach((colorElem) => {
			[...this.#colorList.children].forEach((colorElem) => {
				colorElem.style.backgroundColor = this.generateRandomColor();
			})
		}
	}

	getColorDecimalArray(color) {
		// e.g. "#3fd7c3"
		const hexColors = {
			red: color.substring(1,3),
			green: color.substring(3,5),
			blue: color.substring(5,7)
		}
		return {
			red: parseInt(hexColors.red, 16),
			green: parseInt(hexColors.green, 16),
			blue: parseInt(hexColors.blue, 16)
		}
	}

	getColorFromDecimalColors(dc) {
		return `#${this.decToHex(dc.red)}${this.decToHex(dc.green)}${this.decToHex(dc.blue)}`;
	}

	addEventListener_colorButtons() {
		this.#colorButtonArea.onclick = (e) => {
			const clickedElem = e.target;
			const clickedElemId = clickedElem.id === '' ? clickedElem.parentNode.id : clickedElem.id;
			// Array.from(this.#colorList.children).forEach((colorElem, index) => {
			[...this.#colorList.children].forEach((colorElem, index) => {
				const color = colorElem.innerText; // e.g. "#3fd7c3"
				const colorDecimalArray = this.getColorDecimalArray(color);
				switch (clickedElemId) {
					case 'btn-redMinus':
						colorDecimalArray.red -= this.#colorChangeIncrement;
						colorDecimalArray.red = colorDecimalArray.red < 0 ? 0 : colorDecimalArray.red;
						break;
					case 'btn-redPlus':
						colorDecimalArray.red += this.#colorChangeIncrement;
						colorDecimalArray.red = colorDecimalArray.red > 255 ? 255 : colorDecimalArray.red;
						break;
					case 'btn-greenMinus':
						colorDecimalArray.green -= this.#colorChangeIncrement;
						colorDecimalArray.green = colorDecimalArray.green < 0 ? 0 : colorDecimalArray.green;
						break;
					case 'btn-greenPlus':
						colorDecimalArray.green += this.#colorChangeIncrement;
						colorDecimalArray.green = colorDecimalArray.green > 255 ? 255 : colorDecimalArray.green;
						break;
					case 'btn-blueMinus':
						colorDecimalArray.blue -= this.#colorChangeIncrement;
						colorDecimalArray.blue = colorDecimalArray.blue < 0 ? 0 : colorDecimalArray.blue;
						break;
					case 'btn-bluePlus':
						colorDecimalArray.blue += this.#colorChangeIncrement;
						colorDecimalArray.blue = colorDecimalArray.blue > 255 ? 255 : colorDecimalArray.blue;
						break;
					default:
						console.log('bad entry');
				}
				const newColor = this.getColorFromDecimalColors(colorDecimalArray);
				this.#colorList.children[index].style.backgroundColor = newColor;
				this.#colorList.children[index].innerHTML = newColor;
			})
		}
	}
}

// Red- Red+ Green- Green+ Blue- Blue+
// https://hashtagcolor.com/45efc8

const cc = new ColorCreator(document);
cc.addEventListener_handleColorForm();
cc.addEventListener_removeColorBox();
cc.setSecondsToWaitOnLoading(0);
cc.addEventListener_reloadButton();
cc.addEventListener_colorButtons();
cc.load();