const app = require("../../app");
const chai = require("chai");
const chaiHttp = require("chai-http");
const NontOwner = require("../../Models/NontOwner");

const expect = chai.expect;
chai.use(chaiHttp);

let nontOwnerToken = null;

describe("Start Condition", () => {
  it("Clear the database if there is a nont owner with email 'nontOwnerTest@kojira.com'", (done) => {
    NontOwner.findOne({ email: "nontOwnerTest@kojira.com" }).then((result) => {
      if (result) {
        NontOwner.deleteOne({ email: "nontOwnerTest@kojira.com" }).then(
          NontOwner.findOne({ email: "nontOwnerTest@kojira.com" }).then(
            (result) => {
              expect(result).to.be.null;
              done();
            }
          )
        );
      } else {
        done();
      }
    });
  });

  it("It should create nont owner", (done) => {
    chai
      .request(app)
      .post("/NontOwners")
      .type("form")
      .send({
        email: "nontOwnerTest@kojira.com",
        password: "testpassword",
        name: "Kojira",
        phoneNumber: "0111111111",
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it("It should login Nont Owner", (done) => {
    chai
      .request(app)
      .post("/nontOwners/login")
      .type("form")
      .send({ email: "nontOwnerTest@kojira.com", password: "testpassword" })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.token).to.not.be.null;
        nontOwnerToken = res.body.token;
        expect(res.body.userType).to.equal("Nont Owner");
        expect(res.body.login).to.be.true;
        expect(err).to.be.null;
        done();
      });
  });
});

describe("Find Shelter", () => {
  it("TC1-1 It should output the list of all shelters when no query sent", (done) => {
    chai
      .request(app)
      .get("/shelter/findShelters")
      .set({ Authorization: "Bearer " + nontOwnerToken })
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
      .set({ Authorization: "Bearer " + nontOwnerToken })
      .query({
        minRate: "three",
      })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.text).to.equal("Invalid minRate");
        done();
      });
  });

  it("TC1-3 It should send an error when minRate < 0", (done) => {
    chai
      .request(app)
      .get("/shelter/findShelters")
      .set({ Authorization: "Bearer " + nontOwnerToken })
      .query({
        minRate: "-0.1",
      })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.text).to.equal("Invalid minRate");
        done();
      });
  });

  it("TC1-4 It should send an error when minRate > 5", (done) => {
    chai
      .request(app)
      .get("/shelter/findShelters")
      .set({ Authorization: "Bearer " + nontOwnerToken })
      .query({
        minRate: "5.1",
      })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.text).to.equal("Invalid minRate");
        done();
      });
  });

  it("TC1-5 It should send an error when maxDistance is NaN", (done) => {
    chai
      .request(app)
      .get("/shelter/findShelters")
      .set({ Authorization: "Bearer " + nontOwnerToken })
      .query({
        maxDistance: "InAGalaxyFarFarAway",
      })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.text).to.equal("Invalid maxDistance");
        done();
      });
  });

  it("TC1-6 It should send an error when maxDistance < 0", (done) => {
    chai
      .request(app)
      .get("/shelter/findShelters")
      .set({ Authorization: "Bearer " + nontOwnerToken })
      .query({
        maxDistance: "-0.1",
      })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.text).to.equal("Invalid maxDistance");
        done();
      });
  });

  it("TC1-7 It should send an error when maxDistance > 100", (done) => {
    chai
      .request(app)
      .get("/shelter/findShelters")
      .set({ Authorization: "Bearer " + nontOwnerToken })
      .query({
        maxDistance: "100.1",
      })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.text).to.equal("Invalid maxDistance");
        done();
      });
  });

  it("TC1-8 It should send an error when nontAmount is NaN", (done) => {
    chai
      .request(app)
      .get("/shelter/findShelters")
      .set({ Authorization: "Bearer " + nontOwnerToken })
      .query({
        nontAmount: "two",
      })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.text).to.equal("Invalid nontAmount");
        done();
      });
  });

  it("TC1-9 It should send an error when nontAmont < 0", (done) => {
    chai
      .request(app)
      .get("/shelter/findShelters")
      .set({ Authorization: "Bearer " + nontOwnerToken })
      .query({
        nontAmount: "-1",
      })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.text).to.equal("Invalid nontAmount");
        done();
      });
  });

  it("TC1-10 It should send an error when nontAmont > 20", (done) => {
    chai
      .request(app)
      .get("/shelter/findShelters")
      .set({ Authorization: "Bearer " + nontOwnerToken })
      .query({
        nontAmount: "21",
      })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.text).to.equal("Invalid nontAmount");
        done();
      });
  });

  it("TC1-11 It should send an error when maxPrice is NaN", (done) => {
    chai
      .request(app)
      .get("/shelter/findShelters")
      .set({ Authorization: "Bearer " + nontOwnerToken })
      .query({
        maxPrice: "ShutUpAndTakeMyMoney",
      })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.text).to.equal("Invalid maxPrice");
        done();
      });
  });

  it("TC1-12 It should send an error when maxPrice < 0", (done) => {
    chai
      .request(app)
      .get("/shelter/findShelters")
      .set({ Authorization: "Bearer " + nontOwnerToken })
      .query({
        maxPrice: "-0.50",
      })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.text).to.equal("Invalid maxPrice");
        done();
      });
  });

  it("TC1-13 It should send an error when maxPrice > 3000", (done) => {
    chai
      .request(app)
      .get("/shelter/findShelters")
      .set({ Authorization: "Bearer " + nontOwnerToken })
      .query({
        maxPrice: "3001",
      })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.text).to.equal("Invalid maxPrice");
        done();
      });
  });

  it("TC1-14 It should send an error when startDate is not in the format", (done) => {
    chai
      .request(app)
      .get("/shelter/findShelters")
      .set({ Authorization: "Bearer " + nontOwnerToken })
      .query({
        startDate: "20XX-01-01",
        endDate: "2022-02-02",
      })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.text).to.equal("Invalid startDate");
        done();
      });
  });

  it("TC1-15 It should send an error when month = 0 (startDate)", (done) => {
    chai
      .request(app)
      .get("/shelter/findShelters")
      .set({ Authorization: "Bearer " + nontOwnerToken })
      .query({
        startDate: "2022-00-01",
        endDate: "2022-02-02",
      })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.text).to.equal("Invalid startDate");
        done();
      });
  });

  it("TC1-16 It should send an error when month > 12 (startDate)", (done) => {
    chai
      .request(app)
      .get("/shelter/findShelters")
      .set({ Authorization: "Bearer " + nontOwnerToken })
      .query({
        startDate: "2022-13-01",
        endDate: "2022-02-02",
      })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.text).to.equal("Invalid startDate");
        done();
      });
  });

  it("TC1-17 It should send an error when day = 0 (startDate)", (done) => {
    chai
      .request(app)
      .get("/shelter/findShelters")
      .set({ Authorization: "Bearer " + nontOwnerToken })
      .query({
        startDate: "2022-01-00",
        endDate: "2022-02-02",
      })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.text).to.equal("Invalid startDate");
        done();
      });
  });

  it("TC1-18 It should send an error when day > 31 if month = 1, 3, 5, 7, 8, 10, or 12 (startDate)", (done) => {
    chai
      .request(app)
      .get("/shelter/findShelters")
      .set({ Authorization: "Bearer " + nontOwnerToken })
      .query({
        startDate: "2022-01-32",
        endDate: "2022-02-02",
      })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.text).to.equal("Invalid startDate");
        done();
      });
  });

  it("TC1-19 It should send an error when day > 30 if month = 4, 6, 9, or 11 (startDate)", (done) => {
    chai
      .request(app)
      .get("/shelter/findShelters")
      .set({ Authorization: "Bearer " + nontOwnerToken })
      .query({
        startDate: "2022-04-31",
        endDate: "2022-06-01",
      })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.text).to.equal("Invalid startDate");
        done();
      });
  });

  it("TC1-20 It should send an error when day > 28 if month = 2 and year % 4 != 0 (startDate)", (done) => {
    chai
      .request(app)
      .get("/shelter/findShelters")
      .set({ Authorization: "Bearer " + nontOwnerToken })
      .query({
        startDate: "2022-02-29",
        endDate: "2022-04-01",
      })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.text).to.equal("Invalid startDate");
        done();
      });
  });

  it("TC1-21 It should send an error when day > 29 if month = 2 and year % 4 == 0 and year % 100 != 0 (startDate)", (done) => {
    chai
      .request(app)
      .get("/shelter/findShelters")
      .set({ Authorization: "Bearer " + nontOwnerToken })
      .query({
        startDate: "2024-02-30",
        endDate: "2024-04-01",
      })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.text).to.equal("Invalid startDate");
        done();
      });
  });

  it("TC1-22 It should send an error when day > 28 if month = 2 and year % 4 == 0 and year % 100 == 0 and year % 400 != 0 (startDate)", (done) => {
    chai
      .request(app)
      .get("/shelter/findShelters")
      .set({ Authorization: "Bearer " + nontOwnerToken })
      .query({
        startDate: "2100-02-29",
        endDate: "2100-04-01",
      })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.text).to.equal("Invalid startDate");
        done();
      });
  });

  it("TC1-23 It should send an error when day > 28 if month = 2 and year % 4 == 0 and year % 100 == 0 and year % 400 == 0 (startDate)", (done) => {
    chai
      .request(app)
      .get("/shelter/findShelters")
      .set({ Authorization: "Bearer " + nontOwnerToken })
      .query({
        startDate: "2400-02-30",
        endDate: "2400-04-01",
      })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.text).to.equal("Invalid startDate");
        done();
      });
  });

  it("TC1-24 It should send an error when endDate is not in the format", (done) => {
    chai
      .request(app)
      .get("/shelter/findShelters")
      .set({ Authorization: "Bearer " + nontOwnerToken })
      .query({
        startDate: "2022-01-01",
        endDate: "2022-02-XX",
      })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.text).to.equal("Invalid endDate");
        done();
      });
  });

  it("TC1-25 It should send an error when month = 0 (endDate)", (done) => {
    chai
      .request(app)
      .get("/shelter/findShelters")
      .set({ Authorization: "Bearer " + nontOwnerToken })
      .query({
        startDate: "2022-01-01",
        endDate: "2023-00-01",
      })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.text).to.equal("Invalid endDate");
        done();
      });
  });

  it("TC1-26 It should send an error when month > 12 (endDate)", (done) => {
    chai
      .request(app)
      .get("/shelter/findShelters")
      .set({ Authorization: "Bearer " + nontOwnerToken })
      .query({
        startDate: "2022-01-01",
        endDate: "2023-13-01",
      })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.text).to.equal("Invalid endDate");
        done();
      });
  });

  it("TC1-27 It should send an error when day = 0 (endDate)", (done) => {
    chai
      .request(app)
      .get("/shelter/findShelters")
      .set({ Authorization: "Bearer " + nontOwnerToken })
      .query({
        startDate: "2022-01-01",
        endDate: "2023-01-00",
      })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.text).to.equal("Invalid endDate");
        done();
      });
  });

  it("TC1-28 It should send an error when day > 31 if month = 1, 3, 5, 7, 8, 10, or 12 (endDate)", (done) => {
    chai
      .request(app)
      .get("/shelter/findShelters")
      .set({ Authorization: "Bearer " + nontOwnerToken })
      .query({
        startDate: "2022-01-01",
        endDate: "2023-01-32",
      })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.text).to.equal("Invalid endDate");
        done();
      });
  });

  it("TC1-29 It should send an error when day > 30 if month = 4, 6, 9, or 11 (endDate)", (done) => {
    chai
      .request(app)
      .get("/shelter/findShelters")
      .set({ Authorization: "Bearer " + nontOwnerToken })
      .query({
        startDate: "2022-01-01",
        endDate: "2023-04-31",
      })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.text).to.equal("Invalid endDate");
        done();
      });
  });

  it("TC1-30 It should send an error when day > 28 if month = 2 and year % 4 != 0 (endDate)", (done) => {
    chai
      .request(app)
      .get("/shelter/findShelters")
      .set({ Authorization: "Bearer " + nontOwnerToken })
      .query({
        startDate: "2022-01-01",
        endDate: "2023-02-29",
      })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.text).to.equal("Invalid endDate");
        done();
      });
  });

  it("TC1-31 It should send an error when day > 29 if month = 2 and year % 4 == 0 and year % 100 != 0 (endDate)", (done) => {
    chai
      .request(app)
      .get("/shelter/findShelters")
      .set({ Authorization: "Bearer " + nontOwnerToken })
      .query({
        startDate: "2022-01-01",
        endDate: "2024-02-30",
      })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.text).to.equal("Invalid endDate");
        done();
      });
  });

  it("TC1-32 It should send an error when day > 28 if month = 2 and year % 4 == 0 and year % 100 == 0 and year % 400 != 0 (endDate)", (done) => {
    chai
      .request(app)
      .get("/shelter/findShelters")
      .set({ Authorization: "Bearer " + nontOwnerToken })
      .query({
        startDate: "2022-01-01",
        endDate: "2100-02-29",
      })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.text).to.equal("Invalid endDate");
        done();
      });
  });

  it("TC1-33 It should send an error when day > 28 if month = 2 and year % 4 == 0 and year % 100 == 0 and year % 400 == 0 (endDate)", (done) => {
    chai
      .request(app)
      .get("/shelter/findShelters")
      .set({ Authorization: "Bearer " + nontOwnerToken })
      .query({
        startDate: "2022-01-01",
        endDate: "2400-02-30",
      })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.text).to.equal("Invalid endDate");
        done();
      });
  });

  it("TC1-34 It should send an error when position is not in the format", (done) => {
    chai
      .request(app)
      .get("/shelter/findShelters")
      .set({ Authorization: "Bearer " + nontOwnerToken })
      .query({
        position: "112",
      })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.text).to.equal("Invalid position");
        done();
      });
  });

  it("TC1-35 It should send an error when latitude < -90", (done) => {
    chai
      .request(app)
      .get("/shelter/findShelters")
      .set({ Authorization: "Bearer " + nontOwnerToken })
      .query({
        position: "-91,0",
      })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.text).to.equal("Invalid position");
        done();
      });
  });

  it("TC1-36 It should send an error when latitude > 90", (done) => {
    chai
      .request(app)
      .get("/shelter/findShelters")
      .set({ Authorization: "Bearer " + nontOwnerToken })
      .query({
        position: "91,0",
      })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.text).to.equal("Invalid position");
        done();
      });
  });

  it("TC1-37 It should send an error when longitude < -180", (done) => {
    chai
      .request(app)
      .get("/shelter/findShelters")
      .set({ Authorization: "Bearer " + nontOwnerToken })
      .query({
        position: "0,-181",
      })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.text).to.equal("Invalid position");
        done();
      });
  });

  it("TC1-38 It should send an error when longitude > 180", (done) => {
    chai
      .request(app)
      .get("/shelter/findShelters")
      .set({ Authorization: "Bearer " + nontOwnerToken })
      .query({
        position: "0,181",
      })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.text).to.equal("Invalid position");
        done();
      });
  });

  it("TC1-39 It should send an error when supported_type is not supported", (done) => {
    chai
      .request(app)
      .get("/shelter/findShelters")
      .set({ Authorization: "Bearer " + nontOwnerToken })
      .query({
        supported_type: "varanus",
      })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.text).to.equal("Invalid supported_type");
        done();
      });
  });

  it("TC1-40 It should not send an error when sortedBy is not supported", (done) => {
    chai
      .request(app)
      .get("/shelter/findShelters")
      .set({ Authorization: "Bearer " + nontOwnerToken })
      .query({
        sortedBy: "HowCoolYouAre",
      })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      });
  });

  it("TC1-41 It should output the list of shelters", (done) => {
    chai
      .request(app)
      .get("/shelter/findShelters")
      .set({ Authorization: "Bearer " + nontOwnerToken })
      .query({
        keywords: "",
        minRate: "0",
        maxDistance: "100",
        nontAmount: "1",
        maxPrice: "3000",
        startDate: "2022-04-30",
        endDate: "2400-02-29",
        position: "0,0",
        sortedBy: "distance",
      })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      });
  });

  it("TC1-42 It should output the list of shelters", (done) => {
    chai
      .request(app)
      .get("/shelter/findShelters?supported_type=cat&supported_type=hamster")
      .set({ Authorization: "Bearer " + nontOwnerToken })
      .query({
        keywords: "love",
        minRate: "5",
        maxDistance: "0",
        nontAmount: "20",
        maxPrice: "0",
        startDate: "2100-02-28",
        endDate: "2200-02-28",
        position: "-90,-180",
        sortedBy: "name",
      })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      });
  });

  it("TC1-43 It should output the list of shelters", (done) => {
    chai
      .request(app)
      .get("/shelter/findShelters")
      .set({ Authorization: "Bearer " + nontOwnerToken })
      .query({
        startDate: "2400-02-29",
        endDate: "2404-02-29",
        position: "90,180",
      })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      });
  });

  it("TC1-44 It should output the list of shelters", (done) => {
    chai
      .request(app)
      .get("/shelter/findShelters")
      .set({ Authorization: "Bearer " + nontOwnerToken })
      .query({
        startDate: "2023-02-28",
        endDate: "2023-03-01",
      })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      });
  });

  it("TC1-45 It should output the list of shelters", (done) => {
    chai
      .request(app)
      .get("/shelter/findShelters")
      .set({ Authorization: "Bearer " + nontOwnerToken })
      .query({
        startDate: "2024-02-29",
        endDate: "2024-04-30",
      })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      });
  });

  it("TC1-46 It should output the list of shelters", (done) => {
    chai
      .request(app)
      .get("/shelter/findShelters")
      .set({ Authorization: "Bearer " + nontOwnerToken })
      .query({
        startDate: "2022-02-26",
        endDate: "2022-02-28",
      })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe("Clear Up", () => {
  it("Clear up", async () => {
    await NontOwner.deleteOne({ email: "nontOwnerTest@kojira.com" });
  });
});
