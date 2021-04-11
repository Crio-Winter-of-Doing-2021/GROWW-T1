import mongoose from "mongoose";
import stringSimilarity from "string-similarity";
const users = require("../models/user_model.js");
const pages = require("../models/page_model.js");
const products = require("../models/product_model.js");

exports.getPageFaq = async (req, res) => {
  var result = /[^/]*$/.exec(req.path)[0];
  await pages.findOne({ page_name: result }, (err, page) => {
    if (err) {
      res.send(err);
    } else if (page === null) {
      res.status(200).send("Page does not exist!");
    } else {
      var items = page.subsections;
      let st = 0,
        q1 = [],
        ar = [];
      const steps = [
        {
          id: "Greet",
          message: "Hello there, this is Emilia. How may I help you?",
          delay: 5,
          trigger: "question",
        },
        {
          id: "Ask",
          message: "Anything else I can help you with?",
          trigger: "Options",
        },
        {
          id: "Options",
          options: [
            { value: 1, label: "No", trigger: "End" },
            { value: 2, label: "Yes", trigger: "Greet" },
            {
              value: 3,
              label: "I'd like to type my question",
              trigger: "botQues",
            },
          ],
        },
        {
          id: "End",
          message: "See you later!",
          end: true,
        },
      ];
      if (req.body.kyc_status != "done") {
        q1.push({
          value: 0,
          label: "Kyc related questions",
          trigger: "qs" + page.subsections.length,
        });
        steps.push({
          id: "qs" + page.subsections.length,
          options: [
            { value: 1, label: "How do I get my full kyc done", trigger: "a1" },
            {
              value: 2,
              label: "I don't have a pan card. Can I still invest?",
              trigger: "a2",
            },
            {
              value: 3,
              label: "Do you charge for processing kyc?",
              trigger: "a3",
            },
          ],
        });
        steps.push({
          id: "a1",
          message:
            "You can get your full KYC done by uploading the required documents. Your full KYC will be done along with your first investment. Tap on 'Upload Docs'.",
          trigger: "Ask",
        });
        steps.push({
          id: "a2",
          message:
            "You cannot invest without a PAN card as per SEBI rules. Please get your PAN card made to start investing.",
          trigger: "Ask",
        });
        steps.push({
          id: "a3",
          message:
            "No. We do not charge anything for processing your KYC. We do it for free along with your first investment.",
          trigger: "Ask",
        });
      }
      for (let i = 0; i < page.subsections.length; i = i + 1) {
        q1.push({
          value: i + 1,
          label: page.subsections[i].type,
          trigger: "qs" + st,
        });
        st = st + 1;
      }
      steps.push({ id: "question", options: q1 });
      for (let i = 0; i < items.length; i = i + 1) {
        ar = [];
        for (let j = 0; j < items[i].questions.length; j = j + 1) {
          ar.push({
            value: i * 10 + j,
            label: items[i].questions[j],
            trigger: "ans" + i + j,
          });
        }
        steps.push({ id: "qs" + i, options: ar });
        for (let j = 0; j < items[i].questions.length; j = j + 1) {
          steps.push({
            id: "ans" + i + j,
            message: items[i].answers[j],
            trigger: "Ask",
          });
        }
      }
      res.send(steps);
    }
  });
};

exports.getPdtFaq = async (req, res) => {
  await products.findOne({ product_id: req.params.id }, (err, pdt) => {
    if (err) {
      res.status(400).send("Error occured");
    } else if (pdt === null) {
      res.status(200).send("Product does not exist");
    } else {
      var q = pdt.questions,
        a = pdt.answers;
      let st = 0,
        q1 = [],
        ar = [];
      const steps = [
        {
          id: "Greet",
          message: "Hello there, this is Emilia. How may I help you?",
          delay: 5,
          trigger: "question",
        },
        {
          id: "Ask",
          message: "Anything else I can help you with?",
          trigger: "Options",
        },
        {
          id: "Options",
          options: [
            { value: 1, label: "No", trigger: "End" },
            { value: 2, label: "Yes", trigger: "Greet" },
            {
              value: 3,
              label: "I'd like to type my question",
              trigger: "botQues",
            },
          ],
        },
        {
          id: "End",
          message: "See you later!",
          end: true,
        },
      ];
      if (req.body.kyc_status != "done") {
        q1.push({
          value: q.length + 1,
          label: "How do I get my full kyc done",
          trigger: "a1",
        });
        q1.push({
          value: q.length + 2,
          label: "I don't have a pan card. Can I still invest?",
          trigger: "a2",
        });
        q1.push({
          value: q.length + 3,
          label: "Do you charge for processing kyc?",
          trigger: "a3",
        });
        steps.push({
          id: "a1",
          message:
            "You can get your full KYC done by uploading the required documents. Your full KYC will be done along with your first investment. Tap on 'Upload Docs'.",
          trigger: "Ask",
        });
        steps.push({
          id: "a2",
          message:
            "You cannot invest without a PAN card as per SEBI rules. Please get your PAN card made to start investing.",
          trigger: "Ask",
        });
        steps.push({
          id: "a3",
          message:
            "No. We do not charge anything for processing your KYC. We do it for free along with your first investment.",
          trigger: "Ask",
        });
      }
      for (let i = 0; i < q.length; i = i + 1) {
        q1.push({ value: i + 1, label: q[i], trigger: "ans" + st });
        st = st + 1;
      }
      steps.push({ id: "question", options: q1 });
      for (let j = 0; j < a.length; j = j + 1) {
        steps.push({ id: "ans" + j, message: a[j], trigger: "Ask" });
      }
      res.send(steps);
    }
  });
};

