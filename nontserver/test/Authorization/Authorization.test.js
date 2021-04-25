let app = require("../../app");
let chai = require("chai");
let chaiHttp = require("chai-http");

const expect = chai.expect;

chai.use(chaiHttp);

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
