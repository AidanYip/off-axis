const couponModel = require('../models/couponModel');

const getAllCoupons = async () => {
  const result = couponModel.getAllCoupons();
  return result;
};

const getCouponById = async (req) => {
  const { coupon_id, gig_id } = req;

  const result = couponModel.getCouponById(coupon_id, gig_id);
  return result;
}

const createCoupon = async (req) => {
  const { gig_id, uses, amount, coupon_code, verified } = req;

  const result = await couponModel.createCoupon(gig_id, uses, amount, coupon_code, verified);
  return result;
};

const updateCoupon = async (req) => {
  const { coupon_id, gig_id, uses, amount, coupon_code, verified } = req;

  const result = await couponModel.updateCoupon(coupon_id, gig_id, uses, amount, coupon_code, verified);
  return result;
};

const deleteCoupon = async (req) => {
  const { coupon_id, gig_id } = req;

  const result = await couponModel.deleteCoupon(coupon_id, gig_id);
  return result;
}

module.exports = {
  getAllCoupons,
  getCouponById,
  createCoupon,
  updateCoupon,
  deleteCoupon
}