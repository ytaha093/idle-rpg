import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const hydrateUser = createAsyncThunk<any, void, { rejectValue: string }>(
    "auth/hydrateUser",
    async (_, { rejectWithValue }) => {
        const response = await fetch("http://localhost:3000/api/auth/me", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        });

        if (!response.ok) {
            return rejectWithValue("Failed to fetch user data");
        }

        return await response.json();
    }
)

export const loginUser = createAsyncThunk<void, { username: string; password: string }, { rejectValue: string }>(
    "auth/loginUser",
    async ({ username, password }, { rejectWithValue, dispatch }) => {
        const startTime = Date.now();

        const response = await fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ username, password }),
        })
        const body = await response.json();

        // Ensure minimum delay for loading animation
        while (Date.now() - startTime < 600) {
            await new Promise(resolve => setTimeout(resolve, 600 - (Date.now() - startTime)));
        }

        if (!response.ok) {
            const errorMsg = body.error || "Login failed";
            console.log("Login failed:", response.status, errorMsg);
            return rejectWithValue(errorMsg);
        }

        // Hydrate user data after successful login
        dispatch(hydrateUser())
        return body
    }
)

export const createUser = createAsyncThunk<void, { username: string; password: string, confirm: string, email: string }, { rejectValue: string }>(
    "auth/createUser",
    async ({ username, password, confirm, email }, { rejectWithValue, dispatch }) => {
        const startTime = Date.now();
        console.log(username, password, confirm, email);
        if (password !== confirm) {
            await ensureDelay()
            return rejectWithValue("Passwords do not match");
        } else if (password.length < 6) {
            await ensureDelay()
            return rejectWithValue("Password too short");
        } else if (username.length < 3) {
            await ensureDelay()
            return rejectWithValue("Username too short");
        } else {
            const content: { username: string; password: string; email?: string } = { username, password }
            if (email) content.email = email
            const response = await fetch("http://localhost:3000/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(content),
            })
            const body = await response.json();
            if (!response.ok) {
                const errorMsg = body.error || "Login failed";
                console.log("Login failed:", response.status, errorMsg);
                return rejectWithValue(errorMsg);
            }
            console.log(body)
            await ensureDelay()

            // Hydrate user data after successful registration
            dispatch(hydrateUser())
            return body;
        }

        async function ensureDelay() {
            // Ensure minimum delay for loading animation
            while (Date.now() - startTime < 600) {
                await new Promise(resolve => setTimeout(resolve, 600 - (Date.now() - startTime)));
            }
        }
    }
)


type authObj = { loggedIn: boolean, loading: boolean, error?: string }

const initialState: authObj = { loggedIn: false, loading: false }

const authSlice = createSlice({
    name: "auth status",
    initialState: initialState,
    reducers: {
        loginAction: (state) => {
            let newState = state
            newState.loggedIn = true
            //localStorage.setItem("auth", JSON.stringify(newState))
            state.loggedIn = true
        },
        logoutAction: (state) => {
            localStorage.clear()
            state.loggedIn = false
        },
        resetForm: (state) => {
            state.error = undefined
            state.loading = false
        }
    }, extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loggedIn = true;
                state.error = undefined;
                state.loading = false
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loggedIn = false;
                state.error = action.payload || "An error occurred";
                state.loading = false
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.loggedIn = true;
                state.error = undefined;
                state.loading = false
            })
            .addCase(createUser.rejected, (state, action) => {
                state.error = action.payload || "An error occurred";
                state.loading = false
            })
            .addCase(createUser.pending, (state) => {
                state.loading = true
            })
            .addCase(hydrateUser.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(hydrateUser.pending, (state) => {
                state.loading = true
            })
            .addCase(hydrateUser.rejected, (state) => {
                state.loading = false
            })
    }
})



export const { loginAction, logoutAction, resetForm } = authSlice.actions
export default authSlice.reducer