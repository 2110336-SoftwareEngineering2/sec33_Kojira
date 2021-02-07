let app = require("../app");
let chai = require("chai");
let chaiHttp = require("chai-http");

const expect = chai.expect;

chai.use(chaiHttp);

var token = null;

describe("login APIs", () => {
  it("It should return jwt token", (done) => {
    chai
      .request(app)
      .post("/nontOwners/login")
      .type("form")
      .send({ email: "test2@test.com", password: "testpassword" })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.token).to.not.be.null;
        token = res.body.token;
        done();
      });
  });
});

// need more tests

describe("Unauthorized Token", () => {
  it("It should not let unauthorized request in", (done) => {
    chai
      .request(app)
      .post("/users/auth")
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
});

describe("Authenticate token", () => {
  it("It should authenticate token", (done) => {
    chai
      .request(app)
      .post("/users/auth")
      .set({ Authorization: "Bearer " + token })
      .type("form")
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});
