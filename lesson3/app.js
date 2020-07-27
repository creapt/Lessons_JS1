'use strict';
//Урок 3
//Задание 1
let i = 0
while (i <= 100) {
    let k = 2
    while (k < i) {
        if (i % k === 0) {
            break
        }
        k++
    }
    if (i === k) {
        console.log(i)
    }
    i++
}
//Задание 2-3
const basketPrice = [100, 250, 30, 560, 420]

function countBasketPrice(arr) {
    const result = arr.reduce(function(count, current) {
        return count + current
    }, 0)
    return result
}
console.log(countBasketPrice(basketPrice))

//Задание 4
for (let i = 0; i < 10; console.log(i++)) {}
//Задание 5
for (let x = 'x'; x.length <= 20; x += 'x') {
    console.log(x)
}