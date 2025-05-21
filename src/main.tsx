import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './App.tsx'
import { ToastContainer} from 'react-toastify'
import { MovieProvider } from './components/MovieContext/index.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    
    <ToastContainer autoClose={1500}  position='top-center' toastStyle={{backgroundColor:'#000', color: '#fff'}}/>
    <MovieProvider>
    <RouterProvider router={router} />
    </MovieProvider>
  </StrictMode>,
)
