import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Use requestIdleCallback for non-critical initialization
const initialize = () => {
  const root = document.getElementById("root");
  if (root) {
    createRoot(root).render(<App />);
  }
};

// Use requestIdleCallback if available, otherwise fallback to setTimeout
if ('requestIdleCallback' in window) {
  requestIdleCallback(initialize);
} else {
  setTimeout(initialize, 1);
}