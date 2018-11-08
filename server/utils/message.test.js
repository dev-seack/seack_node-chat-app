const expect = require("expect");

var { generateMessage, generateLocationMessage } = require("./message");

describe("generateMessage", () => {
  it("should generate correct message object", () => {
    var newMessage = generateMessage("Marius", "Hello There!");

    expect(newMessage.from).toBe("Marius");
    expect(newMessage.text).toBe("Hello There!");
    expect(typeof newMessage.createdAt).toBe("number");
  });
});

describe("generateLocationMessage", () => {
  it("should generate correct location object", () => {
    var from = "Marius";
    var long = 500;
    var lat = -500;
    var url = `https://www.google.de/maps?q=${lat},${long}`;
    var locMsg = generateLocationMessage(from, lat, long);

    expect(locMsg.from).toBe(from);
    expect(locMsg.url).toBe(url);
    expect(typeof locMsg.createdAt).toBe("number");
  });
});
