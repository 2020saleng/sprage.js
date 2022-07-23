import Sprage from "../src/store";

let store:any = new Sprage();
console.log(store);
// set方法测试
test("set测试", () => {
  expect(store.set("foo", "boo")).toBe(true);
});
test("set测试", () => {
  expect(store.set({ foo: "bo" })).toBe(true);
});
test("set测试", () => {
  expect(store.set({ name: "sam", age: 12 })).toBe(true);
});
test("set测试", () => {
  expect(store.set({ title: "store", content: { one: "ts", two: "js" } })).toBe(
    true
  );
});
test("set测试", () => {
  expect(
    store.set({
      MVC: "vue",
      msg: { item: { one: "Vue", two: "React", three: "AG" } },
    })
  ).toBe(true);
});
// get方法测试
test("get测试", () => {
  expect(store.get("foo")).toBe("bo");
});
test("get测试", () => {
  expect(store.get("name")).toBe("sam");
});
test("get测试", () => {
  expect(store.get("age")).toBe(12);
});
test("get测试", () => {
  expect(store.get("title")).toBe("store");
});
test("get测试", () => {
  expect(store.get("content")).toMatchObject({ one: "ts", two: "js" });
});
test("get测试", () => {
  expect(store.get("msg")).toMatchObject({
    item: { one: "Vue", two: "React", three: "AG" },
  });
});
// remove测试
test("remove测试", () => {
  expect(store.remove(["age", "foo", "name"])).toBe(true);
});
// has测试
test("has测试", () => {
  expect(store.has("title")).toBe(true);
});
test("has测试", () => {
  expect(store.has("foo")).toBe(false);
});
test("has测试", () => {
  expect(store.has("age")).toBe(false);
});
test("has测试", () => {
  expect(store.has("ag")).toBe(false);
});
// setCount测试
test("setCount测试", () => {
  expect(store.setCount({ count: "number" }, 1)).toBe(undefined);
});
test("setCount测试", () => {
  expect(store.get("count")).toBe("number");
});
test("setCount测试", () => {
  expect(store.get("count")).toBe(null);
});
// setTime测试
let val: any = undefined;
function timeout(timer: number, params: string) {
  setTimeout(() => {
    val = store.get(params);
  }, timer);
}
test("setTime测试", () => {
  expect(store.setTime({ time: 20 }, "10s")).toBe(undefined);
});
test("setTime测试1", () => {
  jest.useFakeTimers();
  timeout(100, "time");
  jest.runAllTimers();
  expect(val).toBe(20);
});
test("setTime测试", () => {
  jest.useFakeTimers();
  timeout(10000, "time");
  jest.runAllTimers();
  expect(val).toBe(null);
});
test("setTime测试", () => {
  expect(store.setTime({ min: 60 }, "1min")).toBe(undefined);
});
test("setTime测试1", () => {
  jest.useFakeTimers();
  timeout(100, "min");
  jest.runAllTimers();
  expect(val).toBe(60);
});
test("setTime测试", () => {
  jest.useFakeTimers();
  timeout(60000, "min");
  jest.runAllTimers();
  expect(val).toBe(null);
});
test("setTime测试", () => {
  expect(store.setTime({ hour: 600 }, "1h")).toBe(undefined);
});
test("setTime测试1", () => {
  jest.useFakeTimers();
  timeout(100, "hour");
  jest.runAllTimers();
  expect(val).toBe(600);
});
test("setTime测试", () => {
  jest.useFakeTimers();
  timeout(3600000, "hour");
  jest.runAllTimers();
  expect(val).toBe(null);
});
test("setTime测试", () => {
  expect(store.setTime({ day: 24 }, "1day")).toBe(undefined);
});
test("setTime测试1", () => {
  jest.useFakeTimers();
  timeout(100, "day");
  jest.runAllTimers();
  expect(val).toBe(24);
});
test("setTime测试", () => {
  jest.useFakeTimers();
  timeout(86400000, "day");
  jest.runAllTimers();
  expect(val).toBe(null);
});
// clear与getAll
test("clear测试", () => {
  expect(store.clear()).toBe(undefined);
});
test("getAll测试", () => {
  store.set({ hello: "world", MVC: "Vue" });
  expect(store.getAll()).toMatchObject([{ hello: "world" }, { MVC: "Vue" }]);
});
// foreach测试
test("forEach测试", () => {
  expect(
    store.forEach((key: string, val: any) => {
      return key + val;
    })
  ).toBe(undefined);
});
