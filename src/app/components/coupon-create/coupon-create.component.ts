import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CouponService } from '../../services/coupon.service';
import { CouponCreateRequest, DiscountType } from '../../models/coupon.model';

@Component({
  selector: 'app-coupon-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './coupon-create.component.html',
  styleUrls: ['./coupon-create.component.scss']
})
export class CouponCreateComponent {
  couponData: CouponCreateRequest = {
    code: '',
    totalUsages: 1,
    expiryDate: '',
    discountType: DiscountType.FIXED,
    discountValue: 0
  };

  discountTypes = Object.values(DiscountType);
  isLoading = false;
  successMessage = '';
  errorMessage = '';

  constructor(private couponService: CouponService) {
    this.setDefaultExpiryDate();
  }

  private setDefaultExpiryDate(): void {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.couponData.expiryDate = tomorrow.toISOString().slice(0, 16);
  }

  onSubmit(): void {
    this.isLoading = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.couponService.createCoupon(this.couponData).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.successMessage = `Coupon '${response.code}' created successfully!`;
        this.resetForm();
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.message;
      }
    });
  }

  private resetForm(): void {
    this.couponData = {
      code: '',
      totalUsages: 1,
      expiryDate: '',
      discountType: DiscountType.FIXED,
      discountValue: 0
    };
    this.setDefaultExpiryDate();
  }

  dismissAlert(): void {
    this.successMessage = '';
    this.errorMessage = '';
  }
}