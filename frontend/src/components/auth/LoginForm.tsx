import { useState, type FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import { loginUser } from "../../slices/AuthSlice"
import { setCurrentView } from "../../slices/UIDataSlice";
import { OpenEye, ClosedEye } from "../../assets/icons";


function LoginForm({ formSelector, onClose }: { formSelector: (form: string) => void, onClose: () => void }) {

    const error = useSelector((state: RootState) => state.auth.error)
    const dispatch = useDispatch<AppDispatch>()

    const [passwordVisible, setPasswordVisable] = useState(false);

    // handle transition to forget page
    async function forgotPassword() {
        const modal = document.querySelector('.animate-scaleIn') as HTMLElement
        modal.classList.add('animate-scaleOut')
        await new Promise(resolve => setTimeout(resolve, 200))
        modal.classList.remove('animate-scaleOut')
        formSelector("forgot")
    }

    async function login(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget);
        const username = formData.get("username")
        const password = formData.get("password")
        dispatch(loginUser({ username: username as string, password: password as string }))
        dispatch(setCurrentView("Home"))
        // dispatch(resetPlayer())
    }

    return (
        <>

            <form onSubmit={login}>

                <header className="border-[#373737] border-b flex justify-between text-xl font-semibold">
                    <span className="px-4 pb-4 pt-3">Authentication</span>
                    <button className="pb-1 mb-5 px-3 text-[#AAAAAA] hover:text-[#DDDDDD] hover:cursor-pointer font-pixelold text-2xl" onClick={onClose}>x</button>
                </header>

                <div className="px-7 py-3 bg-grey2 flex flex-wrap justify-center ">
                    {error && <><div className="w-25"></div><div className="w-80 text-red-500 mb-1">{error}</div></>}

                    <label htmlFor="username" className="w-25 my-auto py-2 text-center">Username</label>
                    <input className="w-80 p-1.5 my-2 bg-black border border-[#382418]" id="username" name="username" placeholder="" required />
                    <label htmlFor="password" className="w-25 my-auto py-2 text-center">Password</label>

                    <div className="relative my-2">
                        <input type={passwordVisible ? "text" : "password"} className="w-80 p-1.5 pr-10 bg-black border border-[#382418]" id="password" name="password" placeholder="" required />
                        <div className=" absolute right-0 top-0 cursor-default h-full w-10.5" />
                        {/* show password toggle*/}
                        <button type="button" onClick={() => setPasswordVisable(!passwordVisible)}
                            className="absolute right-1 top-1/2 -translate-y-1/2 hover:cursor-pointer h-8 w-8 rounded-full flex items-center justify-center text-greywhitedim hover:text-greywhitedim2 hover:bg-grey5">
                            {passwordVisible ? <OpenEye className="h-3/4 w-3/4" /> : <ClosedEye className="h-3/4 w-3/4" />}
                        </button>
                    </div>
                    <div className="w-25"></div><div className="p-1 pt-0 mr- w-80 text-blue-400"><span className="hover:cursor-pointer hover:underline" onClick={forgotPassword}>Forgot password?</span></div>
                </div>

                <footer className="flex justify-end gap-4 p-4 border-[#373737] border-t">
                    <button className="bg-[#382418] border-[#251911] border-2 hover:bg-[#492f1f] hover:cursor-pointer px-4 py-2" onClick={onClose}>Close</button>
                    <button className="bg-[#5a7e26] border-[#3a5218] border-2 hover:bg-[#72A22F] hover:cursor-pointer px-4 py-2" type="submit">Login</button>
                </footer>
            </form >
        </>
    )
}

export default LoginForm;