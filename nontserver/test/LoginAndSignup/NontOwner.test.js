let app = require("../../app");
let chai = require("chai");
let chaiHttp = require("chai-http");
const NontOwner = require("../../Models/NontOwner");

chai.use(chaiHttp);

const expect = chai.expect;

var OwnerToken = null;

describe("Nont Owner Create", () => {
  it("It should create nont owner", (done) => {
    chai
      .request(app)
      .post("/NontOwners")
      .type("form")
      .send({
        email: "nontOwnerTest@kojira.com",
        password: "testpassword",
        name: "Kojira",
        phoneNumber: "0111111111",
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
  it("It should not create nont owner with same email", (done) => {
    chai
      .request(app)
      .post("/NontOwners")
      .type("form")
      .send({
        email: "nontOwnerTest@kojira.com",
        password: "anothertestpassword",
        name: "Kojira2",
        phoneNumber: "0111111112",
      })
      .end((err, res) => {
        expect(res).to.have.status(403);
        done();
      });
  });
  it("It should not create nont owner with same name", (done) => {
    chai
      .request(app)
      .post("/NontOwners")
      .type("form")
      .send({
        email: "nontOwnerTest2@kojira.com",
        password: "anothertestpassword",
        name: "Kojira",
        phoneNumber: "0111111113",
      })
      .end((err, res) => {
        expect(res).to.have.status(403);
        done();
      });
  });
  it("It should verify the invalid email format", (done) => {
    chai
      .request(app)
      .post("/NontOwners")
      .type("form")
      .send({
        email: "nontOwnerTest.com",
        password: "testpassword",
        name: "Kojira5",
        phoneNumber: "0111111114",
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it("It should verify the invalid telephone format", (done) => {
    chai
      .request(app)
      .post("/NontOwners")
      .type("form")
      .send({
        email: "nontOwnerTest4@test.com",
        password: "testpassword",
        name: "Kojira6",
        phoneNumber: "0111111",
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
  it("It should verify the invalid name format (1-64) test 0", (done) => {
    chai
      .request(app)
      .post("/NontOwners")
      .type("form")
      .send({
        email: "nontOwnerTest5@test.com",
        password: "testpassword",
        name: "",
        phoneNumber: "0111111115",
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
  it("It should verify the invalid name format (1-64) test 65", (done) => {
    var name = "";
    for (var i = 0; i < 65; i++) {
      name = name + "k";
    }
    chai
      .request(app)
      .post("/NontOwners")
      .type("form")
      .send({
        email: "nontOwnerTest6@test.com",
        password: "testpassword",
        name: name,
        phoneNumber: "0111111116",
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
  it("It should verify the invalid password format (8-32) test 5", (done) => {
    chai
      .request(app)
      .post("/NontOwners")
      .type("form")
      .send({
        email: "nontOwnerTest7@test.com",
        password: "tests",
        name: "Kojira7",
        phoneNumber: "0111111117",
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
  it("It should verify the invalid password format (8-32) test 35", (done) => {
    var pass = "";
    for (var i = 0; i < 35; i++) {
      pass = pass + "k";
    }
    chai
      .request(app)
      .post("/NontOwners")
      .type("form")
      .send({
        email: "nontOwnerTest8@test.com",
        password: pass,
        name: "Kojira8",
        phoneNumber: "0111111118",
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
  it("It should verify the valid bank account format", (done) => {
    chai
      .request(app)
      .post("/NontOwners")
      .type("form")
      .send({
        email: "nontOwnerTest9@test.com",
        password: "testpassword",
        name: "Kojira9",
        phoneNumber: "0111111119",
        bankAccount: "1234567890",
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
  it("It should verify the invalid bank account format ", (done) => {
    chai
      .request(app)
      .post("/NontOwners")
      .type("form")
      .send({
        email: "nontOwnerTest10@test.com",
        password: "testpassword",
        name: "Kojira10",
        phoneNumber: "0111111120",
        bankAccount: "12345678",
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
});

describe("Nont Owner Login", () => {
  it("It should login Nont Owner", (done) => {
    chai
      .request(app)
      .post("/nontOwners/login")
      .type("form")
      .send({ email: "nontOwnerTest@kojira.com", password: "testpassword" })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.token).to.not.be.null;
        OwnerToken = res.body.token;
        expect(res.body.userType).to.equal("Nont Owner");
        expect(res.body.login).to.be.true;
        expect(err).to.be.null;
        done();
      });
  });
  it("It should know that the password is incorrect", (done) => {
    chai
      .request(app)
      .post("/nontOwners/login")
      .type("form")
      .send({ email: "test@test.com", password: "incorrectpassword" })
      .end((err, res) => {
        expect(res.body.login).to.be.false;
        expect(res.body.error).to.not.be.undefined;
        done();
      });
  });
  it("It should know that the email is incorrect", (done) => {
    chai
      .request(app)
      .post("/nontOwners/login")
      .type("form")
      .send({ email: "incorrect@test.com", password: "testpassword" })
      .end((err, res) => {
        expect(res.body.login).to.be.false;
        expect(res.body.error).to.not.be.undefined;
        done();
      });
  });
  it("It should know that the email and password are incorrect", (done) => {
    chai
      .request(app)
      .post("/nontOwners/login")
      .type("form")
      .send({ email: "incorrect@test.com", password: "incorrectpassword" })
      .end((err, res) => {
        expect(res.body.login).to.be.false;
        expect(res.body.error).to.not.be.undefined;
        done();
      });
  });
});

describe("Authenticate Nont Owner", () => {
  it("It should authenticate token for Nont Owner", (done) => {
    chai
      .request(app)
      .post("/users/auth")
      .set({ Authorization: "Bearer " + OwnerToken })
      .type("form")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.authenticated).to.be.true;
        expect(res.body.userType).to.equal("Nont Owner");
        done();
      });
  });
});

describe("Clear Up", () => {
  it("Clear up", (done) => {
    NontOwner.deleteOne({ email: "nontOwnerTest@kojira.com" }).then(
      NontOwner.deleteOne({ email: "nontOwnerTest9@test.com" }).then(done())
    );
  });
});
