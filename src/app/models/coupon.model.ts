export interface Coupon {
  id: number;
  code: string;
  totalUsages: number;
  remainingUsages: number;
  expiryDate: string;
  discountType: DiscountType;
  discountValue: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CouponCreateRequest {
  code: string;
  totalUsages: number;
  expiryDate: string;
  discountType: DiscountType;
  discountValue: number;
}

export interface CouponConsumeRequest {
  couponCode: string;
  customerId: string;
  orderId: string;
}

export interface CouponConsumption {
  id: number;
  couponCode: string;
  customerId: string;
  orderId: string;
  discountApplied: number;
  consumedAt: string;
}

export enum DiscountType {
  FIXED = 'FIXED',
  PERCENTAGE = 'PERCENTAGE'
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status?: number;
}

export interface ErrorResponse {
  status: number;
  message: string;
  timestamp: string;
}

export interface ValidationErrorResponse {
  status: number;
  message: string;
  errors: { [key: string]: string };
  timestamp: string;
}