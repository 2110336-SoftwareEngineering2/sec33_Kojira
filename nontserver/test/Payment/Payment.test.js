let app = require("../../app");
let chai = require("chai");
let chaiHttp = require("chai-http");
const Reservation = require("../../Models/Reservation");
const Room = require("../../Models/Room");

chai.use(chaiHttp);

const expect = chai.expect;

var roomID = null;
var reservationID = null;
var shelterID = "60880e49e74d024804a0b15b";
var ownerID = "606dd36c1ed2dd002289cf30";
var sitterID = "603098f7a19e174c20d33cd9";
var nontID = "606dd3d21ed2dd002289cf31";

// shelter test 2
// น้องแมว
describe("Start Condition for Payment", () => {
    it("Create room", (done) => {
        // chai
        //     .request(app)
        //     .post("/room")
        //     .type("form")
        //     .send({
        //         name: "roomTest",
        //         amount: 2,
        //         price: 100,
        //         nont_type: "cat",
        //         shelter_id: shelterID
        //     })
        //     .end((err, res) => {
        //         expect(res).to.have.status(200);
        //         roomID = res.body._id;
        //         done();
        //     })
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
    it("Create reservation", (done) => {
        var now = new Date();
        var tomorrow = new Date();
        tomorrow.setDate(new Date().getDate()+1);
        // chai
        //     .request(app)
        //     .post("/reservation/create")
        //     .type("form")
        //     .send({
        //         nont_id: nontID,
        //         room_id: roomID,
        //         start_datetime: startDate,
        //         end_datetime: endDate,
        //         price: 100
        //     })
        //     .end((err, res) => {
        //         expect(res).to.have.status(200);
        //         reservationID = res.body._id;
        //         done();
        //     })
        var body = {
            nont_id: nontID,
            nontowner_id: ownerID,
            room_id: roomID,
            shelter_id: shelterID,
            nontsitter_id: sitterID,
            start_datetime: tomorrow.toString(),
            end_datetime: tomorrow.toString(),
            price: 100,
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

describe("Make a payment via QR code", () => {
    it("Payment should be successful if code is matched", (done) => {
        chai
            .request(app)
            .get("/payment/QR")
            .query({
                reserveId: String(reservationID),
                code: ""
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
                code: ""
            })
            .end((err, res) => {
                expect(res).to.have.status(500);
                expect(res.text).to.equal("unexpected error");
                done();
            })
    });
})

describe("Clear Up for Payment", () => {
    it("Clear up", (done) => {
        Reservation.findByIdAndDelete(reservationID).then(
            Room.findByIdAndDelete(roomID).then(
                done()
            )
        )
    })
});