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
        phoneNumber: "0899495588",
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
        name: "Ghidora",
        phoneNumber: "0899495226",
      })
      .end((err, res) => {
        expect(res).to.have.status(403);
        done();
      });
  });
  it("It should verify the valid email format", (done) => {
    chai
      .request(app)
      .post("/NontOwners")
      .type("form")
      .send({
        email: "nontOwnerTest.com",
        password: "testpassword",
        name: "Kojira",
        phoneNumber: "0899495588",
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
      .send({ email: "test@test.com", password: "testpassword" })
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
    NontOwner.deleteOne({ email: "nontOwnerTest@kojira.com" }).then(done());
  });
});
