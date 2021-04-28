let app = require("../../app");
let chai = require("chai");
let chaiHttp = require("chai-http");
const NontOwner = require("../../Models/NontOwner");

chai.use(chaiHttp);

const expect = chai.expect;

var id;
var OwnerToken;

describe("Start Condition", () => {
  it("Clear the database if there is a nont owner with email 'nontOwnerTestUpdate@kojira.com'", (done) => {
    NontOwner.findOne({ email: "nontOwnerTestUpdate@kojira.com" }).then(
      (result) => {
        if (result) {
          NontOwner.deleteOne({
            email: "nontOwnerTestUpdate@kojira.com",
          }).then((err) => done());
        } else {
          done();
        }
      }
    );
  });
  it("Clear the database if there is a nont owner with name 'Hello'", (done) => {
    NontOwner.findOne({ name: "Hello" }).then((result) => {
      if (result) {
        NontOwner.deleteOne({
          name: "Hello",
        }).then((err) => done());
      } else {
        done();
      }
    });
  });
  it("Clear the database if there is a nont owner with name 'Ghidora'", (done) => {
    NontOwner.findOne({ name: "Ghidora" }).then((result) => {
      if (result) {
        NontOwner.deleteOne({ name: "Ghidora" }).then((err) => done());
      } else {
        done();
      }
    });
  });
});

describe("Nont Owner Update", () => {
  it("create a nont owner first", (done) => {
    chai
      .request(app)
      .post("/NontOwners")
      .type("form")
      .send({
        email: "nontOwnerTestUpdate@kojira.com",
        password: "testpassword",
        name: "Ghidora",
        phoneNumber: "0211111111",
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        NontOwner.findOne({ email: "nontOwnerTestUpdate@kojira.com" }).then(
          (result) => {
            expect(result).to.not.be.null;
            done();
          }
        );
      });
  });
  it("It should login Nont Owner", (done) => {
    chai
      .request(app)
      .post("/nontOwners/login")
      .type("form")
      .send({
        email: "nontOwnerTestUpdate@kojira.com",
        password: "testpassword",
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.token).to.not.be.null;
        OwnerToken = res.body.token;
        expect(res.body.userType).to.equal("Nont Owner");
        expect(res.body.login).to.be.true;
        expect(err).to.be.null;
        done();
      });
  });
  it("TC2-46: It should update the owner", (done) => {
    NontOwner.findOne({ email: "nontOwnerTestUpdate@kojira.com" }).then(
      (result) => {
        const id = result._id;
        chai
          .request(app)
          .patch("/NontOwners")
          .set({ Authorization: "Bearer " + OwnerToken })
          .send({
            _id: id.toString(),
            name: "Hello",
          })
          .end((err, res) => {
            expect(res).to.have.status(200);
            chai
              .request(app)
              .get("/NontOwners/" + id)
              .end((err, res) => {
                expect(res.body.name).to.equal("Hello");
                done();
              });
          });
      }
    );
  });
  it("TC2-47: It should verify the invalid email", (done) => {
    NontOwner.findOne({ email: "nontOwnerTestUpdate@kojira.com" }).then(
      (result) => {
        id = result._id;
        chai
          .request(app)
          .patch("/NontOwners")
          .set({ Authorization: "Bearer " + OwnerToken })
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
  it("TC2-48: It should know that the email already exists", (done) => {
    NontOwner.findOne({ email: "nontOwnerTestUpdate@kojira.com" }).then(
      (result) => {
        id = result._id;
        chai
          .request(app)
          .patch("/NontOwners")
          .set({ Authorization: "Bearer " + OwnerToken })
          .send({
            _id: id.toString(),
            email: "nontOwnerTestUpdate@kojira.com",
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
    NontOwner.deleteOne({
      email: "nontOwnerTestUpdate@kojira.com",
    }).then((err) => done());
  });
});

describe("TC2-49: It should not update the user that is not existed", (done) => {
  it("It should know that the user is not found", (done) => {
    chai
      .request(app)
      .patch("/NontOwners")
      .set({ Authorization: "Bearer " + OwnerToken })
      .send({
        _id: id.toString(),
        email: "nontOwnerTestUpdate2@kojira.com",
      })
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});
