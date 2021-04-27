const app = require("../../app");
const chai = require("chai");
const chaiHttp = require("chai-http");

const expect = chai.expect;
chai.use(chaiHttp);

describe("Find Shelter", () => {
  it("TC1-1 It should output the list of all shelters when no query sent", (done) => {
    chai
      .request(app)
      .get("/shelter/findShelters")
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      });
  });

  it("TC1-2 It should send an error when minRate is NaN", (done) => {
    chai
      .request(app)
      .get("/shelter/findShelters")
      .query({
        minRate: "three",
      })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.text).to.equal('Invalid minRate');
        done();
      });
  });

  it("TC1-3 It should send an error when minRate < 0", (done) => {
    chai
      .request(app)
      .get("/shelter/findShelters")
      .query({
        minRate: "-0.1",
      })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.text).to.equal('Invalid minRate');
        done();
      });
  });

  it("TC1-4 It should send an error when minRate > 5", (done) => {
    chai
      .request(app)
      .get("/shelter/findShelters")
      .query({
        minRate: "5.1",
      })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.text).to.equal('Invalid minRate');
        done();
      });
  });

  it("TC1-5 It should send an error when maxDistance is NaN", (done) => {
    chai
      .request(app)
      .get("/shelter/findShelters")
      .query({
        maxDistance: "InAGalaxyFarFarAway"
      })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.text).to.equal('Invalid maxDistance');
        done();
      });
  });

  it("TC1-6 It should send an error when maxDistance < 0", (done) => {
    chai
      .request(app)
      .get("/shelter/findShelters")
      .query({
        maxDistance: "-0.1"
      })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.text).to.equal('Invalid maxDistance');
        done();
      });
  });

  it("TC1-7 It should send an error when maxDistance > 100", (done) => {
    chai
      .request(app)
      .get("/shelter/findShelters")
      .query({
        maxDistance: "100.1"
      })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.text).to.equal('Invalid maxDistance');
        done();
      });
  });

  it("TC1-8 It should send an error when nontAmount is NaN", (done) => {
    chai
      .request(app)
      .get("/shelter/findShelters")
      .query({
        nontAmount: "two"
      })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.text).to.equal('Invalid nontAmount');
        done();
      });
  });

  it("TC1-9 It should send an error when nontAmont < 0", (done) => {
    chai
      .request(app)
      .get("/shelter/findShelters")
      .query({
        nontAmount: "-1"
      })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.text).to.equal('Invalid nontAmount');
        done();
      });
  });

  it("TC1-10 It should send an error when nontAmont > 20", (done) => {
    chai
      .request(app)
      .get("/shelter/findShelters")
      .query({
        nontAmount: "21"
      })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.text).to.equal('Invalid nontAmount');
        done();
      });
  });

  it("TC1-11 It should send an error when maxPrice is NaN", (done) => {
    chai
      .request(app)
      .get("/shelter/findShelters")
      .query({
        maxPrice: "ShutUpAndTakeMyMoney"
      })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.text).to.equal('Invalid maxPrice');
        done();
      });
  });

  it("TC1-12 It should send an error when maxPrice < 0", (done) => {
    chai
      .request(app)
      .get("/shelter/findShelters")
      .query({
        maxPrice: "-0.50"
      })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.text).to.equal('Invalid maxPrice');
        done();
      });
  });

  it("TC1-13 It should send an error when maxPrice > 3000", (done) => {
    chai
      .request(app)
      .get("/shelter/findShelters")
      .query({
        maxPrice: "3001"
      })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.text).to.equal('Invalid maxPrice');
        done();
      });
  });

});
