const expect = require("expect");
const { Users } = require("./users");

describe("Users", () => {
  var users;

  beforeEach(() => {
    users = new Users();
    users.users = [
      {
        id: "1",
        name: "Marius",
        room: "Node Course"
      },
      {
        id: "2",
        name: "Robin",
        room: "React Course"
      },
      {
        id: "3",
        name: "Halil",
        room: "Node Course"
      }
    ];
  });

  it("should add new user", () => {
    var users = new Users();
    var user = {
      id: "123",
      name: "Marius",
      room: "Whatever"
    };
    var res = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });

  it("should remove a user by id", () => {
    var userID = "1";
    var remUser = users.removeUser(userID);

    expect(remUser.id).toBe(userID);
    expect(users.users.length).toBe(2);
  });

  it("should not remove a user (unvalid id)", () => {
    var userID = "99";
    var remUser = users.removeUser(userID);

    expect(remUser).toEqual(undefined);
    expect(users.users.length).toBe(3);
  });

  it("should find a user by its id", () => {
    var userID = "1";
    var user = users.getUser(userID);

    expect(user.id).toBe(userID);
  });

  it("should not find a user (unvalid id)", () => {
    var userID = "99";
    var user = users.getUser(userID);

    expect(user).toEqual(undefined);
  });

  it("should return names for node course room", () => {
    var userList = users.getUserList("Node Course");

    expect(userList).toEqual(["Marius", "Halil"]);
  });

  it("should return names for react course room", () => {
    var userList = users.getUserList("React Course");

    expect(userList).toEqual(["Robin"]);
  });
});
