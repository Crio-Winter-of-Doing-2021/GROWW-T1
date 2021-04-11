const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const baseUrl = "http://localhost:8080";
chai.use(chaiHttp);
describe("Server-run Test", function () {
  it("server is live", function (done) {
    chai
      .request(baseUrl)
      .get("/")
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.text).to.equal("Hello from the profile backend!");
        done();
      });
  });
});
describe("Website-backend Test", function () {
  var user = {
    name: "Lia",
    phone_number: "9434241404",
    email: "Brrr@gmail.com",
    kyc_status: "done",
    kyc_details: { pan: "67zAe5tgz1010" },
  };
  it("get orders list for a user present in db", function (done) {
    chai
      .request(baseUrl)
      .get("/orders/" + user.name)
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        expect(res.body[0]).to.be.an("Object");
        expect(res.body[0]).to.have.keys([
          "productName",
          "units",
          "costs",
          "order_id",
          "order_status",
          "total",
        ]);
        done();
      });
  });
  var absentuser = "Anonymous";
  it("Show error for fetching order-list of user not present in db", function (done) {
    chai
      .request(baseUrl)
      .get("/orders/" + absentuser)
      .end(function (err, res) {
        expect(res).to.have.status(404);
        expect(res.text).to.equal("User not found!");
        done();
      });
  });
  it("get the user profile", function (done) {
    chai
      .request(baseUrl)
      .get("/profile/" + user.name)
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("Object");
        expect(res.body).to.eql(user);
        done();
      });
  });
  var pdt = {
    product_id: 4,
    product_name: "UPL",
    Stock_price: "₹607.55",
    About:
      "UPL Ltd. is in Pesticides &amp; Agrochemicals. It was incorporated in year 1985. The current market capitalisation stands ₹48,107 Cr. The company is listed on the Bombay Stock Exchange (BSE) with the BSE code as 512070. and also listed on National Stock Exchange (NSE) with NSE code as UPL.",
    questions: ["Why UPL is rising?"],
    answers: [
      "Stock is rising and might rise more. Stock is getting in over sold or over bought zones very quickly. A short reversal can happen anytime. Stock of Upl (UPL) is trading above an important moving average line, and it has been above this line for quite some time now.",
    ],
    graph: "/Images/upl.png",
    image:
      "https://assets-netstorage.groww.in/stock-assets/logos/INE628A01036.png",
  };
  it("get product listing for a specific page", function (done) {
    chai
      .request(baseUrl)
      .get("/us_stocks")
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body[0]).to.include.key("page");
        done();
      });
  });
  it("get product info for a specific product-id", function (done) {
    chai
      .request(baseUrl)
      .get("/stocks/" + pdt.product_id)
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body.product_id).to.eql(pdt.product_id);
        expect(res.body.product_name).to.eql(pdt.product_name);
        expect(res.body.about).to.eql(pdt.about);
        done();
      });
  });
  var orderbody = { productName: ["Walt Disney Company"], units: [12] };
  it("add order for a user with kyc done", function (done) {
    chai
      .request(baseUrl)
      .post("/orders/" + user.name)
      .send(orderbody)
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.text).to.equal("Order successfully placed");
        done();
      });
  });
});
