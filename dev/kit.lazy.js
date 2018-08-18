import './classes';
/**
 * UI Kit Lazy v1.0.0
 * Copyright 2017-2019 Andrey Ponomarenko
 * Licensed under  ()
 */

// ======================= MODEL ============================

if (!document.kit) document.kit = {};
if (!window.kit) window.kit = document.kit;

// == Опции ==
// Lazy.delay = delay in milliseconds before images will be replaced ()
// success = класс который будет добавляться если это Background Image
// searchClass = КЛАСС! Именно класс! По которому будет проходить поиск элементов для лезилоуда


// == методы ==
// Lazy.load = для ассинхронной подгрузки картинок


// == Коллбеки ==
// onReplace(if(img)domElement)



class KitLazy {
	constructor() {
		this.delay = 0;
		this.active = false;
		this.success = 'loaded';
		this.searchClass = 'kit-lazy';
		this.onReplace = false;
		this.toBeLoad = [].slice.call(document.querySelectorAll('.' + this.searchClass));
		this.loaded = [];
	}

	serve = () => {
		if (this.active === false) {
			this.active = true;
			setTimeout(() => {
				let arr = this.toBeLoad;
				for(let i = 0; i < arr.length ;i++) {
					let img = arr[i];
					let position = img.getBoundingClientRect();

					// if img in viewport
					if ((position.top <= window.innerHeight && position.bottom >= 0) && getComputedStyle(img).display !== "none" && !img.lazyLoaded) {
						if (img.tagName === "IMG") {
							if (!img.dataset.src) throw new Error('Replaceable image should contain data-src attribute, with link to another image');
							img.src = img.dataset.src;
							img.kitAddClass(this.success);
							img.lazyLoaded = true;
						} else {
							img.kitAddClass(this.success);
							img.lazyLoaded = true;
						}

						img.kitRemoveClass(this.searchClass);

						// callback
						if (this.onReplace) this.onReplace(img);

						// if element was replaced, then move it in to loaded, and stop to iterate on it
						this.loaded = this.loaded.concat(arr.splice(i, 1));
						i--;

						// Remove listeners
						if (this.toBeLoad.length === 0) toggleListeners(false);
					}
				}
				this.active = false;
			}, this.delay);
		}
	};

	load = () => {
		let items = [].slice.call(document.querySelectorAll('.' + this.searchClass));
		// items = items.filter((e) => !e.lazyLoaded);
		this.toBeLoad = this.toBeLoad.concat(items);
		if (this.toBeLoad.length > 0) toggleListeners();
	}
}

kit.createLazy = (params) => {
	if(!kit.lazy) {
		kit.lazy = params ? Object.assign(new KitLazy(), params) : new KitLazy();
		toggleListeners();
	} else {
		if(params) Object.assign(kit.lazy, params);
		kit.lazy.load();
	}
};

function toggleListeners (toggle = true) {
	kit.lazy.serve();
	if(toggle) {
		document.addEventListener("scroll", kit.lazy.serve);
		window.addEventListener("resize", kit.lazy.serve);
		window.addEventListener("orientationchange", kit.lazy.serve);
	} else {
		document.removeEventListener("scroll", kit.lazy.serve);
		window.removeEventListener("resize", kit.lazy.serve);
		window.removeEventListener("orientationchange", kit.lazy.serve);
	}
}