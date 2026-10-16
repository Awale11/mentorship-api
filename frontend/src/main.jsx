import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { BrowserRouter } from "react-router";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from "@/components/ui/toast"

// wa queryClient oo applicationkeena dhan manage garayn lahaa
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // illa goormee fresh ahaanee data-da
      staleTime: 60 * 1000
    }
  }
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <Toaster/>
         {/* every component APP.js ayay so iman doonaan.and app.js reacy-query ayuu access ka helaa*/}
      <App />
      </BrowserRouter>
      {/* react-query-devtools */}
      <ReactQueryDevtools initialIsOpen={false} />

    </QueryClientProvider>
    
  </StrictMode>,
)
