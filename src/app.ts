interface ValidatorConfig {
  [property: string]: {
    [validatableProp: string]: string[]; // ['required', 'positive']
  };
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: ["required"],
  };
}

function PositiveNumber(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: ["positive"],
  };
}

function validate(obj: any) {
  const objValidatorConfig = registeredValidators[obj.constructor.name];
  if (!objValidatorConfig) {
    return true;
  }
  let isValid = true;
  for (const prop in objValidatorConfig) {
    for (const validator of objValidatorConfig[prop]!) {
      switch (validator) {
        case "required":
          isValid = isValid && !!obj[prop];
          break;
        case "positive":
          isValid = isValid && obj[prop] > 0;
          break;
      }
    }
  }
  return isValid;
}

class Course {
  @Required
  title: string;
  @PositiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const courseForm = document.querySelector("form")!;
// courseForm.addEventListener("submit", (event) => {
//   event.preventDefault();
//   const titleEl = document.getElementById("title") as HTMLInputElement;
//   const priceEl = document.getElementById("price") as HTMLInputElement;

//   const title = titleEl.value;
//   const price = +priceEl.value;

//   const createdCourse = new Course(title, price);

//   if (!validate(createdCourse)) {
//     alert("Invalid input, please try again!");
//     return;
//   }
//   console.log(createdCourse);
// });

type Valu = {
  [k: string]: {
    [k: string]: string[];
  };
};

type UnionValues = {
  title: string;
  price: number;
};

interface IDump {
  title: string;
  price: number;
}

const config: Valu = {};

function Re(t: any, n: string) {
  const name = t.constructor.name;
  config[name] = {
    ...config[name],
    [n]: [...(config[name]?.[n] ?? []), "required"],
  };
}

function Po(t: any, n: string) {
  const name = t.constructor.name;
  config[name] = {
    ...config[name],
    [n]: [...(config[name]?.[n] ?? []), "positive"],
  };
}

function valid(dump: any): boolean {
  const vals = config[dump.constructor.name];
  let result = true;

  for (const key in vals) {
    for (const item of vals[key]!) {
      switch (item) {
        case "required":
          result = !!dump[key];
          break;
        case "positive":
          result = dump[key] > 0;
          break;
        default:
          throw new Error("error");
      }
    }
  }

  return result;
}

class Dump {
  @Re
  title: string;

  @Po
  price: number;
  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const form = document.querySelector("form")! as HTMLFormElement;
const titleEl = document.querySelector("#title")! as HTMLInputElement;
const priceEl = document.querySelector("#price")! as HTMLInputElement;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(+priceEl.value);
  if (!valid(new Dump(titleEl.value, +priceEl.value))) {
    alert("wrong");
  }
  console.log(11);
});
