let app = require("../../app");
let chai = require("chai");
let chaiHttp = require("chai-http");
const Admin = require("../../Models/Admin");

const expect = chai.expect;

chai.use(chaiHttp);

var AdminToken = null;

const testAdminEmail = "admintest@kojira.com";

describe("Start Condition", () => {
  it("Clear the database if there is an admin with email 'admintest@kojira.com'", (done) => {
    Admin.findOne({ email: testAdminEmail }).then((result) => {
      if (result) {
        Admin.deleteOne({ email: testAdminEmail }).then((err) => done());
      } else {
        done();
      }
    });
  });
});

describe("SignUp Process", () => {
  it("TC2-25: It should create admin", (done) => {
    chai
      .request(app)
      .post("/admin/create")
      .type("form")
      .send({
        email: testAdminEmail,
        password: "testpassword",
        userType: "admin",
        secret: "Kojira_secret_code",
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.email).to.equal(testAdminEmail);
        expect(res.body.userType).to.equal("admin");
        Admin.findOne({ email: testAdminEmail }).then((result) => {
          expect(result).to.not.be.null;
          expect(result.email).to.equal(testAdminEmail);
          done();
        });
      });
  });
  it("TC2-26: It should not create admin if the secret is not correct", (done) => {
    chai
      .request(app)
      .post("/admin/create")
      .type("form")
      .send({
        email: testAdminEmail,
        password: "testpassword",
        userType: "admin",
        secret: "some_secret",
      })
      .end((err, res) => {
        expect(res).to.have.status(500);
        done();
      });
  });
  it("TC2-27: It should not create admin if the email format is not correct", (done) => {
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
        expect(res.body.err).to.equal(
          "review the value of the fields correctly, there should be 4 fields : secret, password, email, and userType. And the password should be between 8 and 32 characters"
        );
        done();
      });
  });
  it("TC2-28: It should not create admin if the fields are not valid", (done) => {
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
        expect(res.body.err).to.equal(
          "review the value of the fields correctly, there should be 4 fields : secret, password, email, and userType. And the password should be between 8 and 32 characters"
        );
        done();
      });
  });
  it("TC2-29: It should not create admin if the email is already in the database", (done) => {
    chai
      .request(app)
      .post("/admin/create")
      .type("form")
      .send({
        email: testAdminEmail,
        password: "testpassword",
        userType: "admin",
        secret: "Kojira_secret_code",
      })
      .end((err, res) => {
        expect(res).to.have.status(500);
        expect(res.body.err).to.equal(
          "this admin email is already in the database"
        );
        done();
      });
  });
});

describe("login APIs", () => {
  it("TC2-38: It should login Admin", (done) => {
    chai
      .request(app)
      .post("/admin/login")
      .type("form")
      .send({ email: testAdminEmail, password: "testpassword" })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.token).to.not.be.null;
        expect(res.body.userType).to.equal("admin");
        AdminToken = res.body.token;
        expect(res.body.login).to.be.true;
        expect(err).to.be.null;
        done();
      });
  });
  it("TC2-39: It should know that the password is incorrect", (done) => {
    chai
      .request(app)
      .post("/admin/login")
      .type("form")
      .send({ email: testAdminEmail, password: "incorrectpassword" })
      .end((err, res) => {
        expect(res.body.login).to.be.false;
        expect(res.body.error).to.not.be.undefined;
        done();
      });
  });
  it("TC2-40: It should know that the email is incorrect", (done) => {
    chai
      .request(app)
      .post("/admin/login")
      .type("form")
      .send({ email: "incorrect@test.com", password: "testpassword" })
      .end((err, res) => {
        expect(res.body.login).to.be.false;
        expect(res.body.error).to.not.be.undefined;
        done();
      });
  });
  it("TC2-41: It should know that the email and password are incorrect", (done) => {
    chai
      .request(app)
      .post("/admin/login")
      .type("form")
      .send({ email: "incorrect@test.com", password: "incorrectpassword" })
      .end((err, res) => {
        expect(res.body.login).to.be.false;
        expect(res.body.error).to.not.be.undefined;
        done();
      });
  });
});

describe("Authenticate token", () => {
  it("TC2-44: It should authenticate token for Admin", (done) => {
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
    Admin.deleteOne({ email: "admintest@kojira.com" }).then((err) => done());
  });
});
