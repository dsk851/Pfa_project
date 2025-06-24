import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Home from './home'
import Contact from './contact'
import { ClerkProvider } from '@clerk/clerk-react'
import Profile from './profil'
import Add_listing from './add-listing'
import { Toaster } from "@/components/ui/sonner"
import SearchByCategory from './search/[category]'
import SearchByOptions from './search'
import SearchById from './listing/[item]'


const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/profil",
    element: <Profile />,
  },
  {
    path: "/add-listing",
    element: <Add_listing />,
  },
  {
    path: "/search/:category",
    element: <SearchByCategory />,
  },
  {
    path: "/search",
    element: <SearchByOptions />,
  },
  {
    path: "/item/:id",
    element: <SearchById />,
  },
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <RouterProvider router={router} />
      <Toaster/>
    </ClerkProvider>
  </StrictMode>
)
