const express = require('express');
const couponController = require('../controllers/couponController');
const router = express.Router();

router.get('/getAllCoupons', couponController.getAllCoupons);
router.post('/getCouponById', couponController.getCouponById);
router.post('/createCoupon', couponController.createCoupon);
router.post('/updateCoupon', couponController.updateCoupon);
router.post('/deleteCoupon', couponController.deleteCoupon);

module.exports = router;
