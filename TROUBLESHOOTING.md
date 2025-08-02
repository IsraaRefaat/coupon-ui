# Troubleshooting Guide

## API Connection Issues

### Error: "Error Code: 0 Message: Http failure response for http://localhost:8080/api/coupons: 0 Unknown Error"

This error typically occurs due to CORS (Cross-Origin Resource Sharing) issues or network connectivity problems.

#### Solutions:

1. **Use Proxy Configuration (Recommended)**
   - The project is configured with a proxy to handle CORS issues
   - Restart the development server: `ng serve`
   - The proxy will forward requests from `/api/*` to `http://localhost:8080/api/*`

2. **Check Backend Server**
   - Ensure your Spring Boot backend is running on port 8080
   - Test with: `Invoke-WebRequest -Uri "http://localhost:8080/api/coupons" -Method GET`

3. **Enable CORS on Backend**
   If you have access to the backend, add CORS configuration:

   ```java
   @Configuration
   public class CorsConfig implements WebMvcConfigurer {
       @Override
       public void addCorsMappings(CorsRegistry registry) {
           registry.addMapping("/api/**")
                   .allowedOrigins("http://localhost:4200")
                   .allowedMethods("GET", "POST", "PUT", "DELETE")
                   .allowedHeaders("*");
       }
   }
   ```

4. **Check Network/Firewall**
   - Ensure no firewall is blocking port 8080
   - Check if antivirus software is interfering

5. **Alternative: Direct Connection**
   If proxy doesn't work, you can temporarily use direct connection:
   
   ```typescript
   // In src/environments/environment.ts
   export const environment = {
     production: false,
     apiUrl: 'http://localhost:8080/api/coupons'
   };
   ```

#### Debugging Steps:

1. Open browser developer tools (F12)
2. Go to Network tab
3. Try to load the coupons page
4. Check if the API request is being made
5. Look for CORS errors in the console

#### Common Issues:

- **Backend not running**: Start your Spring Boot application
- **Wrong port**: Ensure backend is on port 8080
- **CORS policy**: Use the proxy configuration
- **Network issues**: Check firewall/antivirus settings

#### Testing API Connection:

The app now includes a connection test on startup. Check the browser console for:
- ✅ "API connection successful!" - Everything is working
- ❌ "API connection failed:" - See the error details

#### Environment Configuration:

- **Development**: Uses proxy (`/api/coupons`)
- **Production**: Uses direct URL (configure in `environment.prod.ts`)

If you're still having issues, please check:
1. Backend server logs for errors
2. Browser console for detailed error messages
3. Network tab in browser dev tools 