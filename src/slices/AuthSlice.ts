import { createSlice } from "@reduxjs/toolkit";



const authSlice = createSlice({
    name: "auth status",
    initialState: false,
    reducers: {
        loginAction: () => true,
        logoutAction: () => false,
    }
})



export const { loginAction, logoutAction } = authSlice.actions
export default authSlice.reducer