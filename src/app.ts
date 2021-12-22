function Logger(arg: string) {
  //원하는 인자를 받아서 사용할 수 있따.
  console.log("logger");
  //데코레이터가 정의된 익명함수를 반환한다.
  return function (constractor: Function) {
    console.log("returnedDeco");
    console.log("returnedDeco2");
  };
}

function WithTemplate(template: string, hookId: string) {
  return function (constractor: { new (...arg: any[]): Person }) {
    const p = new constractor();
    const parent = document.getElementById(hookId)! as HTMLDivElement;
    parent.innerHTML = template;
    parent.querySelector("div")!.textContent = p.nam;
  };
}

// @Logger("옛다!! 인자!")
@WithTemplate("<div>hellow<div>", "id")
class Person {
  nam = "peteraa";

  constractor() {
    console.log("good person");
  }
}
