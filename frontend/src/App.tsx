import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import ProtectedRouter from './route/ProtectedRouter.tsx'
import type { AppDispatch } from './store.ts'
import PageLoader from './components/game/PageLoader.tsx'
import { hydrateUser } from './slices/thunks/authThunk.ts'
export default function App() {

    const dispatch = useDispatch<AppDispatch>()

    // if user should be logged in, hydrate user data 
    useEffect(() => {
        if (localStorage.getItem("loggedIn")) {
            dispatch(hydrateUser())
        }
    }, [])

    return (<>
        <PageLoader startVisible={true} />
        <RouterProvider router={ProtectedRouter} />
    </>)
}
