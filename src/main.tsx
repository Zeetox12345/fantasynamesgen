import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// This script helps handle direct navigation to routes on servers that don't support SPA routing
// It will redirect from /404.html to the correct route with a query parameter
const pathname = window.location.pathname;
const search = window.location.search;

// Only redirect if we're not at the root and not already handling a redirect
if (pathname !== '/' && 
    pathname !== '/index.html' && 
    pathname !== '/404.html' && 
    pathname !== '/vercel-fallback.html' && 
    !search.includes('redirect=')) {
  // Store the full path in sessionStorage
  sessionStorage.setItem('redirectPath', pathname + search);
  
  // Check if we need to redirect through 404.html
  // This helps with GitHub Pages and other static hosts
  if (window.location.href.includes('github.io') || 
      window.location.href.includes('netlify.app') ||
      window.location.href.includes('vercel.app')) {
    
    // For Vercel specifically, use the vercel-fallback.html
    if (window.location.href.includes('vercel.app')) {
      window.location.href = '/vercel-fallback.html?redirect=true';
    } else {
      window.location.href = '/404.html?redirect=true';
    }
  }
}

// If we're handling a redirect from 404.html or vercel-fallback.html
if (search.includes('redirect=true')) {
  const redirectPath = sessionStorage.getItem('redirectPath');
  if (redirectPath) {
    sessionStorage.removeItem('redirectPath');
    window.history.replaceState(null, '', redirectPath);
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
