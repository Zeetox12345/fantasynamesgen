# Vercel Deployment Guide for FantasyNamesGen

This guide provides specific instructions for deploying FantasyNamesGen to Vercel while ensuring that direct links to routes work correctly.

## Deployment Steps

1. **Build the Application**
   ```
   npm run build
   ```

2. **Verify Configuration Files**
   Make sure the following files are present in your project:
   - `vercel.json` in the root directory
   - `404.html` in the public directory
   - `vercel-fallback.html` in the public directory

3. **Deploy to Vercel**
   You can deploy to Vercel in several ways:

   **Option 1: Using the Vercel CLI**
   ```
   npm install -g vercel
   vercel login
   vercel
   ```

   **Option 2: Connect to GitHub Repository**
   - Go to [Vercel](https://vercel.com)
   - Import your GitHub repository
   - Configure the build settings:
     - Build Command: `npm run build`
     - Output Directory: `dist`
     - Install Command: `npm install`

4. **Verify Deployment Settings**
   After deployment, go to your project settings in the Vercel dashboard:
   - Make sure "Rewrites" are enabled
   - Check that the `vercel.json` configuration is being applied

## Troubleshooting

If you're still experiencing 404 errors when accessing routes directly:

1. **Check Vercel Logs**
   - Go to your project in the Vercel dashboard
   - Click on "Deployments"
   - Select your latest deployment
   - Click on "Functions" to see the logs

2. **Verify vercel.json**
   Make sure your `vercel.json` file contains the following:
   ```json
   {
     "rewrites": [
       { "source": "/fantasy", "destination": "/index.html" },
       { "source": "/fantasy/(.*)", "destination": "/index.html" },
       { "source": "/(.*)", "destination": "/index.html" }
     ],
     "routes": [
       { "handle": "filesystem" },
       { "src": "/(.*)", "dest": "/index.html", "status": 200 }
     ],
     "trailingSlash": false
   }
   ```

3. **Try a Fresh Deployment**
   Sometimes, clearing the cache and redeploying can solve routing issues:
   ```
   vercel --prod
   ```

4. **Contact Vercel Support**
   If you've tried everything and still have issues, contact Vercel support with the following information:
   - Your project ID
   - The specific routes that are returning 404 errors
   - The configuration files you're using

## Testing

After deploying, test your routes by:
1. Accessing the application at the root URL (e.g., `https://your-app.vercel.app`)
2. Navigating to `/test-routing.html` (e.g., `https://your-app.vercel.app/test-routing.html`)
3. Clicking on the links to test if they work correctly

If the links work from the test page but not when accessed directly, there might be an issue with the Vercel configuration or caching. 