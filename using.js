var num1 = document.getElementById("num1");
var num2 = document.getElementById("num2");
var button = document.querySelector("button");
function sum(num1, num2) {
    console.log(num1 + num2);
}
button.onclick = function () {
    sum(Number(num1.value), Number(num2.value));
};
