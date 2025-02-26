# Deployment Guide for FantasyNamesGen

This guide explains how to deploy the FantasyNamesGen application to various hosting providers while ensuring that direct links to routes work correctly.

## Understanding the Issue

FantasyNamesGen is a Single Page Application (SPA) built with React Router. In SPAs, routing is handled on the client side by JavaScript. When you access a route directly (e.g., by entering `/fantasy/space-ranger` in the browser or refreshing the page), the server needs to be configured to serve the `index.html` file instead of looking for a file at that path.

## Deployment Options

### Netlify

Netlify automatically handles SPA routing if you include a `_redirects` file in your build output. This file is already included in the `public` directory.

1. Connect your repository to Netlify
2. Set the build command to `npm run build`
3. Set the publish directory to `dist`
4. Deploy

Alternatively, you can use the `netlify.toml` file which is also included in the repository.

### Vercel

Vercel automatically handles SPA routing if you include a `vercel.json` file in your repository. This file is already included.

1. Connect your repository to Vercel
2. Vercel will automatically detect the build settings
3. Deploy

### GitHub Pages

GitHub Pages requires a custom solution:

1. Set the build command to `npm run build`
2. Deploy the contents of the `dist` directory to GitHub Pages
3. The included `404.html` file and the redirect logic in `main.tsx` will handle direct access to routes

### Apache Server

If you're deploying to an Apache server:

1. Build the application with `npm run build`
2. Copy the contents of the `dist` directory to your server
3. Ensure the `.htaccess` file is included in the root directory

### Nginx Server

If you're deploying to an Nginx server:

1. Build the application with `npm run build`
2. Copy the contents of the `dist` directory to your server
3. Configure your Nginx server using the provided `nginx.conf` as a reference

## Testing Your Deployment

After deploying, test direct access to routes by:

1. Navigating to your deployed site
2. Entering a direct URL like `https://yourdomain.com/fantasy/space-ranger`
3. Refreshing the page while on a route

If everything is configured correctly, these actions should not result in 404 errors. 