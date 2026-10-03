import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AppContextProvider } from './context/AppContext.jsx'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
   <AppContextProvider>
    <App />
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: {
          background: '#FFFFFF',
          color: '#1F2937',
          fontSize: '0.875rem',
          fontFamily: 'Inter, system-ui, sans-serif',
          border: '1px solid #E5E7EB',
          borderRadius: '0.5rem',
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.07), 0 2px 4px -2px rgb(0 0 0 / 0.05)',
          padding: '12px 16px',
        },
        success: {
          iconTheme: { primary: '#16A34A', secondary: '#FFFFFF' },
        },
        error: {
          iconTheme: { primary: '#DC2626', secondary: '#FFFFFF' },
        },
      }}
    />
   </AppContextProvider>
)
