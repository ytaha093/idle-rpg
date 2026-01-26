import { createAsyncThunk } from "@reduxjs/toolkit";

export const hydrateUser = createAsyncThunk<any, void, { rejectValue: string }>(
    "auth/hydrateUser",
    async (_, { rejectWithValue }) => {
        const response = await fetch("/api/auth/me", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        })

        await new Promise(resolve => setTimeout(resolve, 300))

        if (!response.ok) {
            return rejectWithValue("Failed to fetch user data")
        }

        return await response.json();
    }
)

export const loginUser = createAsyncThunk<void, { username: string; password: string }, { rejectValue: string }>(
    "auth/loginUser",
    async ({ username, password }, { rejectWithValue, dispatch }) => {
        const startTime = Date.now();

        const response = await fetch("/api/auth/login", {
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
            return rejectWithValue(errorMsg);
        }

        // Hydrate user data after successful login
        dispatch(hydrateUser())
        return body
    }
)


export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
    const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include"
    })
    const body = await response.json()
    return body
})


export const createUser = createAsyncThunk<void, { username: string; password: string, confirm: string, email: string }, { rejectValue: string }>(
    "auth/createUser",
    async ({ username, password, confirm, email }, { rejectWithValue, dispatch }) => {
        const startTime = Date.now();
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
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(content),
            })
            const body = await response.json();
            if (!response.ok) {
                const errorMsg = body.error || "Login failed";
                return rejectWithValue(errorMsg);
            }
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
