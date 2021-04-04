const express = require("express");
const PageCtrl = require("./faq_controller");
const router = express.Router();

router.post("/faq_steps/stocks", PageCtrl.getPageFaq);
router.post("/faq_steps/mutual_funds", PageCtrl.getPageFaq);
router.post("/faq_steps/gold", PageCtrl.getPageFaq);
router.post("/faq_steps/us_stocks", PageCtrl.getPageFaq);
router.post("/faq_steps/orders", PageCtrl.getPageFaq);

router.post("/faq_steps/product/:id", PageCtrl.getPdtFaq);

router.post("/orders/:user/:id", PageCtrl.getSelectedOrderFaq);

module.exports = router;
