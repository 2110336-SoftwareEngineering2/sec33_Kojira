let app = require("../../app");
let chai = require("chai");
let chaiHttp = require("chai-http");
const Admin = require("../../Models/Admin");
const NontOwner = require("../../Models/NontOwner");

const expect = chai.expect;

chai.use(chaiHttp);

var AdminToken = null;

describe("SignUp Process", () => {
  it("It should create admin", (done) => {
    chai
      .request(app)
      .post("/admin/create")
      .type("form")
      .send({
        email: "admintest@kojira.com",
        password: "testpassword",
        userType: "admin",
        secret: "Kojira_secret_code",
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.email).to.equal("admintest@kojira.com");
        expect(res.body.userType).to.equal("admin");
        done();
      });
  });
  it("It should not create admin if the secret is not correct", (done) => {
    chai
      .request(app)
      .post("/admin/create")
      .type("form")
      .send({
        email: "admintest2@kojira.com",
        password: "testpassword",
        userType: "admin",
        secret: "some_secret",
      })
      .end((err, res) => {
        expect(res).to.have.status(500);
        done();
      });
  });
  it("It should not create admin if the email format is not correct", (done) => {
    chai
      .request(app)
      .post("/admin/create")
      .type("form")
      .send({
        email: "admintest2.com",
        password: "testpassword",
        userType: "admin",
        secret: "Kojira_secret_code",
      })
      .end((err, res) => {
        expect(res).to.have.status(500);
        done();
      });
  });
  it("It should not create admin if the fields are not valid", (done) => {
    chai
      .request(app)
      .post("/admin/create")
      .type("form")
      .send({
        email: "admintest2.com",
        password: "testpassword",
        secret: "Kojira_secret_code",
      })
      .end((err, res) => {
        expect(res).to.have.status(500);
        done();
      });
  });
});

describe("login APIs", () => {
  it("It should login Admin", (done) => {
    chai
      .request(app)
      .post("/admin/login")
      .type("form")
      .send({ email: "admintest@kojira.com", password: "testpassword" })
      .end((err, res) => {
        console.log(res.body);
        expect(res).to.have.status(200);
        expect(res.body.token).to.not.be.null;
        expect(res.body.userType).to.equal("admin");
        AdminToken = res.body.token;
        expect(res.body.login).to.be.true;
        expect(err).to.be.null;
        done();
      });
  });
});

describe("Authenticate token", () => {
  it("It should authenticate token for Admin", (done) => {
    chai
      .request(app)
      .post("/users/auth")
      .set({ Authorization: "Bearer " + AdminToken })
      .type("form")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.authenticated).to.be.true;
        expect(res.body.userType).to.equal("admin");
        done();
      });
  });
});

describe("Clear Up", () => {
  it("Clear up", (done) => {
    Admin.deleteOne({ email: "admintest@kojira.com" }).then(done());
  });
});
