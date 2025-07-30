const couponService = require('../services/couponService');
const { buildResponse } = require('../helpers/responseHelper');

const getAllCoupons = async (req, res) => {
  try {
    const result = await couponService.getAllCoupons();

    if (!result || result.length === 0) {
      return res.status(404).json(buildResponse(false, 404, "Data not found"));
    }

    res.status(200).json(buildResponse(true, 200, "Success", result));
  } catch (error) {
    res.status(500).json(buildResponse(false, 500, error.message));
  }
};

const getCouponById = async (req, res) => {
  try {
    const { coupon_id, gig_id } = req.body;

    if (!coupon_id || !gig_id) {
      return res.status(400).json(buildResponse(false, 400, "Missing required fields"));
    }

    const result = await couponService.getCouponById(req.body);

    if (!result || result.length === 0) {
      return res.status(404).json(buildResponse(false, 404, "Data not found"));
    }

    res.status(200).json(buildResponse(true, 200, "Success", result));
  } catch (error) {
    res.status(500).json(buildResponse(false, 500, error.message));
  }
}

const createCoupon = async (req, res) => {
  try {
    const { gig_id, uses, amount, coupon_code, verified } = req.body;

    if (!gig_id || !uses || !amount || !coupon_code) {
      return res.status(400).json(buildResponse(false, 400, "Missing required fields"));
    }

    const result = await couponService.createCoupon(req.body);

    res.status(200).json(buildResponse(true, 200, "Success", result));
  } catch (error) {
    res.status(500).json(buildResponse(false, 500, error.message));
  }
};

const updateCoupon = async (req, res) => {
  try {
    const { coupon_id, gig_id, uses, amount, coupon_code, verified } = req.body;

    if (!coupon_id || !gig_id || !uses || !amount || !coupon_code) {
      return res.status(400).json(buildResponse(false, 400, "Missing required fields"));
    }

    const result = await couponService.updateCoupon(req.body);

    res.status(200).json(buildResponse(true, 200, "Success", result));
  } catch (error) {
    res.status(500).json(buildResponse(false, 500, error.message));
  }
};

const deleteCoupon = async (req, res) => {
  try {
    const { coupon_id, gig_id } = req.body;

    if (!coupon_id || !gig_id) {
      return res.status(400).json(buildResponse(false, 400, "Missing required fields"));
    }

    const result = await couponService.deleteCoupon(req.body);

    if (!result || result.affectedRows === 0){
      return res.status(404).json(buildResponse(false, 404, "Data not found"));
    }

    res.status(200).json(buildResponse(true, 200, "Success", result));
  } catch (error) {
    res.status(500).json(buildResponse(false, 500, error.message));
  }
};

module.exports = {
  getAllCoupons,
  getCouponById,
  createCoupon,
  updateCoupon,
  deleteCoupon
};