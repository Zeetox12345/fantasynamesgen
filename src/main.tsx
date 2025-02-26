import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Enhanced SPA routing support
// This handles direct navigation to routes by working with the 404.html redirect

// Get the current URL parameters
const pathname = window.location.pathname;
const search = window.location.search;
const isRedirect = search.includes('redirect=true');

// Log for debugging
console.log('main.tsx: Current pathname:', pathname);
console.log('main.tsx: Is redirect:', isRedirect);

// Only store the path for redirection if we're not already handling a redirect
// and we're not at a root path
if (pathname !== '/' && 
    pathname !== '/index.html' && 
    pathname !== '/404.html' && 
    !isRedirect) {
  
  // Store the full path in sessionStorage
  const fullPath = pathname + search + window.location.hash;
  console.log('main.tsx: Storing path for potential redirect:', fullPath);
  sessionStorage.setItem('redirectPath', fullPath);
  
  // Check if we're on a hosting platform that requires special handling
  const hostRequiresRedirect = 
    window.location.hostname.includes('github.io') || 
    window.location.hostname.includes('netlify.app') ||
    window.location.hostname.includes('vercel.app') ||
    window.location.hostname.includes('surge.sh');
  
  if (hostRequiresRedirect) {
    console.log('main.tsx: Host requires special handling, redirecting to 404.html');
    window.location.href = '/404.html?redirect=true';
  }
}

// If we're handling a redirect from 404.html
if (isRedirect) {
  const redirectPath = sessionStorage.getItem('redirectPath');
  console.log('main.tsx: Processing redirect to:', redirectPath);
  
  if (redirectPath) {
    // Clear the stored path
    sessionStorage.removeItem('redirectPath');
    
    // Use history API to change the URL without a full page reload
    window.history.replaceState(null, '', redirectPath);
    console.log('main.tsx: Redirect complete, new path:', redirectPath);
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
