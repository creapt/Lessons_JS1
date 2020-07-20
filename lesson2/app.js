'use strict';
//Урок 2

//Задание 1

//пример 1
let a = 1,
    b = 1,
    c, d;
c = ++a; //значение операнда "a" увеличенное на единицу (так как ++ это оператор инкремента и он находится перед операндом) присвоилось "с"
alert(c); //ответ 2

//пример 2
d = b++; //значение операнда "b" присвоилось "d", а затем увеличилось на единицу (так как ++ это оператор инкремента и он находится после операнда)
alert(d); //ответ 1

//пример 3
c = 2 + ++a; //"a" = 2; ++a увеличил "a" на единицу (3); 2+3=5
alert(c); //ответ 5

//пример 4
d = 2 + b++; //сейчас "b" = равно 2, ++находится после операнда "b", поэтому сначала произойдет сложение 2+b=4, 4 присвоится "d", а затем "b" увеличится на единицу (3)
alert(d); //ответ 4
alert(a); // ответ 3
alert(b); //ответ 3


//Задание 2
let a2 = 2; //заменил переменную, так как переменная "а" уже есть
let x = 1 + (a2 *= 2)
    /* сначала выполняется выражение в скобках, а2 присваивается значение а2*2
    (2*2=4, а2=4 ) х присваивается выражение 1+4=5 */
alert(a2); // ответ 4
alert(x); // ответ 5

//Задание 3
let a3 = 5;
let b3 = -8;
if (a3 >= 0 && b3 >= 0) {
    console.log(a3 - b3);
} else if (a3 < 0 && b3 < 0) {
    console.log(a3 * b3);
} else if ((a3 * b3) < 0) {
    console.log(a3 + b3);
} else {
    console.log("Одно из значений не является числом!!!")
}
//Задание 4, тяжело когда знаешь циклы и массивы.Не многоне понятно, что нужно в итоге. Неужели просто набор цифр в зависимости какойиз 16 кейсов будет выбран?
//Задание 5,6,
function addition(a, b) {
    return a + b;
}


//вычитание
function subtraction(a, b) {
    return a - b;
}

//умножение
function multiplication(a, b) {
    return a * b;
}

//деление
function division(a, b) {
    return a / b;
}

function mathOperation(arg1, arg2, operation) {
    switch (operation) {
        case "+":
            return addition(arg1, arg2);
        case "-":
            return subtraction(arg1, arg2);
        case "*":
            return multiplication(arg1, arg2);
        case "/":
            return division(arg1, arg2);
        default:
            alert("Error");
            break;
    }
}
let a4 = Number(prompt("Введите первое число: "));
let b4 = Number(prompt("Введите второе число: "));
let oper = prompt("Введите операцию (сложение -  + , вычитание -  - , умножение -  * , деление -  / ): ");
console.log(`Ответ - ${mathOperation(a4, b4, oper)}`);

//Задание 7 - Null и 0 это не одно и тоже. так как 0 -это уже значение. А Null - это отсутствие значения.
//Задание 8
function power(val, pow) {
    if (pow == 1) {
      return val;
    } else {
      return val * power(val, pow - 1);
    }
  }
  
  alert( power(2, 7) ); // 128
