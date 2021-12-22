## 개요

0. 타입스크립트는 컴파일때에만 적용된다. js 에는 ts가 없다.
1. 그러므로 런타임때는 타입스크립트는 적용 안된다.

## 타입

0.  타입 지정은 할당한 값에 따라가는 추론이 적용된다.
1.  선언만 해버리면 any가 자동으로 따라붙으므로 타입을 정해주는것이 좋다.
    ```
    const a; //any
    const b:number;  //number
    ```
2.  타입스크립트용 타입 : turple(푸시가 허용됨.)

    ```
    //0 ; 숫자 1 은 문자만 허용 2개만 허용 그러나 푸시하면 타입이 보장안됨.
    type turple = [number,string]

    //number 와 string이 허용되는 array
    type array = (number|string)[]

    ```

3.  enum 상수를 일일히 지정하기 싫다면 편하다.
    ```
    enum Role {'doctor','patient'}
    ```
4.  typeof 타입으로 변환한다 이게 모든곳에 다 적용 할 수 있다.

    ```
    const a = ()=>({x:1,y:2})

    //{x:number,y:number}
    typeof a;
    ```

5.  enum 은 숫자를 바꿔버리면 바뀌므로 위험하다 이것을 그냥쓰지 말고 typeof 로 바꿔서 타입화 해보자.

    ```
    enum Role={
      'a'='a',
      'b'='b'
    }

    //newRole 'a'|'b'
    type newRole = keyof typeof Role;
    ```

6.  유니언 타입을 일부 수식이 이해를 못할때도 있다. 내가 모르는 예외가 있을 수 있음.

    ```
    type b = string|number;
    function combine(a: b, c: b) {
    if (typeof a === "number" && typeof c === "number") {
    a + c; //에러 없이 잘 됨.
    }

             a+c //에러 발생(string|number 는 + 연산자 사용할 수 없다.고 함.)

    }
    ```

7.  콜백함수는 리턴 타입을 무시 할 수 있다.

    ```
    function a() {
    return 1;
    }

    type ab = (a: () => void) => void;

    const fun: ab = (a) => {
    console.log(1);
    a(); //콜백함수는 return void 라도 값을 반환 할 수 있다 오류 안뜬다
    };

    ```

8.  unknown 미리 지정된 타입이 없다면 넘어간다.
    ```
    let b:string;
    let c:unknown = b  //오류가 남 b 는 이미 string이므로
    ```
9.  any 타입검사를 아예 안한다.
10. never 오류를 반환 하는 경우의 타입, 무한루프경우

## tsconfig

1. exclude

   ```
   //모든 폴더 ** 내에 모든 tscs.ts 파일은 컴파일 하지 마라.
   //node_modules 는 아무것도 안적어도 자동 exclude 된다.
    "exclude": ["**/*.dev.ts"]
   ```

2. include : 한번 설정 하면 모든 컴파일 할 파일 다 넣어야 함.
   ```
   //먼저 인클루드 한것 중에서 익스클루드를 빼는 것 같다.
   //서로 상충되는데 잘 작동한다 단 .dev.ts 는 컴파일 안된다.
   "exclude": ["**/*.dev.ts", "node_modules"],
   "include": ["src/**/*.ts"]
   ```
3. 파일단위 인클루드 "file"
   ```
     "files": ["app.ts"]
   ```
4. target 는 어떤 버전으로 컴파일 할건지? es6 == 2015 정도 레벨임
5. lib 는 안적으면 기본적인 methods properties가 사용될 수 있는 것들이 매핑된다. fetch addevent 등등.
   - 컴파일 할 js 버전에 따라 다르다.
   ```
   //target es6와 동일한 옵션
   "lib": [
      "ES6",
      "DOM",
      "DOM.Iterable",
      "ScriptHost"
    ]
   ```
6. sourcemap //ts로 디버깅 가능
7. rootdoor outdoor root //를 다른 폴더로 설정해도 가장 바깥에 있는 ts 파일 도 처리 해준다.
8. removecomments 주석제거 //파일 용량 줄여야지!
9. noemit js 파일 안만든다. //컴파일 하는데 시간 오래 걸리면 쓸 수도 있지.
10. no emit on error //에러있으면 컴파일 안한다. //에러있으면 시간 아껴야지.
11. "strict": true // 이 옵션 하나면 모든 strict options 가 true 인것과 같다.
    - nullcheck(말그대로임), implict(타입 설정 안해도 그냥 넘어간다)
12. additionalCheck 코드품질을 높게!!

## 타입 활용

1. 타입가드

   ```
   key in obj <-- 타입에 키값이 있을때 확인가능, 클레스 에서도 확인가능
   typeof val <-- 원시적인 타입만 확인가능
   instanceof <-- 클레스로 만든 인스턴스 확인가능 인스턴스 안된다 instance 설계도 말하는거임

   ```

2. 타입 구분법 인스턴스에 새로운 속성을 넣어주어라

   ```
   interface A {
   type: "A";
   flying(): void;
   }

    interface B {
    type: "B";
    running(): void;
    }

    type C = A | B;

    function move(animal: C) {
    switch (animal.type) {
    case "A":
    break;
    case "B":
    break;
    default:
    return;
    }
    }

   ```

3. 타입 강제 캐스팅 방법은 2개가 있는데 jsx 와 충돌 고려 해서 !as 가 좋은 것 같다.

   ```
   const dom = <HTMLParagraphElement>document.querySelector("p");

   //or
   // const dom = document.querySelector("p")! as HTMLParagraphElement;
   dom.addEventListener("click", () => {
   console.log(1);
   });

   ```

4. 키값 어떻게 타입을 주는지 몰랐는데 이렇게 하는거구나!!!!!

   ```
   type Errors={
       [prop: string]: string;
       }
   ```

5. 함수를 overload 도 할 수 있다. 조건이 까다로우니 고민 해서 만들어야 한다.

   - 모든 경우의 수를 다 넣어줘서 오류가 안생기게 만 들 수 있다.

   ```
    type a = string | number;

    function add(a: string, b: string): string;
    function add(a: number, b: number): number;
    function add(a: string, b: number): string;
    function add(a: number, b: string): string;
    function add(a: a, b: a) {
    if (typeof a === "string" || typeof b === "string") {
        return a.toString() + b.toString();
    }
    return a + b;
    }


   ```

6. ?? 는 undefined null 에서만 통과한다.

## 제네릭

1. 내장제네릭
   ```
   //내장 제네릭 어레이와 프라미스
   const ar: Array<string> = ["a"];
   const promise: Promise<string> = new Promise((resolve, reject) => {
   resolve("a");
   });
   ```
2. 함수 제네릭

   ```
   type a = { a: string };
   type b = { b: string };

   const ab = <A, B>(a: A, b: B) => {
   return Object.assign(a, b);
   };

   ab<a, b>({ a: "a" }, { b: "B" });
   ```

3. 선택형식 다음에 필수형식이 와야 한다.

   ```
   //선택 형식 이후 필수형식이 와야 한다.
   const ab = <A, B = b>(a: A, b: B) => {
   return Object.assign(a, b);
   };
   ```

4. keyof 는 그냥 extends keyof 로 쓰면되는듯 하다.

   ```
   type keyo = { a: "aa"; b: "bb"; c: "cc" };

   function extractt<O extends keyo, K extends keyof O>(obj: O, key: K) {
   console.log(obj[key]);
   return obj[key];
   }

   extractt<keyo, keyof keyo>({ a: "aa", b: "bb", c: "cc" }, "c");

   ```
