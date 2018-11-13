const expect = require("expect");

const { isRealString } = require("./validation");

describe("isRealString", () => {
  it("should reject non-string values", () => {
    var str = isRealString(123);

    expect(str).toBeFalsy();
  });

  it("should reject string with only spaces", () => {
    var str = isRealString("   ");
    expect(str).toBeFalsy();
  });
  it("should allow string with non-sapce characters", () => {
    var str = isRealString(" Marius ");

    expect(str).toBeTruthy();
  });
});
