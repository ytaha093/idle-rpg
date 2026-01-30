import { createSlice } from "@reduxjs/toolkit";
import { createUser, hydrateUser, loginUser, logoutUser } from "./thunks/authThunk";

type authObj = { loggedIn: boolean, loading: boolean, error?: string }

const initialState: authObj = {
    loggedIn: (localStorage.getItem("loggedIn") === "true"),
    loading: (localStorage.getItem("loggedIn") === "true"),
}

const authSlice = createSlice({
    name: "auth status",
    initialState: initialState,
    reducers: {
        loginAction: (state) => {
            state.loggedIn = true
        },
        logoutAction: (state) => {
            state.loggedIn = false
        },
        resetForm: (state) => {
            state.error = undefined
            state.loading = false
        }
    }, extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state) => {
                state.loggedIn = true
                state.error = undefined
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loggedIn = false;
                state.error = action.payload || "An error occurred";
                state.loading = false
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true
            })
            .addCase(createUser.fulfilled, (state) => {
                state.loggedIn = true
                state.error = undefined
            })
            .addCase(createUser.rejected, (state, action) => {
                state.error = action.payload || "An error occurred";
                state.loading = false
            })
            .addCase(createUser.pending, (state) => {
                state.loading = true
            })
            .addCase(hydrateUser.fulfilled, (state) => {
                localStorage.setItem("loggedIn", "true")
                state.loggedIn = true
                state.loading = false
            })
            .addCase(hydrateUser.pending, (state) => {
                state.loading = true
            })
            .addCase(hydrateUser.rejected, (state) => {
                localStorage.clear()
                state.loading = false
                state.loggedIn = false
            })
            .addCase(logoutUser.fulfilled, (state) => {
                localStorage.clear()
                state.loading = false
                state.loggedIn = false
            })
            .addCase(logoutUser.pending, (state) => {
                state.loading = true
            })
            .addCase(logoutUser.rejected, (state) => {
                localStorage.clear()
                state.loading = false
                state.loggedIn = false
            })
    }
})



export const { loginAction, logoutAction, resetForm } = authSlice.actions
export default authSlice.reducer