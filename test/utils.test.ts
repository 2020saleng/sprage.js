const utilsTest = require("../src/utils");
test("isnull测试", () => {
  expect(utilsTest.isNull(3)).toBe(false);
});
test("isnull测试", () => {
  expect(utilsTest.isNull(0)).toBe(false);
});
test("isnull测试", () => {
  expect(utilsTest.isNull("")).toBe(false);
});
test("isnull测试", () => {
  expect(utilsTest.isNull(null)).toBe(true);
});
// isNAN测试
test("isNAN测试", () => {
  expect(utilsTest.isNAN(3)).toBe(false);
});
test("isNAN测试", () => {
  expect(utilsTest.isNAN(0)).toBe(false);
});
test("isNAN测试", () => {
  expect(utilsTest.isNAN(undefined)).toBe(false);
});
test("isNAN测试", () => {
  expect(utilsTest.isNAN(NaN)).toBe(true);
});
//   checkTime测试
test("checkTime测试", () => {
  expect(utilsTest.checkTime(100)).toBe(false);
});
test("checkTime测试", () => {
  expect(utilsTest.checkTime(new Date().getTime() + 1000)).toBe(true);
});
