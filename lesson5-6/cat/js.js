"use strict";


const basket = {
    settings: {
        countSelector: '#basket-count',
        priceSelector: '#basket-price',
    },
    goods: [],
    countEl: null,
    priceEl: null,

    init(settings = {}) {
        this.settings = Object.assign(this.settings, settings);
        this.countEl = document.querySelector(this.settings.countSelector);
        this.priceEl = document.querySelector(this.settings.priceSelector);
        this.render();
    },

    render() {
        this.countEl.textContent = this.goods.length;
        this.priceEl.textContent = this.getGoodsPrice();
    },

    getGoodsPrice() {
        let cost = 0;
        for (const good of this.goods) {
            cost += good.price;
        }
        return cost;

    },

    add(goodName, goodPrice) {
        this.goods.push({ name: goodName, price: goodPrice });
        this.render();
    },
};


basket.init();

document.querySelectorAll('.buy-btn').forEach(el => {

    el.addEventListener('click', e => {

        basket.add(e.target.dataset.name, +e.target.dataset.price);


    })
});

const gallery = {
    openedImageEl: null,

    settings: {
        previewSelector: '.mySuperGallery',
        openedImageWrapperClass: 'galleryWrapper',
        openedImageClass: 'galleryWrapper__image',
        openedImageScreenClass: 'galleryWrapper__screen',
        openedImageCloseBtnClass: 'galleryWrapper__close',
        openedImageCloseBtnSrc: 'images/gallery/close.png',
        openedImageNextBtnSrc: 'images/gallery/next.png',
        openedImageNextBtnClass: 'galleryWrapper__next',
        openedImageBackBtnSrc: 'images/gallery/back.png',
        openedImageBackBtnClass: 'galleryWrapper__back',
        imageNotFoundSrc: 'images/gallery/duck.gif',
    },


    init(settings) {

        this.settings = Object.assign(this.settings, settings);

        document
            .querySelector(this.settings.previewSelector)
            .addEventListener('click', event => this.containerClickHandler(event));
    },


    containerClickHandler(event) {

        if (event.target.tagName !== 'IMG') {
            return;
        }

        this.openedImageEl = event.target;

        this.openImage(event.target.dataset.full_image_url);
    },


    openImage(src) {

        const openedImageEl = this.getScreenContainer().querySelector(`.${this.settings.openedImageClass}`);
        const img = new Image();
        img.onload = () => openedImageEl.src = src;
        img.onerror = () => openedImageEl.src = this.settings.imageNotFoundSrc;
        img.src = src;
    },


    getScreenContainer() {

        const galleryWrapperElement = document.querySelector(`.${this.settings.openedImageWrapperClass}`);

        if (galleryWrapperElement) {
            return galleryWrapperElement;
        }

        return this.createScreenContainer();
    },

    createScreenContainer() {

        const galleryWrapperElement = document.createElement('div');
        galleryWrapperElement.classList.add(this.settings.openedImageWrapperClass);
        const backBtn = new Image();
        backBtn.classList.add(this.settings.openedImageBackBtnClass);
        backBtn.src = this.settings.openedImageBackBtnSrc;
        galleryWrapperElement.appendChild(backBtn);
        backBtn.addEventListener('click', () => {
            this.openedImageEl = this.getPrevImage();
            this.openImage(this.openedImageEl.dataset.full_image_url);
        });
        const nextBtn = new Image();
        nextBtn.classList.add(this.settings.openedImageNextBtnClass);
        nextBtn.src = this.settings.openedImageNextBtnSrc;
        galleryWrapperElement.appendChild(nextBtn);

        nextBtn.addEventListener('click', () => {
            this.openedImageEl = this.getNextImage();
            this.openImage(this.openedImageEl.dataset.full_image_url);
        });


        const galleryScreenElement = document.createElement('div');
        galleryScreenElement.classList.add(this.settings.openedImageScreenClass);
        galleryWrapperElement.appendChild(galleryScreenElement);


        const closeImageElement = new Image();
        closeImageElement.classList.add(this.settings.openedImageCloseBtnClass);
        closeImageElement.src = this.settings.openedImageCloseBtnSrc;
        closeImageElement.addEventListener('click', () => this.close());
        galleryWrapperElement.appendChild(closeImageElement);


        const image = new Image();
        image.classList.add(this.settings.openedImageClass);
        galleryWrapperElement.appendChild(image);

        document.body.appendChild(galleryWrapperElement);

        return galleryWrapperElement;
    },

    getNextImage() {
        const nextSibling = this.openedImageEl.nextElementSibling;
        return nextSibling ? nextSibling : this.openedImageEl.parentElement.firstElementChild;
    },

    getPrevImage() {
        const prevSibling = this.openedImageEl.previousElementSibling;
        return prevSibling ? prevSibling : this.openedImageEl.parentElement.lastElementChild;
    },

    close() {
        document.querySelector(`.${this.settings.openedImageWrapperClass}`).remove();
    }
};

window.onload = () => gallery.init({ previewSelector: '.popup-gallery' });