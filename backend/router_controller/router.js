const express = require('express')
const PageCtrl = require('./controller')
const router = express.Router()					//router routes the api-s to the respective functions
router.get('/stocks', PageCtrl.getProducts)
router.get('/mutual_funds',PageCtrl.getProducts)
router.get('/us_stocks',PageCtrl.getProducts)
router.get('/gold',PageCtrl.getProducts)
router.get('/orders',PageCtrl.getProducts)
router.post('/loggingUser',PageCtrl.loggingUser)
router.get('/products/:id',PageCtrl.getPdtFaq)


module.exports = router
