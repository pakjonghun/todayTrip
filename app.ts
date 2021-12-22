function a() {
  return 1;
}

type ab = (a: () => void) => void;

const fun: ab = (a) => {
  console.log(1);
  a(); //콜백함수는 return void 라도 값을 반환 할 수 있다 오류 안뜬다
};
