class ColorCreator {

	#document;
	#colorList;
	#colorForm;
	#loading;
	#secondsToWaitOnLoading;

	constructor(document) {
		this.#document = document;
		this.#colorList = this.#document.getElementById("colors");
		this.#colorForm = this.#document.getElementById("color-form");
		this.#loading = this.#document.getElementById("loading");
	}

	load() {
		setTimeout(() => {
			this.#loading.style.display = "none";
			for (let i = 0; i < 3; i++) {
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
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	generateRandomColor() {
		let hexCode = '#';
		for (let i = 0; i < 3; i++) {
			hexCode += this.decToHex(this.getRandomNumber(0, 255));
		}
		return hexCode.trim();
	}

	addColorItem(color) {
		const newItem = this.#document.createElement("li");
		newItem.classList.add("color");
		newItem.style.backgroundColor = color;
		newItem.innerHTML = `
			${color}
			<span class="deleteIcon"><i class="fa fa-trash" aria-hidden="true"></i></span>
		`;
		this.#colorList.appendChild(newItem);
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

	addEventListener_handleColorForm() {
		this.#colorForm.addEventListener("submit", (e) => {
			e.preventDefault();
			const amountOfColors = Number(this.#document.getElementById("color-amount").value);
			for (let i = 0; i < amountOfColors; i++) {
				this.addColorItem(
					this.generateRandomColor()
				);
			}
		});
	}
}

const cc = new ColorCreator(document);
cc.addEventListener_removeColorBox();
cc.addEventListener_handleColorForm();
cc.setSecondsToWaitOnLoading(1);
cc.load();