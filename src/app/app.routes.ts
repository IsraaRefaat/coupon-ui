import { Routes } from '@angular/router';
import { CouponListComponent } from './components/coupon-list/coupon-list.component';
import { CouponCreateComponent } from './components/coupon-create/coupon-create.component';
import { CouponConsumeComponent } from './components/coupon-consume/coupon-consume.component';
import { ConsumptionHistoryComponent } from './components/consumption-history/consumption-history.component';

export const routes: Routes = [
  { path: '', redirectTo: '/coupons', pathMatch: 'full' },
  { path: 'coupons', component: CouponListComponent },
  { path: 'create', component: CouponCreateComponent },
  { path: 'consume', component: CouponConsumeComponent },
  { path: 'history', component: ConsumptionHistoryComponent },
  { path: '**', redirectTo: '/coupons' }
];