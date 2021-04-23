let app = require("../app");
let chai = require("chai");
let chaiHttp = require("chai-http");

const expect = chai.expect;

chai.use(chaiHttp);

var token = null;

// need to maintain records in db to pass this test.
describe("login APIs", () => {
  it("It should return jwt tsoken", (done) => {
    chai
      .request(app)
      .post("/nontOwners/login")
      .type("form")
      .send({ email: "test@test.com", password: "testpassword" })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.token).to.not.be.null;
        token = res.body.token;
        done();
      });
  });
});

// need more tests

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
