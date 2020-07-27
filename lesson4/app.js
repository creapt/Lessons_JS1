'use strict';
//Урок 4
//Задание 1
const newObjext = {
    units: null,
    tens: null,
    hundreds: null,
}

function swapNumToObj(a) {
    if (Math.floor(a) < a || a > 999 || a < 0 || a == NaN) {
        console.log = ('Ошибка');
        return newObjext;
    } else {
        newObjext.units = Math.floor(a / 100);
        newObjext.tens = Math.floor((a % 100) / 10);
        newObjext.hundreds = Math.floor((a % 100) % 10);
    }
    return newObjext;
}
console.log(swapNumToObj(537));
//Задание 2
const basketPrice = [{
        id: 3,
        name: "table",
        price: 127,
        photos: [
            "1.jpg",
            "2.jpg",
        ]
    },
    {
        id: 5,
        name: "chair",
        price: 499,
        photos: []
    },
    {
        id: 10,
        name: "bed",
        price: 26,
        photos: [
            "3.jpg"
        ]
    },
    {
        id: 8,
        name: "delivery",
        price: 78,
    },
]

function countBasketPrice(arr) {
    const result = arr.reduce(function(count, current) {
        return count + current.price // почему именно тут мы ссылаемся на свойство price? почему не сразу в объявлении массива? Если бы не MDN долго голову бы ломал
    }, 0)
    return result
}
console.log(countBasketPrice(basketPrice))