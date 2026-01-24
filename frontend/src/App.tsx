import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import ProtectedRouter from './route/ProtectedRouter.tsx'
import { hydrateUser } from './slices/AuthSlice.ts'
import type { AppDispatch } from './store.ts'
import PageLoader from './components/game/PageLoader.tsx'

export default function App() {
    const dispatch = useDispatch<AppDispatch>()

    // if user shoul;d be logged in, hydrate user data 
    useEffect(() => {
        if (localStorage.getItem("loggedIn")) {
            dispatch(hydrateUser())
        }
    }, [])

    return (<>
        <PageLoader />
        <RouterProvider router={ProtectedRouter} />
    </>)
}
