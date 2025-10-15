# Deployment Guide

## Quick Fix for "Failed to load user data" Error

The main issue was that the app was trying to fetch data from `http://localhost:3000` in production, which doesn't exist.

### What was fixed:
1. **URL Resolution**: Changed from hardcoded localhost URL to relative URL (`/api/users`) which works in both development and production
2. **Error Handling**: Improved error messages to show more helpful debugging information
3. **Server Component**: The app now properly uses Next.js server components for data fetching
4. **Dynamic Server Usage**: Fixed the "Dynamic server usage: no-store fetch" error by using proper caching strategy and force-dynamic configuration

### Deployment Steps:

#### For Vercel:
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy - no additional configuration needed

#### For Netlify:
1. Build the project: `npm run build`
2. Deploy the `.next` folder
3. Make sure to set the build command to `npm run build`

#### For other platforms:
1. Run `npm run build` to create the production build
2. Deploy the entire project folder
3. Make sure Node.js is available on your hosting platform

### Environment Variables (Optional):
If you need to set a custom base URL, create a `.env.local` file:
```
NEXT_PUBLIC_APP_URL=https://your-app-domain.com
```

### Testing the API:
After deployment, you can test the API endpoint directly:
- `https://your-app-domain.com/api/users`

This should return the mock user data in JSON format.

### CORS Configuration:
CORS is configured directly in `next.config.mjs` using Next.js headers configuration:

```javascript
// Example of fetching from another application:
fetch('https://your-app-domain.com/api/users')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

**Configuration**: 
- Edit `next.config.mjs` to customize CORS settings
- The `headers()` function applies CORS headers to all `/api/*` routes
- No need for custom CORS handling in individual API routes

**Security Note**: Update the `Access-Control-Allow-Origin` value in `next.config.mjs` to restrict access to specific domains in production.

### Common Issues:
1. **Build Errors**: Make sure all dependencies are installed with `npm install`
2. **API Not Working**: Check that the deployment platform supports Node.js serverless functions
3. **Environment Variables**: Ensure any required environment variables are set in your deployment platform
4. **Dynamic Server Usage Error**: If you see "Dynamic server usage: no-store fetch" error, the app is now configured with `export const dynamic = 'force-dynamic'` to handle this properly
