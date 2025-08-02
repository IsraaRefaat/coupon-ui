import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { CouponService } from '../../services/coupon.service';
import { CouponConsumption } from '../../models/coupon.model';

@Component({
  selector: 'app-consumption-history',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './consumption-history.component.html',
  styleUrls: ['./consumption-history.component.scss']
})
export class ConsumptionHistoryComponent implements OnInit {
  consumptions: CouponConsumption[] = [];
  filteredConsumptions: CouponConsumption[] = [];
  isLoading = false;
  errorMessage = '';
  
  searchType: 'all' | 'customer' | 'coupon' = 'all';
  searchValue = '';
  
  sortBy: 'date' | 'coupon' | 'customer' | 'amount' = 'date';
  sortDirection: 'asc' | 'desc' = 'desc';

  constructor(private couponService: CouponService) {}

  ngOnInit(): void {
    this.loadAllConsumptions();
  }

  loadAllConsumptions(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.couponService.getAllCoupons().subscribe({
      next: async (coupons) => {
        try {
          const consumptionRequests = coupons.map(coupon => 
            this.couponService.getCouponConsumptions(coupon.id!)
          );
          
          const results = await Promise.all(
            consumptionRequests.map(req => firstValueFrom(req))
          );
          
          this.consumptions = results.flat().filter(c => c != null) as CouponConsumption[];
          this.applyFiltersAndSort();
          this.isLoading = false;
        } catch (error) {
          this.errorMessage = 'Failed to load consumption history';
          this.isLoading = false;
        }
      },
      error: (error) => {
        this.errorMessage = error.message;
        this.isLoading = false;
      }
    });
  }

  searchConsumptions(): void {
    if (this.searchType === 'all' || !this.searchValue.trim()) {
      this.loadAllConsumptions();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    if (this.searchType === 'customer') {
      this.couponService.getCustomerConsumptions(this.searchValue.trim()).subscribe({
        next: (consumptions) => {
          this.consumptions = consumptions;
          this.applyFiltersAndSort();
          this.isLoading = false;
        },
        error: (error) => {
          this.errorMessage = error.message;
          this.isLoading = false;
        }
      });
    } else if (this.searchType === 'coupon') {
      this.couponService.getCouponByCode(this.searchValue.trim()).subscribe({
        next: (coupon) => {
          this.couponService.getCouponConsumptions(coupon.id).subscribe({
            next: (consumptions) => {
              this.consumptions = consumptions;
              this.applyFiltersAndSort();
              this.isLoading = false;
            },
            error: (error) => {
              this.errorMessage = error.message;
              this.isLoading = false;
            }
          });
        },
        error: (error) => {
          this.errorMessage = error.message;
          this.isLoading = false;
        }
      });
    }
  }

  applyFiltersAndSort(): void {
    this.filteredConsumptions = [...this.consumptions];
    this.sortConsumptions();
  }

  sortConsumptions(): void {
    this.filteredConsumptions.sort((a, b) => {
      let comparison = 0;
      
      switch (this.sortBy) {
        case 'date':
          comparison = new Date(a.consumedAt).getTime() - new Date(b.consumedAt).getTime();
          break;
        case 'coupon':
          comparison = a.couponCode.localeCompare(b.couponCode);
          break;
        case 'customer':
          comparison = a.customerId.localeCompare(b.customerId);
          break;
        case 'amount':
          comparison = a.discountApplied - b.discountApplied;
          break;
      }
      
      return this.sortDirection === 'asc' ? comparison : -comparison;
    });
  }

  onSortChange(): void {
    this.sortConsumptions();
  }

  onSearchTypeChange(): void {
    this.searchValue = '';
    if (this.searchType === 'all') {
      this.loadAllConsumptions();
    }
  }

  formatDateTime(dateString: string): string {
    return new Date(dateString).toLocaleString();
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }

  formatTime(dateString: string): string {
    return new Date(dateString).toLocaleTimeString();
  }

  getTotalDiscountApplied(): number {
    return this.filteredConsumptions.reduce((total, consumption) => total + consumption.discountApplied, 0);
  }

  getUniqueCustomers(): number {
    const uniqueCustomers = new Set(this.filteredConsumptions.map(c => c.customerId));
    return uniqueCustomers.size;
  }

  getUniqueCoupons(): number {
    const uniqueCoupons = new Set(this.filteredConsumptions.map(c => c.couponCode));
    return uniqueCoupons.size;
  }

  exportToCSV(): void {
    if (this.filteredConsumptions.length === 0) {
      return;
    }

    const headers = ['ID', 'Coupon Code', 'Customer ID', 'Order ID', 'Discount Applied', 'Consumed At'];
    const csvContent = [
      headers.join(','),
      ...this.filteredConsumptions.map(consumption => [
        consumption.id,
        consumption.couponCode,
        consumption.customerId,
        consumption.orderId,
        consumption.discountApplied,
        consumption.consumedAt
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `consumption-history-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  clearSearch(): void {
    this.searchValue = '';
    this.searchType = 'all';
    this.loadAllConsumptions();
  }
}