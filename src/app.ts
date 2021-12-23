function Logger(_: string) {
  //원하는 인자를 받아서 사용할 수 있따.
  console.log("logger");
  //데코레이터가 정의된 익명함수를 반환한다.
  return function (_: Function) {
    console.log("returnedDeco");
    console.log("returnedDeco2");
  };
}

function WithTemplate(template: string, hookId: string) {
  console.log("tem1");
  return function <T extends { new (...arg: any[]): { nam: string } }>(
    constractor: T
  ) {
    return class extends constractor {
      constructor(..._: any[]) {
        super();
        console.log("tem222222222");
        const parent = document.getElementById(hookId)! as HTMLDivElement;
        parent.innerHTML = template;
        parent.querySelector("div")!.textContent = this.nam;
      }
    };
  };
}

@Logger("옛다!! 인자!")
@WithTemplate("<div>hellow<div>", "id")
class Person {
  nam = "peteraa";

  constractor(string: string) {
    console.log("주입받았어!!!" + string);
    console.log("good person");
  }
}
const pa = new Person();

function Log(target: any, name: string | symbol) {
  console.log(target);
  console.log(name);
  // const instanceNew = new target();
}

function Log2(
  target: any,
  name: string | symbol,
  descriptor: PropertyDescriptor
): PropertyDescriptor {
  console.log("log2");
  console.log(target);
  console.log(name);
  console.log(descriptor);

  const button = document.querySelector("#button")! as HTMLButtonElement;
  button.addEventListener("click", () => {
    descriptor.value();
  });
  return descriptor;
}

function Log3(
  target: any,
  name: string | symbol,
  descriptor: PropertyDescriptor
) {
  console.log("log3)");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function Arg(target: any, name: string | symbol, position: number) {
  console.log("arg1");
  console.log(target);
  console.log(name);
  console.log(position);
}

class Tax {
  @Log
  text: string;
  private price: number;

  constructor(t: string, p: number) {
    this.text = t;
    this.price = p;
    this.caculate(10);
  }

  @Log3
  set setPrice(@Arg p: number) {
    this.price = p;
  }

  @Log2
  caculate(@Arg rate: number): string {
    return `${this.price * rate}원`;
  }
}

function Autobind(
  _: any,
  __: string | symbol,
  propertyDescraptor: PropertyDescriptor
) {
  const origin = propertyDescraptor.value;
  const newMethod: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const binder = () => origin;
      return binder;
    },
  };
  return newMethod;
}

function ReBind(_: any, __: string, descriptor: PropertyDescriptor) {
  const origin = descriptor.value;
  const newOrigin: PropertyDescriptor = {
    enumerable: false,
    configurable: true,
    get() {
      return origin.bind(this);
    },
  };
  return newOrigin;
}

function Au(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}

class Print {
  message: string;
  constructor() {
    this.message = "hellow";
  }

  @ReBind
  print() {
    alert(this.message);
  }
}

const button = document.querySelector("#button")! as HTMLButtonElement;

const pr = new Print();

button.addEventListener("click", pr.print);
