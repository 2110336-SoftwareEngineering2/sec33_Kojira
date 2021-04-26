let app = require("../../app");
let chai = require("chai");
let chaiHttp = require("chai-http");
const NontSitter = require("../../Models/NontSitter");

chai.use(chaiHttp);

const expect = chai.expect;

var SitterToken = null;

describe("Start Condition", () => {
  it("Clear the database if there is a nont sitter with email 'nontSitterTest@kojira.com'", (done) => {
    NontSitter.findOne({ email: "nontSitterTest@kojira.com" }).then(
      (result) => {
        if (result) {
          NontSitter.deleteOne({ email: "nontSitterTest@kojira.com" }).then(
            () =>
              NontSitter.findOne({ email: "nontSitterTest@kojira.com" }).then(
                (result) => {
                  expect(result).to.be.null;
                  done();
                }
              )
          );
        } else {
          done();
        }
      }
    );
  });
  it("Clear the database if there is a nont sitter with email 'nontSitterTest9@kojira.com'", (done) => {
    NontSitter.findOne({ email: "nontSitterTest9@kojira.com" }).then(
      (result) => {
        if (result) {
          NontSitter.deleteOne({ email: "nontSitterTest9@kojira.com" }).then(
            () =>
              NontSitter.findOne({ email: "nontSitterTest9@kojira.com" }).then(
                (result) => {
                  expect(result).to.be.null;
                  done();
                }
              )
          );
        } else {
          done();
        }
      }
    );
  });
});

describe("Nont Sitter Create", () => {
  it("It should create nont sitter", (done) => {
    chai
      .request(app)
      .post("/NontSitters")
      .type("form")
      .send({
        email: "nontSitterTest@kojira.com",
        password: "testpassword",
        name: "Kojira",
        phoneNumber: "0111111111",
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        NontSitter.findOne({ email: "nontSitterTest@kojira.com" }).then(
          (result) => {
            expect(result).to.not.be.null;
            done();
          }
        );
      });
  });
  it("It should not create nont sitter with same email", (done) => {
    chai
      .request(app)
      .post("/NontSitters")
      .type("form")
      .send({
        email: "nontSitterTest@kojira.com",
        password: "anothertestpassword",
        name: "Kojira2",
        phoneNumber: "0111111112",
      })
      .end((err, res) => {
        expect(res).to.have.status(403);
        done();
      });
  });
  it("It should not create nont sitter with same name", (done) => {
    chai
      .request(app)
      .post("/NontSitters")
      .type("form")
      .send({
        email: "nontSitterTest2@kojira.com",
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
      .post("/NontSitters")
      .type("form")
      .send({
        email: "nontSitterTest.com",
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
      .post("/NontSitters")
      .type("form")
      .send({
        email: "nontSitterTest4@kojira.com",
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
      .post("/NontSitters")
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
      .post("/NontSitters")
      .type("form")
      .send({
        email: "nontSitterTest6@kojira.com",
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
      .post("/NontSitters")
      .type("form")
      .send({
        email: "nontSitterTest7@kojira.com",
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
      .post("/NontSitters")
      .type("form")
      .send({
        email: "nontSitterTest8@kojira.com",
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
      .post("/NontSitters")
      .type("form")
      .send({
        email: "nontSitterTest9@kojira.com",
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
      .post("/NontSitters")
      .type("form")
      .send({
        email: "nontSitterTest10@kojira.com",
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

describe("Nont Sitter Login", () => {
  it("It should login Nont Sitter", (done) => {
    chai
      .request(app)
      .post("/nontSitters/login")
      .type("form")
      .send({ email: "nontSitterTest@kojira.com", password: "testpassword" })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.token).to.not.be.null;
        SitterToken = res.body.token;
        expect(res.body.userType).to.equal("Nont Sitter");
        expect(res.body.login).to.be.true;
        expect(err).to.be.null;
        done();
      });
  });
  it("It should know that the password is incorrect", (done) => {
    chai
      .request(app)
      .post("/nontSitters/login")
      .type("form")
      .send({
        email: "nontSitterTest@kojira.com",
        password: "incorrectpassword",
      })
      .end((err, res) => {
        expect(res.body.login).to.be.false;
        expect(res.body.error).to.not.be.undefined;
        done();
      });
  });
  it("It should know that the email is incorrect", (done) => {
    chai
      .request(app)
      .post("/nontSitters/login")
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
      .post("/nontSitters/login")
      .type("form")
      .send({ email: "incorrect@test.com", password: "incorrectpassword" })
      .end((err, res) => {
        expect(res.body.login).to.be.false;
        expect(res.body.error).to.not.be.undefined;
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
    NontSitter.deleteOne({ email: "nontSitterTest@kojira.com" }).then(() =>
      NontSitter.deleteOne({ email: "nontSitterTest9@kojira.com" }).then(done())
    );
  });
});
