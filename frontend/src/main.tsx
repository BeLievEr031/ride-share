import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/router'
import { ClerkProvider } from '@clerk/clerk-react'

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}
createRoot(document.getElementById('root')!).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
    <RouterProvider router={router} />
  </ClerkProvider>
)
