import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Handle SPA redirects from 404.html
(function() {
  // Get the redirect flag from URL
  const searchParams = new URLSearchParams(window.location.search);
  const redirectFlag = searchParams.get('spa-redirect');
  
  if (redirectFlag === 'true') {
    // Remove the flag from URL
    const newUrl = window.location.pathname + 
      window.location.search.replace(/(\?|&)spa-redirect=true(&|$)/, '$1').replace(/\?$/, '') + 
      window.location.hash;
    
    // Get the stored path from sessionStorage
    const redirectPath = sessionStorage.getItem('spa-redirect');
    
    if (redirectPath) {
      // Clear the stored path
      sessionStorage.removeItem('spa-redirect');
      
      // Replace the current URL with the original path
      window.history.replaceState(null, '', redirectPath);
    } else {
      // If no stored path, just clean up the URL
      window.history.replaceState(null, '', newUrl);
    }
  }
})();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
