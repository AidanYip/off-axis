const db = require('../config/db');

const getAllCoupons = async () => {
  const query = ` 
    SELECT *
    FROM Coupon
  ;`;
        
  const [rows] = await db.query(query);
  return rows;
};

const getCouponById = async (coupon_id, gig_id) => {
  const query = `
    SELECT *
    FROM Coupon
    WHERE coupon_id = ? AND gig_id = ?
  ;`;

  const [rows] = await db.query(query, [coupon_id, gig_id]);
  return rows;
};

const createCoupon = async (gig_id, uses, amount, coupon_code) => {
  const query = `
    INSERT INTO Coupon
      (gig_id, uses, amount, coupon_code, verified)
    VALUES 
      (?, ?, ?, ?, ?)
  ;`;

  const [rows] = await db.query(query, [gig_id, uses, amount, coupon_code, verified]);
  return rows;
};

const updateCoupon = async (coupon_id, gig_id, uses, amount, coupon_code, verified) => {
  const query = `
    UPDATE Coupon
    SET
      gig_id = ?, 
      uses = ?, 
      amount = ?, 
      coupon_code = ?, 
      verified = ?
    WHERE coupon_id = ? AND gig_id = ?;
  `;

  const [rows] = await db.query(query, [gig_id, uses, amount, coupon_code, verified, coupon_id, gig_id]);
  return rows;
};


const deleteCoupon = async (artist_id) => {
  const query = `
    DELETE FROM Coupon
    WHERE coupon_id = ? AND gig_id = ?
  ;`;

  const [result] = await db.query(query, [artist_id]);
  return result;
};


module.exports = {
  getAllCoupons,
  getCouponById,
  createCoupon,
  updateCoupon,
  deleteCoupon
}
