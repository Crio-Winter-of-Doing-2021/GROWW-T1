const express = require('express')
const PageCtrl = require('./controller')
const router = express.Router()					//router routes the api-s to the respective functions


router.get('/stocks', PageCtrl.getProducts)
router.get('/mutual_funds',PageCtrl.getProducts)
router.get('/us_stocks',PageCtrl.getProducts)
router.get('/gold',PageCtrl.getProducts)
router.get('/orders',PageCtrl.getProducts)

router.get('/orders/:user',PageCtrl.getOrdersList)
router.get('/profile/:user',PageCtrl.getUser)


router.get('/stocks/:id',PageCtrl.getPdtInfo)
router.get('/us_stocks/:id',PageCtrl.getPdtInfo)
router.get('/mutual_funds/:id',PageCtrl.getPdtInfo)

router.get('/faq_steps/stocks',PageCtrl.getPageFaq)
router.get('/faq_steps/mutual_funds',PageCtrl.getPageFaq)
router.get('/faq_steps/gold',PageCtrl.getPageFaq)
router.get('/faq_steps/us_stocks',PageCtrl.getPageFaq)
router.get('/faq_steps/orders',PageCtrl.getPageFaq)

router.get('/faq_steps/product/:id',PageCtrl.getPdtFaq)

router.get('/orders/:user/:id',PageCtrl.getSelectedOrderFaq)

router.post('/loggingUser',PageCtrl.loggingUser)
router.post('/registerUser',PageCtrl.registerUser)
router.post('/orders/:user',PageCtrl.addOrder)

router.post('/pages/:pagename',PageCtrl.insertPageFaq)
router.post('/products/:id',PageCtrl.insertProductFaq)

module.exports = router
