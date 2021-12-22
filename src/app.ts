type keyo = { a: "aa"; b: "bb"; c: "cc" };

function extractt<O extends keyo, K extends keyof O>(obj: O, key: K) {
  console.log(obj[key]);
  return obj[key];
}

extractt<keyo, keyof keyo>({ a: "aa", b: "bb", c: "cc" }, "c");
