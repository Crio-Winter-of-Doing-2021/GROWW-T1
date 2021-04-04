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


router.post('/orders/:user',PageCtrl.addOrder)

router.post('/pages/:pagename',PageCtrl.insertPageFaq)
router.post('/products/:id',PageCtrl.insertProductFaq)
router.patch('/pages/:pagename', PageCtrl.updatePageFaq)
router.patch('/products/:id',PageCtrl.updateProductFaq)
router.delete('/pages/:pagename', PageCtrl.deletePageFaq)
router.delete('/products/:id',PageCtrl.deleteProductFaq)
module.exports = router
