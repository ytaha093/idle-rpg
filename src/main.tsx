import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './main.css'
import ProtectedRouter from './route/ProtectedRouter.tsx'
import { Provider } from 'react-redux'
import { store } from './store.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={ProtectedRouter} />
    </Provider>
  </StrictMode>,
)