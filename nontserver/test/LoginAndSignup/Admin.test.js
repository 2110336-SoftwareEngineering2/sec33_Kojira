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
        Admin.deleteOne({ email: testAdminEmail }).then(
          Admin.findOne({ email: testAdminEmail }).then((result) => {
            expect(result).to.be.null;
            done();
          })
        );
      } else {
        done();
      }
    });
  });
});

describe("SignUp Process", () => {
  it("It should create admin", (done) => {
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
  it("It should not create admin if the secret is not correct", (done) => {
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
        expect(res.body.err).to.equal(
          "review the value of the fields correctly, there should be 4 fields : secret, password, email, and userType. And the password should be between 8 and 32 characters"
        );
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
        expect(res.body.err).to.equal(
          "review the value of the fields correctly, there should be 4 fields : secret, password, email, and userType. And the password should be between 8 and 32 characters"
        );
        done();
      });
  });
  it("It should not create admin if the email is already in the database", (done) => {
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
  it("It should login Admin", (done) => {
    chai
      .request(app)
      .post("/admin/login")
      .type("form")
      .send({ email: testAdminEmail, password: "testpassword" })
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
