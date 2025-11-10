import { createContext, useState, type ReactNode } from "react";

export const AuthContext = createContext<any>(null)

export function AuthProvider({ children }: { children: ReactNode }) {

    const [isLogged, setIsLogged] = useState(false)



    return (
        <AuthContext.Provider value={{ isLogged, setIsLogged }}>
            {children}
        </AuthContext.Provider>
    )

}