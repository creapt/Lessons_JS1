"use strict";
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function(event) {
  if (!event.target.matches('.btn')) {

    let dropdowns = document.getElementsByClassName("dropdown-menu");
    let i;
    for (i = 0; i < dropdowns.length; i++) {
      let openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

let basketBtns = document.querySelectorAll('.buy-btn');
//берем все кнопки "В корзину" и слушаем клики по ним
basketBtns.forEach(function (btn) {
    btn.addEventListener('click', function (event) {
        let id = event.srcElement.dataset.id;
        let price = event.srcElement.dataset.price;
        let name = event.srcElement.dataset.name;
        basket.addProduct({ id: id, price: price, name: name })
    })
});

let basket = {
    products: {},

    /**
     * Метод добавляет продукт в корзину.
     * @param {{ id: string, price: string, name: string }} product
     */
    addProduct(product) {
        this.addProductToObject(product);
        this.renderProductInBasket(product);
        this.renderTotalSum();
        this.addRemoveBtnsListeners();
    },

    /**
     * Обработчик события клика по кнопке удаления товара.
     * @param {MouseEvent} event
     */
    removeProductListener(event) {
        //console.log(this); this будет указывать на кнопку, а не на объект basket
        //здесь мы используем basket вместо this, потому что контекст вызова не имеет
        //этих методов и нам надо явно обратиться к нашему объекту корзины
        basket.removeProduct(event);
        basket.renderTotalSum();
    },

    /**
     * Добавляем слушателей события клика по кнопкам удалить.
     */
    addRemoveBtnsListeners() {
        let btns = document.querySelectorAll('.productRemoveBtn');
        for (let i = 0; i < btns.length; i++) {
            //важно указать именно this.removeProductListener, чтобы это была одна и та же
            //функция, а не несколько одинаковых.
            btns[i].addEventListener('click', this.removeProductListener);
        }
    },

    /**
     * Метод отображает общую сумму заказа в корзине.
     */
    renderTotalSum() {
        document.querySelector('.total').textContent = this.getTotalSum();
    },

    /**
     * Метод добавляет продукт в объект с продуктами.
     * @param {{ id: string, price: string, name: string }} product
     */
    addProductToObject(product) {
        if (this.products[product.id] == undefined) {
            this.products[product.id] = {
                price: product.price,
                name: product.name,
                count: 1
            }
        } else {
            this.products[product.id].count++;
        }
    },

    /**
     * Метод отрисовывает продукт в корзине, если там такой уже есть просто
     * увеличивает счетчик на 1.
     * @param {{ id: string, price: string, name: string }} product
     * @returns
     */
    renderProductInBasket(product) {
        let productExist = document.querySelector(`.productCount[data-id="${product.id}"]`);
        if (productExist) {
            productExist.textContent++;
            return;
        }
        let productRow = `
            <tr>
                <th scope="row">${product.id}</th>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td class="productCount" data-id="${product.id}">1</td>
                <td><i class="fas fa-trash-alt productRemoveBtn" data-id="${product.id}"></i></td>
            </tr>
        `;
        let tbody = document.querySelector('tbody');
        tbody.insertAdjacentHTML("beforeend", productRow);
    },

    /**
     * Метод считает стоимость всех продуктов в корзине.
     * @returns {number}
     */
    getTotalSum() {
        let sum = 0;
        for (let key in this.products) {
            sum += this.products[key].price * this.products[key].count;
        }
        return sum;
    },

    /**
     * Метод удаляет продукт из объекта продуктов, а также из корзины на странице.
     * @param {MouseEvent} event
     */
    removeProduct(event) {
        let id = event.srcElement.dataset.id;
        this.removeProductFromObject(id);
        this.removeProductFromBasket(id);
    },

    /**
     * Метод удаляет товар из корзины. Если количество больше 1, то просто уменьшает его.
     * @param {string} id
     */
    removeProductFromBasket(id) {
        let countTd = document.querySelector(`.productCount[data-id="${id}"]`);
        if (countTd.textContent == 1) {
            countTd.parentNode.remove();
        } else {
            countTd.textContent--;
        }
    },

    /**
     * Метод удаляет продукт из объекта с продуктами.
     * @param {string} id
     */
    removeProductFromObject(id) {
        if (this.products[id].count == 1) {
            delete this.products[id];
        } else {
            this.products[id].count--;
        }
    }
}

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