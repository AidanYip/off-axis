jest.mock('../../models/couponModel', () => ({
  getAllCoupons: jest.fn(),
  getCouponById: jest.fn(),
  createCoupon: jest.fn(),
  updateCoupon: jest.fn(),
  deleteCoupon: jest.fn()
}));

const couponService = require('../couponService');
const couponModel = require('../../models/couponModel');

describe('couponService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('getAllCoupons should return result from couponModel.getAllCoupons', async () => {
    const mockResult = [{ id: 1, coupon_code: 'DISCOUNT10' }];
    couponModel.getAllCoupons.mockResolvedValue(mockResult);

    const result = await couponService.getAllCoupons();
    expect(result).toEqual(mockResult);
    expect(couponModel.getAllCoupons).toHaveBeenCalledTimes(1);
  });

  test('getCouponById should return result from couponModel.getCouponById', async () => {
    const mockResult = { id: 1, coupon_code: 'DISCOUNT10' };
    const req = { coupon_id: 1, gig_id: 1 };
    couponModel.getCouponById.mockResolvedValue(mockResult);

    const result = await couponService.getCouponById(req);
    expect(result).toEqual(mockResult);
    expect(couponModel.getCouponById).toHaveBeenCalledWith(req.coupon_id, req.gig_id);
    expect(couponModel.getCouponById).toHaveBeenCalledTimes(1);
  });

  test('createCoupon should return result from couponModel.createCoupon', async () => {
    const mockResult = { success: true };
    const req = { gig_id: 1, uses: 10, amount: 20, coupon_code: 'DISCOUNT10', verified: true };
    couponModel.createCoupon.mockResolvedValue(mockResult);

    const result = await couponService.createCoupon(req);
    expect(result).toEqual(mockResult);
    expect(couponModel.createCoupon).toHaveBeenCalledWith(req.gig_id, req.uses, req.amount, req.coupon_code, req.verified);
    expect(couponModel.createCoupon).toHaveBeenCalledTimes(1);
  });

  test('updateCoupon should return result from couponModel.updateCoupon', async () => {
    const mockResult = { success: true };
    const req = { coupon_id: 1, gig_id: 1, uses: 10, amount: 20, coupon_code: 'DISCOUNT10', verified: true };
    couponModel.updateCoupon.mockResolvedValue(mockResult);

    const result = await couponService.updateCoupon(req);
    expect(result).toEqual(mockResult);
    expect(couponModel.updateCoupon).toHaveBeenCalledWith(req.coupon_id, req.gig_id, req.uses, req.amount, req.coupon_code, req.verified);
    expect(couponModel.updateCoupon).toHaveBeenCalledTimes(1);
  });

  test('deleteCoupon should return result from couponModel.deleteCoupon', async () => {
    const mockResult = { success: true };
    const req = { coupon_id: 1, gig_id: 1 };
    couponModel.deleteCoupon.mockResolvedValue(mockResult);

    const result = await couponService.deleteCoupon(req);
    expect(result).toEqual(mockResult);
    expect(couponModel.deleteCoupon).toHaveBeenCalledWith(req.coupon_id, req.gig_id);
    expect(couponModel.deleteCoupon).toHaveBeenCalledTimes(1);
  });
});
