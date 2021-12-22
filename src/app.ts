type obj = {
  a: 1;
  b: 2;
};

function abc<T extends obj>(a: T): T {
  const temp: Partial<T> = {};

  temp.a = 1;
  temp.b = 2;

  return temp as T;
}

const arr: Readonly<number[]> = [1, 2, 3];

arr.push(1); //오류
