let app = require("../../app");
let chai = require("chai");
let chaiHttp = require("chai-http");
const NontSitter = require("../../Models/NontSitter");

chai.use(chaiHttp);

const expect = chai.expect;

var id;

describe("Start Condition", () => {
  it("Clear the database if there is a nont sitter with email 'nontSitterTestUpdate@kojira.com'", (done) => {
    NontSitter.findOne({ email: "nontSitterTestUpdate@kojira.com" }).then(
      (result) => {
        if (result) {
          NontSitter.deleteOne({
            email: "nontSitterTestUpdate@kojira.com",
          }).then(
            NontSitter.findOne({
              email: "nontSitterTestUpdate@kojira.com",
            }).then((result) => {
              expect(result).to.be.null;
              done();
            })
          );
        } else {
          done();
        }
      }
    );
  });
  it("Clear the database if there is a nont sitter with name 'Hello'", (done) => {
    NontSitter.findOne({ name: "Hello" }).then((result) => {
      if (result) {
        NontSitter.deleteOne({
          name: "Hello",
        }).then(
          NontSitter.findOne({
            name: "Hello",
          }).then((result) => {
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

describe("Nont Sitter Create", () => {
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
      .send({
        _id: id.toString(),
        email: "nontSitterTestUpdate2@kojira.com",
      })
      .end((err, res) => {
        console.log(res.body)
        expect(res).to.have.status(404);
        done();
      });
  });
});
