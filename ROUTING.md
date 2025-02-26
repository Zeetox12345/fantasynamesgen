# Routing Configuration for FantasyNamesGen

This document explains how the routing is configured in FantasyNamesGen to ensure that direct links to routes work correctly.

## The Problem

FantasyNamesGen is a Single Page Application (SPA) built with React Router. In SPAs, routing is handled on the client side by JavaScript. When you access a route directly (e.g., by entering `/fantasy/space-ranger` in the browser or refreshing the page), the server needs to be configured to serve the `index.html` file instead of looking for a file at that path.

If the server is not configured correctly, you will get 404 errors when trying to access routes directly.

## The Solution

We have implemented a solution that works across different hosting platforms:

1. **Server Configuration**: We have included configuration files for various hosting platforms (Vercel, Netlify, Apache, Nginx) to ensure that all requests are redirected to `index.html`.

2. **Client-Side Fallback**: In case the server configuration doesn't work, we have implemented a client-side fallback in `main.tsx` and `404.html` that will redirect the user to the correct route.

## Deployment Instructions

### Vercel

Vercel automatically handles SPA routing with the included `vercel.json` file:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

1. Connect your repository to Vercel
2. Vercel will automatically detect the build settings
3. Deploy

### Netlify

Netlify automatically handles SPA routing with the included `_redirects` file and `netlify.toml`:

```
/* /index.html 200
```

1. Connect your repository to Netlify
2. Set the build command to `npm run build`
3. Set the publish directory to `dist`
4. Deploy

### Apache Server

If you're deploying to an Apache server, use the included `.htaccess` file:

```apache
RewriteEngine On
# If an existing asset or directory is requested go to it as it is
RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -f [OR]
RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -d
RewriteRule ^ - [L]

# If the requested resource doesn't exist, use index.html
RewriteRule ^ /index.html
```

### Nginx Server

If you're deploying to an Nginx server, use the included `nginx.conf` file:

```nginx
server {
  listen 80;
  
  location / {
    root /usr/share/nginx/html;
    index index.html index.htm;
    try_files $uri $uri/ /index.html;
  }
}
```

### Other Hosting Platforms

For other hosting platforms, ensure that all requests are redirected to `index.html`. If this is not possible, our client-side fallback should still work in most cases.

## Testing

After deploying, you can test if direct links work by:

1. Accessing the application at the root URL (e.g., `https://yourdomain.com`)
2. Navigating to `/test-links.html` (e.g., `https://yourdomain.com/test-links.html`)
3. Clicking on the links to test if they work correctly

If you encounter any issues, please check the server logs and make sure that the server is configured correctly to handle SPA routing.

## How the Client-Side Fallback Works

1. When a user accesses a route directly, the server should serve `index.html`.
2. If the server is not configured correctly and returns a 404 error, the browser will load `404.html`.
3. `404.html` stores the requested path in `sessionStorage` and redirects to the root URL with a `redirect=true` parameter.
4. `main.tsx` detects the `redirect=true` parameter, retrieves the stored path from `sessionStorage`, and uses `history.replaceState` to navigate to the correct route.

This approach ensures that direct links work even if the server is not configured correctly, but it's still recommended to configure the server properly for the best user experience. 