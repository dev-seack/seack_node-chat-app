const expect = require("expect");

var { generateMessage } = require("./message");

describe("generateMessage", () => {
  it("should generate correct message object", () => {
    var newMessage = generateMessage("Marius", "Hello There!");

    expect(newMessage.from).toBe("Marius");
    expect(newMessage.text).toBe("Hello There!");
    expect(typeof newMessage.createdAt).toBe("number");
  });
});
