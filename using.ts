const num1 = document.getElementById("num1")! as HTMLInputElement;
const num2 = document.getElementById("num2")! as HTMLInputElement;
const button = document.querySelector("button")! as HTMLButtonElement;

function sum(num1: number, num2: number) {
  console.log(num1 + num2);
}

button.onclick = () => {
  sum(+num1.value, +num2.value);
};
