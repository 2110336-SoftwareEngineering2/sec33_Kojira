let app = require("../../app");
let chai = require("chai");
let chaiHttp = require("chai-http");
const Reservation = require("../../Models/Reservation");
const Room = require("../../Models/Room");
const Shelters = require("../../Models/Shelters");
const Nont = require("../../Models/Nont");
const NontOwner = require("../../Models/NontOwner");
const NontSitter = require("../../Models/NontSitter");

chai.use(chaiHttp);

const expect = chai.expect;

var roomID = null;
var reservationID = null;
var ownerToken = null;
var qrcode = null;
var shelterID = null;
var ownerID = null;
var sitterID = null;
var nontID = null;
var ownerEmail = "testPaymentOwner@kojira.com";
var sitterEmail = "testPaymentSitter@kojira.com";
var pwd = "testpassword";

describe("Start User Condition for Payment", () => {
    it("Clear the database if there is a nont sitter with email 'testPaymentSitter@kojira.com'", (done) => {
        NontSitter.findOne({ email: sitterEmail }).then((result) => {
            if (result) {
                NontSitter.deleteOne({ email: sitterEmail }).then(
                    NontSitter.findOne({ email: sitterEmail }).then(
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
    it("It should create nont sitter", (done) => {
        chai
            .request(app)
            .post("/NontSitters")
            .type("form")
            .send({
                email: sitterEmail,
                password: pwd,
                name: "Kojira Payment",
                phoneNumber: "0111111111",
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });
    it("It should get SitterID from email 'testPaymentSitter@kojira.com'", (done) => {
        NontSitter.findOne({ email: sitterEmail }).then((result) => {
            sitterID = result._id;
            done();
        })
    })
    it("Clear the database if there is a nont owner with email 'testPaymentOwner@kojira.com'", (done) => {
      NontOwner.findOne({ email: ownerEmail }).then((result) => {
        if (result) {
          NontOwner.deleteOne({ email: ownerEmail }).then(
            NontOwner.findOne({ email: ownerEmail }).then(
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
            email: ownerEmail,
            password: pwd,
            name: "Kojira Payment",
            phoneNumber: "0111111111",
        })
        .end((err, res) => {
            expect(res).to.have.status(200);
            done();
        });
    });
    it("It should login NontOwner", (done) => {
        chai
          .request(app)
          .post("/NontOwners/login")
          .type("form")
          .send({ 
              email: ownerEmail, 
              password: pwd 
          })
          .end((err, res) => {
              expect(res).to.have.status(200);
              expect(res.body.token).to.not.be.null;
              expect(res.body.userType).to.equal("Nont Owner");
              ownerToken = res.body.token;
              expect(res.body.login).to.be.true;
              expect(err).to.be.null;
              done();
          });
      });
    it("It should get OwnerID from email 'testPaymentOwner@kojira.com'", (done) => {
        NontOwner.findOne({ email: ownerEmail }).then((result) => {
            ownerID = result._id;
            done();
        })
    })
})

describe("Start other Conditions for Payment", () => {
    it("Create shelter", (done) => {
        var body = {
            name: "shelterTestPayment",
            address: "abcd",
            coordinate: {lat:1,lng:1},
            rate: 0,
            nont_sitter_id: sitterID,
            exist: true
        }
        Shelters.create(body).then((res) => {
            shelterID = res._id
            done();
        })
    })
    it("Create room", (done) => {
        var body = {
            name: "roomTest",
            amount: 2,
            price: 100,
            nont_type: "cat",
            shelter_id: shelterID,
            exist: true
        }
        Room.create(body).then((res) => {
            roomID = res._id
            done();
        })
    })
    it("Create nont", (done) => {
        var now = new Date();
        var body = {
            name: "NongTest",
            type: "cat",
            nontowner_id: ownerID,
            birth_date: now.toString(),
            exist: true
        }
        Nont.create(body).then((res) => {
            nontID = res._id
            done();
        })
    })
    it("Create reservation", (done) => {
        var now = new Date();
        var tomorrow = new Date();
        tomorrow.setDate(new Date().getDate()+1);
        var body = {
            nont_id: nontID,
            nontowner_id: ownerID,
            room_id: roomID,
            shelter_id: shelterID,
            nontsitter_id: sitterID,
            start_datetime: tomorrow.toString(),
            end_datetime: tomorrow.toString(),
            price: 123,
            status: 'payment-pending',
            nontsitter_check_in: false,
            nontsitter_check_out: false,
            nontowner_check_in: false,
            nontowner_check_out: false,
            reserve_datetime: now.toString(),
            pay_datetime: '',
            check_in_datetime: '',
            check_out_datetime: '',
            cancel_datetime: ''
        }
        Reservation.create(body).then((res) => {
            reservationID = res._id
            done()
        })
    })
})

describe("Get code", () => {
    it("It should get code if NontOwner login", (done) => {
        chai
            .request(app)
            .post("/payment/getCode")
            .set({ Authorization: "Bearer " + ownerToken })
            .type("form")
            .end((err, res) => {
                expect(res).to.have.status(200);
                qrcode = res.body.code;
                done();
            })
    })
})

describe("Make a payment via QR code", () => {
    it("Payment should be successful if code is matched", (done) => {
        chai
            .request(app)
            .get("/payment/QR")
            .query({
                reserveId: String(reservationID),
                code: String(qrcode)
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.text).to.equal("payment finished");
                done();
            })
    });
    it("Payment should not be successful if code is not matched", (done) => {
        chai
            .request(app)
            .get("/payment/QR")
            .query({
                reserveId: String(reservationID),
                code: "abcd"
            })
            .end((err, res) => {
                expect(res).to.have.status(401);
                expect(res.text).to.equal("code not match");
                done();
            })
    });
    it("Payment should not be successful if reservationId is wrong", (done) => {
        chai
            .request(app)
            .get("/payment/QR")
            .query({
                reserveId: "1234",
                code: String(qrcode)
            })
            .end((err, res) => {
                expect(res).to.have.status(500);
                expect(res.text).to.equal("can't make payment becaue reserve id not found");
                done();
            })
    });
})

describe("Clear Up for Payment", () => {
    it("Clear up", async () => { 
        await Reservation.findByIdAndDelete(reservationID)
        await Room.findByIdAndDelete(roomID)
        await Shelters.findByIdAndDelete(shelterID)
        await NontSitter.findByIdAndDelete(sitterID)
        await Nont.findByIdAndDelete(nontID)
        await NontOwner.findByIdAndDelete(ownerID)
    })
});