import mongoose from "mongoose";
const users = require("../models/user_model.js");
const pages = require("../models/page_model.js");
const products = require("../models/product_model.js");

exports.getProducts = async (req, res) => {
  var path = req.path.substring(1);
  await pages.aggregate(
    [
      { $match: { page_name: path } },
      {
        $lookup: {
          from: "products",
          localField: "products_listed",
          foreignField: "product_id",
          as: "page",
        },
      },
      { $unset: ["page_id", "page_name", "products_listed", "_id"] },
    ],
    (err, page_req) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
      if (!page_req.length) {
        return res.status(200).send(path + " doesn't contain products");
      } else {
        return res.status(200).json(page_req);
      }
    }
  );
};

exports.getOrdersList = (req, res) => {
  var user = req.params.user;
  users.findOne({ user_name: user }).then(
    function (usr) {
      if (usr === null) {
        res.status(400).end("User not found!");
      } else {
        let orders = usr.orders,
          i = 0;
        orders.forEach(function (order) {
          let end = orders.length,
            tot = 0,
            arr = [];
          products
            .find({ product_name: { $in: order.productName } })
            .then(function (pdt) {
              let j = 0;
              pdt.forEach(function (p) {
                let val =
                  parseFloat(p.Stock_price.substring(1)) * order.units[j];
                arr.push(val);
                j++;
                tot = tot + val;
              });
              i++;
              return arr;
            })
            .then(
              function (arr) {
                order.costs = arr;
                order.total = tot;
                if (i === end) {
                  res.send(orders);
                }
              },
              function (err) {
                res.status(400).send("Error occured");
              }
            );
        });
      }
    },
    function (err) {
      res.status.send(err);
    }
  );
};

exports.getUser = async (req, res) => {
  var user = req.params.user;
  await users.findOne({ user_name: user }, (err, usr) => {
    if (err) {
      res.send(err);
    } else if (usr === null) {
      res.status(400).end("User not found!");
    } else {
      let obj = {
        name: usr.user_name,
        phone_number: usr.phone_number,
        email: usr.email,
        kyc_status: usr.kyc_status,
        kyc_details: usr.kyc_details,
      };
      res.status(200).send(obj);
    }
  });
};

exports.getPdtInfo = async (req, res) => {
  await products.findOne({ product_id: req.params.id }, (err, pdt) => {
    if (err) {
      res.status(400).send("Error occured");
    } else if (pdt === null) {
      res.status(200).send("Product does not exist");
    } else {
      res.status(200).send(pdt);
    }
  });
};


exports.addOrder = async (req, res) => {
  await users
    .findOne({ user_name: req.params.user })
    .then(function (user) {
      if (user === null) {
        res.status(400).send("User not found");
      } else {
        let order = {
          order_id: user.orders.length + 1,
          order_status: "Processing Order",
          productName: req.body.productName,
          units: req.body.units,
          costs: [],
          total: 0,
        };
        return order;
      }
    })
    .then(
      function (order) {
        users
          .findOneAndUpdate(
            { user_name: req.params.user },
            { $push: { orders: order } },
            { useFindAndModify: false }
          )
          .then((data) => {
            if (!data) {
              res
                .status(404)
                .send("Cannot place order. Maybe user was not found!");
            } else {
              console.log(data);
              res.status(200).send("Order successfully placed");
            }
          })
          .catch((err) => {
            res.status(404).send(err);
          });
      },
      function (err) {
        res.status(400).send(err);
      }
    );
};

exports.insertPageFaq = async (req, res) => {
  await pages.findOne({ page_name: req.params.pagename }, (err, page) => {
    if (err) {
      res.send(err);
    } else if (page === null) {
      res.send("Page not found");
    } else {
      let subsection = req.body.subsection,
        subsections = page.subsections,
        f = 0;
      for (let i = 0; i < page.subsections.length; i++) {
        if (subsections[i].type === subsection) {
          f = 1;
          subsections[i].questions.push(req.body.question);
          subsections[i].answers.push(req.body.answer);
          pages
            .findOneAndUpdate(
              { page_name: req.params.pagename },
              { subsections: subsections },
              { useFindAndModify: false }
            )
            .then((data) => {
              if (!data) {
                res
                  .status(404)
                  .send(
                    `Cannot add page question to subsection with type=${subsection}. Maybe subsection was not found!`
                  );
              } else {
                res.status(201).send("Question added successfully!");
              }
            })
            .catch((err) => {
              res.status(404).send(err);
            });
          break;
        }
      }
      if (f === 0) {
        res.status(400).send("Requested subsection not found");
      }
    }
  });
};

exports.insertProductFaq = async (req, res) => {
  products.findOneAndUpdate(
    { product_id: req.params.id },
    { $push: { questions: req.body.question, answers: req.body.answer } },
    (err, product) => {
      if (err) {
        res.send(err);
      } else {
        res.status(201).send("FAQ-Answer pair successfully added!");
      }
    }
  );
};

