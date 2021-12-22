const dom = <HTMLParagraphElement>document.querySelector("p");

//or
// const dom = document.querySelector("p")! as HTMLParagraphElement;
dom.addEventListener("click", () => {
  console.log(1);
});
