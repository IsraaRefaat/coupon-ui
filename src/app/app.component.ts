import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { CouponService } from './services/coupon.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Coupon Management System';

  constructor(private couponService: CouponService) {
    // Test API connection on app start
    this.testApiConnection();
  }

  private testApiConnection(): void {
    console.log('Testing API connection...');
    this.couponService.getAllCoupons().subscribe({
      next: (coupons) => {
        console.log('✅ API connection successful! Found', coupons.length, 'coupons');
      },
      error: (error) => {
        console.error('❌ API connection failed:', error);
      }
    });
  }
}