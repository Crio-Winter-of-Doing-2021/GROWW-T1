const express = require('express')
const PageCtrl = require('./controller')
const router = express.Router()					//router routes the api-s to the respective functions
router.get('/stocks', PageCtrl.getStocks)
router.get('/mutual_funds',PageCtrl.getStocks)
router.get('/us_stocks',PageCtrl.getStocks)

module.exports = router