exports.updatePageFaq = async (req, res) => {
  await pages.findOne({ page_name: req.params.pagename }, (err, page) => {
    if (err) {
      res.send(err);
    } else if (page === null) {
      res.send("Page not found");
    } else {
      let subsection = req.body.subsection,
        subsections = page.subsections,
        f = 0;
      for (let i = 0; i < page.subsections.length; i++) {
        if (subsections[i].type === subsection) {
          f = 1;
            if (req.body.id<=subsections[i].questions.length && req.body.id>=1) {
              subsections[i].questions.splice(req.body.id-1, 1);
              subsections[i].answers.splice(req.body.id-1, 1);
              subsections[i].questions.push(req.body.newquestion);
            subsections[i].answers.push(req.body.newanswer);
            pages
              .findOneAndUpdate(
                { page_name: req.params.pagename },
                { subsections: subsections },
                { useFindAndModify: false }
              )
              .then((data) => {
                if (!data) {
                  res
                    .status(404)
                    .send(
                      `Cannot add page question to subsection with type=${subsection}. Maybe subsection was not found!`
                    );
                } else {
                  res
                    .status(201)
                    .send("Question-answer pair updated successfully!");
                }
              })
              .catch((err) => {
                res.status(404).send(err);
              });
              break;
            }

          else {
            res.status(404).send("Question or answer not found");
            break;
          } 
          break;
        }
      }
      if (f === 0) {
        res.status(400).send("Requested subsection not found");
      }
    }
  });
};

exports.updateProductFaq = async (req, res) => {
products.findOne({product_id:req.params.id},(err,pdt)=>{
		if(err)
		{
			res.status(404).send(err);
		}
		else if(pdt===null)
		{
			res.status(404).send("Product not found!");
		}
		else
		{
			if(pdt.questions.length>=req.body.id && req.body.id>=1)
			{
				let oldquestion=pdt.questions[req.body.id-1],oldanswer=pdt.answers[req.body.id-1];
				products.findOneAndUpdate(
				{ product_id: req.params.id },
				{ $pull: { questions: oldquestion, answers: oldanswer } },
				(err, product) => {
				  if (err) {
					res.send(err);
				  } else {
					products.findOneAndUpdate(
					  { product_id: req.params.id },
					  {
						$push: {
						  questions: req.body.newquestion,
						  answers: req.body.newanswer,
						},
					  },
					  (error, pdt) => {
						if (error) {
						  res.send(error);
						} else {
						  res.status(200).send("FAQ-Answer pair updated successfully!");
						}
					  }
					);
				  }
				}
			  );
			}
			else
			{
				res.status(400).send("Question-answer not found");
			}
		}
		});
};

exports.deletePageFaq = async (req, res) => {
  await pages.findOne({ page_name: req.params.pagename }, (err, page) => {
    if (err) {
      res.send(err);
    } else if (page === null) {
      res.send("Page not found");
    } else {
      let subsection = req.body.subsection,
        subsections = page.subsections,
        f = 0;
      for (let i = 0; i < page.subsections.length; i++) {
        if (subsections[i].type === subsection) {
          f = 1;
            if (subsections[i].questions.length>= req.body.id && req.body.id>=1) {
              subsections[i].questions.splice(req.body.id-1, 1);
              subsections[i].answers.splice(req.body.id-1, 1);
              pages
              .findOneAndUpdate(
                { page_name: req.params.pagename },
                { subsections: subsections },
                { useFindAndModify: false }
              )
              .then((data) => {
                if (!data) {
                  res
                    .status(404)
                    .send(
                      `Cannot add page question to subsection with type=${subsection}. Maybe subsection was not found!`
                    );
                } else {
                  res
                    .status(201)
                    .send("Question-answer pair deleted successfully!");
                }
              })
              .catch((err) => {
                res.status(404).send(err);
              });
            break;
          }
          else {
            res.status(404).send("Question or answer not found!");
            break;
          }  
        }
      }
      if (f === 0) {
        res.status(400).send("Requested subsection not found");
      }
    }
  });
};

exports.deleteProductFaq = async (req, res) => {
products.findOne({product_id:req.params.id},(err,pdt)=>{
		if(err)
		{
			res.status(404).send(err);
		}
		else if(pdt===null)
		{
			res.status(404).send("Product not found!");
		}
		else
		{
			if(pdt.questions.length>=req.body.id && req.body.id>=1)
			{
				let question=pdt.questions[req.body.id-1],answer=pdt.answers[req.body.id-1];
				products.findOneAndUpdate(
				{ product_id: req.params.id },
				{ $pull: { questions: question, answers: answer } },
				(err, product) => {
				  if (err) {
					res.send(err);
				  } else {
					res.status(200).send("FAQ-Answer pair deleted successfully!");
				  }
				}
			  );
			}
			else
			{
				res.status(404).send("Please enter a valid id");
			}
		}
		});  
};
