import { createSlice } from "@reduxjs/toolkit";

type authObj = { loggedIn: boolean, token?: string }

const initialState: authObj = JSON.parse(localStorage.getItem("auth") || `{"loggedIn": false}`)

const authSlice = createSlice({
    name: "auth status",
    initialState: initialState,
    reducers: {
        loginAction: (state) => {
            let newstate = state
            newstate.loggedIn = true
            localStorage.setItem("auth", JSON.stringify(newstate))
            state.loggedIn = true
        },
        logoutAction: (state) => {
            localStorage.clear()
            state.loggedIn = false
        },
    }
})



export const { loginAction, logoutAction } = authSlice.actions
export default authSlice.reducer