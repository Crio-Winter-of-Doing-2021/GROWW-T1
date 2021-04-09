const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const baseUrl = "http://localhost:8000";
chai.use(chaiHttp);
describe("Chatbot-server-run Test", function () {
  it("Server is live", function (done) {
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
describe("Chatbot-functionality Test", function () {
  var gold_subsections = {
    id: "question",
    options: [
      { value: 1, label: "About Digital Gold", trigger: "qs0" },
      { value: 2, label: "Buying Gold", trigger: "qs1" },
      { value: 3, label: "Selling Gold", trigger: "qs2" },
      { value: 4, label: "Gold Storage and Insurance", trigger: "qs3" },
    ],
  };
  var status1 = { kyc_status: "done" },
    status2 = { kyc_status: "not done" };
  var pagename = "gold";
  it("get faq_steps for a page", function (done) {
    chai
      .request(baseUrl)
      .post("/faq_steps/" + pagename)
      .send(status1)
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        expect(res.body[0]).to.be.an("Object");
        expect(res.body[0]).to.have.keys(["id", "message", "trigger", "delay"]);
        expect(res.body).to.deep.include(gold_subsections);
        done();
      });
  });
  var pdt_id = 1;
  var kyc_question = {
    id: "a1",
    message:
      "You can get your full KYC done by uploading the required documents. Your full KYC will be done along with your first investment. Tap on 'Upload Docs'.",
    trigger: "Ask",
  };
  var pdt_question = {
    id: "ans0",
    message:
      "Provisions rose 19.5% y-o-y to Rs 2,995 crore. This includes provisions of Rs 497 crore made on a prudent basis on loans aggregating Rs 1,410 crore that were not classified as non-performing pursuant to a Supreme Court order.",
    trigger: "Ask",
  };
  it("get faq_steps for a product page for a person who has his kyc done", function (done) {
    chai
      .request(baseUrl)
      .post("/faq_steps/product/" + pdt_id)
      .send(status1)
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        expect(res.body).to.deep.include(pdt_question);
        done();
      });
  });

  it("get faq_steps for a product page for a person who does not have his kyc done", function (done) {
    chai
      .request(baseUrl)
      .post("/faq_steps/product/" + pdt_id)
      .send(status2)
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        expect(res.body).to.deep.include.members([pdt_question, kyc_question]);
        done();
      });
  });
  var processing_order_faq = {
    id: "ans0",
    message:
      "It usually takes 3-4 bank working days for a mutual fund order to complete.\nIn case of liquid funds, it takes 1-2 bank working days.\nIf it has already been more than 3-4 working days, you can raise a ticket. ",
    trigger: "Ask",
  };
  var user = { name: "Lia", order_id: 1 };
  it("get faq-steps for a specific order depending on order-status ", function (done) {
    chai
      .request(baseUrl)
      .post("/orders/" + user.name + "/" + user.order_id)
      .send(status1)
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        expect(res.body).to.deep.include.members([processing_order_faq]);
        done();
      });
  });
  var question = { question: "Walt Disney shares performance" };
  var answer =
    "Provisions rose 19.5% y-o-y to Rs 2,995 crore. This includes provisions of Rs 497 crore made on a prudent basis on loans aggregating Rs 1,410 crore that were not classified as non-performing pursuant to a Supreme Court order.";
  it("get a faq question-answer pair as per a manually typed question", function (done) {
    chai
      .request(baseUrl)
      .post("/faq_steps")
      .send(question)
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.include.key("answer");
        expect(res.body.answer[0]).to.eql(answer);
        done();
      });
  });
  var random = { question: "Random statement" };
  var error_message =
    "Sorry we didn't get that. Try asking something more relevant that's related to our website.";
  it("display error message for an irrelevant question", function (done) {
    chai
      .request(baseUrl)
      .post("/faq_steps")
      .send(random)
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.include.key("answer");
        expect(res.body.answer).to.eql(error_message);
        done();
      });
  });
});
