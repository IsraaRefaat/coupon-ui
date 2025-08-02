import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { 
  Coupon, 
  CouponCreateRequest, 
  CouponConsumeRequest, 
  CouponConsumption,
  ErrorResponse,
  ValidationErrorResponse
} from '../models/coupon.model';

@Injectable({
  providedIn: 'root'
})
export class CouponService {
  // Use environment variable for API URL
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Method to update base URL (useful for testing or different environments)
  setBaseUrl(url: string): void {
    this.baseUrl = url;
  }

  // Method to get current base URL
  getBaseUrl(): string {
    return this.baseUrl;
  }

  createCoupon(request: CouponCreateRequest): Observable<Coupon> {
    return this.http.post<Coupon>(this.baseUrl, request)
      .pipe(catchError(this.handleError));
  }

  consumeCoupon(request: CouponConsumeRequest): Observable<CouponConsumption> {
    return this.http.post<CouponConsumption>(`${this.baseUrl}/consume`, request)
      .pipe(catchError(this.handleError));
  }

  getAllCoupons(): Observable<Coupon[]> {
    return this.http.get<Coupon[]>(this.baseUrl)
      .pipe(catchError(this.handleError));
  }

  getValidCoupons(): Observable<Coupon[]> {
    return this.http.get<Coupon[]>(`${this.baseUrl}/valid`)
      .pipe(catchError(this.handleError));
  }

  getCouponByCode(code: string): Observable<Coupon> {
    return this.http.get<Coupon>(`${this.baseUrl}/${code}`)
      .pipe(catchError(this.handleError));
  }

  getCouponConsumptions(couponId: number): Observable<CouponConsumption[]> {
    return this.http.get<CouponConsumption[]>(`${this.baseUrl}/${couponId}/consumptions`)
      .pipe(catchError(this.handleError));
  }

  getCustomerConsumptions(customerId: string): Observable<CouponConsumption[]> {
    return this.http.get<CouponConsumption[]>(`${this.baseUrl}/customers/${customerId}/consumptions`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';
    
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      if (error.error && error.error.message) {
        errorMessage = error.error.message;
      } else if (error.error && error.error.errors) {
        const validationErrors = error.error as ValidationErrorResponse;
        errorMessage = Object.values(validationErrors.errors).join(', ');
      } else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
    }
    
    return throwError(() => new Error(errorMessage));
  }
}