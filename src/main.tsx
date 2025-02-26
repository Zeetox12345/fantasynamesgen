import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Check if we need to redirect based on sessionStorage
// This is used in conjunction with the 404.html page for GitHub Pages
const redirect = sessionStorage.getItem('redirect');
if (redirect) {
  sessionStorage.removeItem('redirect');
  window.history.replaceState(null, '', redirect);
}

createRoot(document.getElementById("root")!).render(<App />);
