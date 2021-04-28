let app = require("../../app");
let chai = require("chai");
let chaiHttp = require("chai-http");
const NontSitter = require("../../Models/NontSitter");

chai.use(chaiHttp);

const expect = chai.expect;

var id;
var SitterToken;

describe("Start Condition", () => {
  it("Clear the database if there is a nont sitter with email 'nontSitterTestUpdate@kojira.com'", (done) => {
    NontSitter.findOne({ email: "nontSitterTestUpdate@kojira.com" }).then(
      (result) => {
        if (result) {
          //console.log("have");
          NontSitter.deleteOne({
            email: "nontSitterTestUpdate@kojira.com",
          }).then((err) => done());
        } else {
          //console.log("no");
          done();
        }
      }
    );
  });
  it("Clear the database if there is a nont sitter with name 'Hello'", (done) => {
    NontSitter.findOne({ name: "Hello" }).then((result) => {
      if (result) {
        //console.log("have");
        NontSitter.deleteOne({
          name: "Hello",
        }).then((err) => done());
      } else {
        //console.log("no");
        done();
      }
    });
  });
});

describe("Nont Sitter Update", () => {
  it("create a nont sitter first", (done) => {
    chai
      .request(app)
      .post("/NontSitters")
      .type("form")
      .send({
        email: "nontSitterTestUpdate@kojira.com",
        password: "testpassword",
        name: "Ghidora",
        phoneNumber: "0211111111",
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        NontSitter.findOne({ email: "nontSitterTestUpdate@kojira.com" }).then(
          (result) => {
            expect(result).to.not.be.null;
            done();
          }
        );
      });
  });
  it("It should login Nont Sitter", (done) => {
    chai
      .request(app)
      .post("/nontSitters/login")
      .type("form")
      .send({
        email: "nontSitterTestUpdate@kojira.com",
        password: "testpassword",
      })
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
  it("It should update the sitter", (done) => {
    NontSitter.findOne({ email: "nontSitterTestUpdate@kojira.com" }).then(
      (result) => {
        id = result._id;
        chai
          .request(app)
          .patch("/NontSitters")
          .set({ Authorization: "Bearer " + SitterToken })
          .send({
            _id: id.toString(),
            name: "Hello",
          })
          .end((err, res) => {
            console.log(res.text);
            expect(res).to.have.status(200);
            chai
              .request(app)
              .get("/NontSitters/" + id)
              .end((err, res) => {
                expect(res.body.name).to.equal("Hello");
                done();
              });
          });
      }
    );
  });
  it("It should verify the invalid email", (done) => {
    NontSitter.findOne({ email: "nontSitterTestUpdate@kojira.com" }).then(
      (result) => {
        id = result._id;
        chai
          .request(app)
          .patch("/NontSitters")
          .set({ Authorization: "Bearer " + SitterToken })
          .send({
            _id: id.toString(),
            email: "Hello.com",
          })
          .end((err, res) => {
            expect(res).to.have.status(400);
            done();
          });
      }
    );
  });
  it("It should know that the email already exists", (done) => {
    NontSitter.findOne({ email: "nontSitterTestUpdate@kojira.com" }).then(
      (result) => {
        id = result._id;
        chai
          .request(app)
          .patch("/NontSitters")
          .set({ Authorization: "Bearer " + SitterToken })
          .send({
            _id: id.toString(),
            email: "nontSitterTestUpdate@kojira.com",
          })
          .end((err, res) => {
            expect(res).to.have.status(403);
            done();
          });
      }
    );
  });
});

describe("Clear Up", () => {
  it("Clear up", (done) => {
    NontSitter.deleteOne({ email: "nontSitterTestUpdate@kojira.com" }).then(
      (result) => {
        NontSitter.findOne({ _id: id }).then(
          (result2) => {
            expect(result2).to.be.null;
            done()
          }
        )
      }
    );
  });
});

describe("It should not update the user that is not existed", () => {
  it("It should know that the user is not found", (done) => {
    chai
      .request(app)
      .patch("/NontSitters")
      .set({ Authorization: "Bearer " + SitterToken })
      .send({
        _id: id.toString(),
        email: "nontSitterTestUpdate2@kojira.com",
      })
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});
