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
