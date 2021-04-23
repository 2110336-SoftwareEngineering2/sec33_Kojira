let app = require("../../app");
let chai = require("chai");
let chaiHttp = require("chai-http");
const NontSitter = require("../../Models/NontSitter");

chai.use(chaiHttp);

const expect = chai.expect;

var SitterToken = null;

describe("Create Nont Sitter", () => {});

describe("Login Nont Sitter", () => {
  it("It should login Nont Sitter", (done) => {
    chai
      .request(app)
      .post("/nontSitters/login")
      .type("form")
      .send({ email: "sitterTest@test.com", password: "testpassword" })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.token).to.not.be.null;
        expect(res.body.userType).to.equal("Nont Sitter");
        SitterToken = res.body.token;
        expect(res.body.login).to.be.true;
        expect(err).to.be.null;
        done();
      });
  });
});

describe("Authenticate Nont Sitter", () => {
  it("It should authenticate token for Nont Sitter", (done) => {
    chai
      .request(app)
      .post("/users/auth")
      .set({ Authorization: "Bearer " + SitterToken })
      .type("form")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.authenticated).to.be.true;
        expect(res.body.userType).to.equal("Nont Sitter");
        done();
      });
  });
});

describe("Clear Up", () => {
  it("Clear up", (done) => {
    done();
  });
});
