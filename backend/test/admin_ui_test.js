const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const baseUrl = "http://localhost:8080";
chai.use(chaiHttp);
describe("Admin-UI Backend Test", function () {
  var insert_page_faq = {
    subsection: "IPO",
    question: "Another dummy question",
    answer: "Another dummy answer",
  };
  it("insert a page faq", function (done) {
    chai
      .request(baseUrl)
      .post("/pages/stocks")
      .send(insert_page_faq)
      .end(function (err, res) {
        expect(res).to.have.status(201);
        expect(res.text).to.equal("Question added successfully!");
        done();
      });
  });
  var insert_another_page_faq = {
    subsection: "Random",
    question: "Another dummy question",
    answer: "Another dummy answer",
  };
  it("insert a page faq", function (done) {
    chai
      .request(baseUrl)
      .post("/pages/stocks")
      .send(insert_another_page_faq)
      .end(function (err, res) {
        expect(res).to.have.status(404);
        expect(res.text).to.equal("Requested subsection not found");
        done();
      });
  });
  var update_page_faq = {
    subsection: "IPO",
    newquestion: "Dummy question-y",
    newanswer: "Dummy answer-y",
    id: 6,
  };
  it("update a page faq", function (done) {
    chai
      .request(baseUrl)
      .patch("/pages/stocks")
      .send(update_page_faq)
      .end(function (err, res) {
        expect(res).to.have.status(201);
        expect(res.text).to.equal("Question-answer pair updated successfully!");
        done();
      });
  });
  var delete_page_faq = { subsection: "IPO", id: 6 };
  it("delete a page faq", function (done) {
    chai
      .request(baseUrl)
      .delete("/pages/stocks")
      .send(delete_page_faq)
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.text).to.equal("Question-answer pair deleted successfully!");
        done();
      });
  });
  var insert_pdt_faq = {
    question: "Another dummy question2",
    answer: "Another dummy answer2",
  };
  it("insert a product faq", function (done) {
    chai
      .request(baseUrl)
      .post("/products/1")
      .send(insert_pdt_faq)
      .end(function (err, res) {
        expect(res).to.have.status(201);
        expect(res.text).to.equal("FAQ-Answer pair successfully added!");
        done();
      });
  });
  var update_pdt_faq = {
    newquestion: "Dummy question-y",
    newanswer: "Dummy answer-y",
    id: 4,
  };
  it("update a product faq", function (done) {
    chai
      .request(baseUrl)
      .patch("/products/1")
      .send(update_pdt_faq)
      .end(function (err, res) {
        expect(res).to.have.status(201);
        expect(res.text).to.equal("FAQ-Answer pair updated successfully!");
        done();
      });
  });
  var delete_pdt_faq = { id: 4 };
  it("delete a product faq", function (done) {
    chai
      .request(baseUrl)
      .delete("/products/1")
      .send(delete_pdt_faq)
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.text).to.equal("FAQ-Answer pair deleted successfully!");
        done();
      });
  });
});