exports.getSelectedOrderFaq = async (req, res) => {
  await users.findOne({ user_name: req.params.user }, (err, user) => {
    if (err) {
      res.status(400).send("Error occured");
    } else if (user === null) {
      res.status(200).send("User not found");
    } else {
      var list = user.orders;
      for (var i = 0; i < list.length; i++) {
        if (list[i].order_id == req.params.id) {
          var status = list[i].order_status;
          pages.findOne({ page_name: "orders" }, (err, page) => {
            if (err) {
              res.status(400).send("Error");
            } else if (page === null) {
              res.status(200).send("Order status doesn't exist");
            } else {
              var findtype = page.subsections;
              for (var j = 0; j < findtype.length; j++) {
                if (page.subsections[j].type === status) {
                  var q = page.subsections[j].questions,
                    a = page.subsections[j].answers;
                  const steps = [
                    {
                      id: "Greet",
                      message:
                        "Hello there, this is Emilia. How may I help you?",
                      delay: 5,
                      trigger: "question",
                    },
                    {
                      id: "Ask",
                      message: "Anything else I can help you with?",
                      trigger: "Options",
                    },
                    {
                      id: "Options",
                      options: [
                        { value: 1, label: "No", trigger: "End" },
                        { value: 2, label: "Yes", trigger: "Greet" },
                        {
                          value: 3,
                          label: "I'd like to type my question",
                          trigger: "botQues",
                        },
                      ],
                    },
                    {
                      id: "End",
                      message: "See you later!",
                      end: true,
                    },
                  ];
                  let st = 0,
                    q1 = [],
                    ar = [];
                  if (req.body.kyc_status != "done") {
                    q1.push({
                      value: q.length + 1,
                      label: "How do I get my full kyc done",
                      trigger: "a1",
                    });
                    q1.push({
                      value: q.length + 2,
                      label: "I don't have a pan card. Can I still invest?",
                      trigger: "a2",
                    });
                    q1.push({
                      value: q.length + 3,
                      label: "Do you charge for processing kyc?",
                      trigger: "a3",
                    });
                    steps.push({
                      id: "a1",
                      message:
                        "You can get your full KYC done by uploading the required documents. Your full KYC will be done along with your first investment. Tap on 'Upload Docs'.",
                      trigger: "Ask",
                    });
                    steps.push({
                      id: "a2",
                      message:
                        "You cannot invest without a PAN card as per SEBI rules. Please get your PAN card made to start investing.",
                      trigger: "Ask",
                    });
                    steps.push({
                      id: "a3",
                      message:
                        "No. We do not charge anything for processing your KYC. We do it for free along with your first investment.",
                      trigger: "Ask",
                    });
                  }

                  for (let i = 0; i < q.length; i = i + 1) {
                    q1.push({ value: i + 1, label: q[i], trigger: "ans" + st });
                    st = st + 1;
                  }
                  steps.push({ id: "question", options: q1 });
                  for (let j = 0; j < a.length; j = j + 1) {
                    steps.push({
                      id: "ans" + j,
                      message: a[j],
                      trigger: "Ask",
                    });
                  }
                  res.send(steps);
                }
              }
            }
          });
        }
      }
    }
  });
};

exports.searchFaq = async (req, res) => {
  let compare = [],
    result = [];
  await products.find({}, (err, data) => {
    if (err) {
      res.status(404).send(err);
    } else if (!data.length) {
      res.status(404).send("Question was not found!");
    } else {
      for (let i = 0; i < data.length; i++) {
        let questions = data[i].questions,
          answers = data[i].answers;
        for (let j = 0; j < questions.length; j++) {
          compare.push(questions[j]);
          result.push(answers[j]);
        }
      }
      pages.find({}, (err, page) => {
        if (err) {
          res.status(404).send(err);
        } else if (!page.length) {
          res.status(404).send("Question was not found!");
        } else {
          for (let i = 0; i < page.length; i++) {
            let subsections = page[i].subsections;
            for (let j = 0; j < subsections.length; j++) {
              let qs = subsections[j].questions,
                as = subsections[j].answers;
              for (let k = 0; k < qs.length; k++) {
                compare.push(qs[k]);
                result.push(as[k]);
              }
            }
          }
          compare.push("How do I get my full kyc done");
          compare.push("I don't have a pan card. Can I still invest?");
          compare.push("Do you charge for processing kyc?");
          result.push(
            "You can get your full KYC done by uploading the required documents. Your full KYC will be done along with your first investment. Tap on 'Upload Docs'."
          );
          result.push(
            "You cannot invest without a PAN card as per SEBI rules. Please get your PAN card made to start investing."
          );
          result.push(
            "No. We do not charge anything for processing your KYC. We do it for free along with your first investment."
          );
          var matches = stringSimilarity.findBestMatch(
            req.body.question.toLowerCase(),
            compare
          );
          if (matches.bestMatch.rating > 0.34) {
            res.send({ answer: result.splice(matches.bestMatchIndex, 1) });
          } else {
            res.send({
              answer:
                "Sorry we didn't get that. Try asking something more relevant that's related to our website.",
            });
          }
        }
      });
    }
  });
};
