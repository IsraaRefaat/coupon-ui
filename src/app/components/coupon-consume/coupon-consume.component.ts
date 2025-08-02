import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CouponService } from '../../services/coupon.service';
import { CouponConsumeRequest, CouponConsumption } from '../../models/coupon.model';

@Component({
  selector: 'app-coupon-consume',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './coupon-consume.component.html',
  styleUrls: ['./coupon-consume.component.scss']
})
export class CouponConsumeComponent {
  consumeData: CouponConsumeRequest = {
    couponCode: '',
    customerId: '',
    orderId: ''
  };

  isLoading = false;
  successMessage = '';
  errorMessage = '';
  lastConsumption: CouponConsumption | null = null;

  constructor(private couponService: CouponService) {}

  onSubmit(): void {
    this.isLoading = true;
    this.successMessage = '';
    this.errorMessage = '';
    this.lastConsumption = null;

    this.couponService.consumeCoupon(this.consumeData).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.lastConsumption = response;
        this.successMessage = `Coupon '${response.couponCode}' consumed successfully! Discount applied: $${response.discountApplied}`;
        this.resetForm();
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.message;
      }
    });
  }

  private resetForm(): void {
    this.consumeData = {
      couponCode: '',
      customerId: '',
      orderId: ''
    };
  }

  dismissAlert(): void {
    this.successMessage = '';
    this.errorMessage = '';
  }

  formatDateTime(dateString: string): string {
    return new Date(dateString).toLocaleString();
  }

  generateRandomOrderId(): void {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    this.consumeData.orderId = `ORD-${timestamp}-${random}`;
  }

  generateRandomCustomerId(): void {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    this.consumeData.customerId = `CUST-${timestamp}-${random}`;
  }
}