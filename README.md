# Coupon Management System Frontend

A modern Angular application for managing coupons, built with Angular 17 and Bootstrap 5.

## Features

- **Coupon Management**: Create, view, and manage coupons
- **Coupon Consumption**: Use coupons with customer and order tracking
- **Consumption History**: View detailed history of coupon usage
- **Responsive Design**: Mobile-friendly interface using Bootstrap 5
- **Real-time Validation**: Form validation and error handling

## Prerequisites

- Node.js (version 16 or higher)
- Angular CLI (version 17)
- Backend API running on `http://localhost:8080` (or configure environment)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd coupon-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure the API URL (optional):
   - Edit `src/environments/environment.ts` for development
   - Edit `src/environments/environment.prod.ts` for production

## Development Server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

```bash
ng serve
```

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

```bash
ng build
```

## Production Build

Run `ng build --configuration production` for a production build.

```bash
ng build --configuration production
```

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── coupon-create/          # Create new coupons
│   │   ├── coupon-list/            # View all coupons
│   │   ├── coupon-consume/         # Use coupons
│   │   └── consumption-history/    # View usage history
│   ├── models/
│   │   └── coupon.model.ts         # TypeScript interfaces
│   ├── services/
│   │   └── coupon.service.ts       # API communication
│   └── app.component.*             # Main app component
├── environments/
│   ├── environment.ts              # Development config
│   └── environment.prod.ts         # Production config
└── index.html                      # Main HTML file
```

## API Endpoints

The application expects the following API endpoints:

- `GET /api/coupons` - Get all coupons
- `GET /api/coupons/valid` - Get valid coupons only
- `GET /api/coupons/{code}` - Get coupon by code
- `POST /api/coupons` - Create new coupon
- `POST /api/coupons/consume` - Consume a coupon
- `GET /api/coupons/{id}/consumptions` - Get coupon consumption history
- `GET /api/coupons/customers/{customerId}/consumptions` - Get customer consumption history

## Technologies Used

- **Angular 17**: Frontend framework
- **Bootstrap 5**: UI framework
- **Font Awesome**: Icons
- **RxJS**: Reactive programming
- **TypeScript**: Type safety

## Troubleshooting

### Common Issues

1. **API Connection Error**: Ensure the backend server is running on the configured port
2. **Build Errors**: Run `npm install` to ensure all dependencies are installed
3. **Icon Issues**: Font Awesome is loaded from CDN, ensure internet connection

### Environment Configuration

To change the API URL, edit the environment files:

```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api/coupons'
};
```

## Author

**Esraa Refaat**

## License

This project is licensed under the MIT License.