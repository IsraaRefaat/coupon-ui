import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CouponService } from '../../services/coupon.service';
import { Coupon, DiscountType } from '../../models/coupon.model';

@Component({
  selector: 'app-coupon-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './coupon-list.component.html',
  styleUrls: ['./coupon-list.component.scss']
})
export class CouponListComponent implements OnInit {
  coupons: Coupon[] = [];
  filteredCoupons: Coupon[] = [];
  isLoading = false;
  errorMessage = '';
  showValidOnly = false;

  constructor(private couponService: CouponService) {}

  ngOnInit(): void {
    this.loadCoupons();
  }

  loadCoupons(): void {
    this.isLoading = true;
    this.errorMessage = '';

    const request = this.showValidOnly ? 
      this.couponService.getValidCoupons() : 
      this.couponService.getAllCoupons();

    request.subscribe({
      next: (coupons) => {
        this.coupons = coupons;
        this.filteredCoupons = coupons;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = error.message;
        this.isLoading = false;
      }
    });
  }

  toggleValidOnly(): void {
    this.showValidOnly = !this.showValidOnly;
    this.loadCoupons();
  }

  getCouponStatus(coupon: Coupon): string {
    if (!coupon.isActive) return 'inactive';
    if (new Date(coupon.expiryDate) < new Date()) return 'expired';
    if (coupon.remainingUsages === 0) return 'exhausted';
    return 'active';
  }

  getCouponStatusClass(coupon: Coupon): string {
    const status = this.getCouponStatus(coupon);
    switch (status) {
      case 'active': return 'badge bg-success';
      case 'expired': return 'badge bg-danger';
      case 'exhausted': return 'badge bg-warning';
      case 'inactive': return 'badge bg-secondary';
      default: return 'badge bg-secondary';
    }
  }

  getDiscountDisplay(coupon: Coupon): string {
    if (coupon.discountType === DiscountType.PERCENTAGE) {
      return `${coupon.discountValue}%`;
    }
    return `$${coupon.discountValue}`;
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }

  formatDateTime(dateString: string): string {
    return new Date(dateString).toLocaleString();
  }

  getUsageProgress(coupon: Coupon): number {
    return ((coupon.totalUsages - coupon.remainingUsages) / coupon.totalUsages) * 100;
  }

  refreshCoupons(): void {
    this.loadCoupons();
  }

  getActiveCouponsCount(): number {
    return this.coupons.filter(coupon => this.getCouponStatus(coupon) === 'active').length;
  }

  getExpiredCouponsCount(): number {
    return this.coupons.filter(coupon => this.getCouponStatus(coupon) === 'expired').length;
  }

  getTotalUsages(): number {
    return this.coupons.reduce((total, coupon) => total + (coupon.totalUsages - coupon.remainingUsages), 0);
  }
}