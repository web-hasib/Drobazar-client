import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router'
import { router } from './router/router.jsx'
import { ThemeProvider } from './Theme/ThemeProvider.jsx'
import AuthProvider from './provider/AuthProvider.jsx'
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <ThemeProvider>
<AuthProvider>
    <ToastContainer />
    <RouterProvider router={router}></RouterProvider>
</AuthProvider>
    </ThemeProvider>
  </StrictMode>,
)
