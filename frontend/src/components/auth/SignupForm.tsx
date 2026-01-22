import { useState, type FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import { createUser } from "../../slices/AuthSlice";
import { setCurrentView } from "../../slices/UIDataSlice";
import { ClosedEye, OpenEye } from "../../assets/icons";

function SignupForm({ onClose }: { onClose: () => void }) {

    const [email, setEmail] = useState("")
    const error = useSelector((state: RootState) => state.auth.error)

    const dispatch = useDispatch<AppDispatch>()

    const [passwordVisible, setPasswordVisable] = useState(false);
    const [confirmVisible, setConfirmVisible] = useState(false);



    async function signup(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget);
        const username = formData.get("username")
        const password = formData.get("password")
        const confirm = formData.get("confirm")
        const email = formData.get("email")
        dispatch(createUser({ username: username as string, password: password as string, confirm: confirm as string, email: email as string }))
        dispatch(setCurrentView("Home"))
    }

    return (
        <form onSubmit={signup}>
            <header className="border-[#373737] border-b  flex justify-between text-xl font-semibold">
                <span className="px-4 pb-4 pt-3">Create an account</span>
                <button className="pb-1 mb-5 px-3 text-[#AAAAAA] hover:text-[#DDDDDD] hover:cursor-pointer font-pixelold text-2xl" onClick={onClose}>x</button>
            </header>
            <div className="px-3 py-3 bg-grey2 grid grid-cols-[6fr_6fr] gap-x-3 font-medium">
                {error && <><div className=""></div><div className="w-80 text-red-500 mb-1">{error}</div></>}

                <label htmlFor="username" className="my-auto py-2 text-end">Username<span className="text-red-400">*</span></label>
                <input className="w-80 p-1.5 my-2 bg-black border border-[#382418]" id="username" name="username" required />

                <label htmlFor="password" className="my-auto py-2 text-end">Password<span className="text-red-400">*</span></label>
                <div className="relative my-2">
                    <input type={passwordVisible ? "text" : "password"} className="w-80 p-1.5 pr-10 bg-black border border-[#382418]" id="password" name="password" required />
                    <div className=" absolute right-0 top-0 cursor-default h-full w-10.5" />
                    {/* show password toggle*/}
                    <button type="button" onClick={() => setPasswordVisable(!passwordVisible)}
                        className="absolute right-1 top-1/2 -translate-y-1/2 hover:cursor-pointer h-8 w-8 rounded-full flex items-center justify-center text-greywhitedim hover:text-greywhitedim2 hover:bg-grey5">
                        {passwordVisible ? <OpenEye className="h-3/4 w-3/4" /> : <ClosedEye className="h-3/4 w-3/4" />}
                    </button>
                </div>


                <label htmlFor="confirm" className="my-auto py-2 text-end">Confirm Password<span className="text-red-400">*</span></label>
                <div className="relative my-2">
                    <input type={confirmVisible ? "text" : "password"} className="w-80 p-1.5 pr-10 bg-black border border-[#382418]" id="confirm" name="confirm" required />
                    <div className=" absolute right-0 top-0 cursor-default h-full w-10.5" />
                    {/* show password toggle*/}
                    <button type="button" onClick={() => setConfirmVisible(!confirmVisible)}
                        className="absolute right-1 top-1/2 -translate-y-1/2 hover:cursor-pointer h-8 w-8 rounded-full flex items-center justify-center text-greywhitedim hover:text-greywhitedim2 hover:bg-grey5">
                        {confirmVisible ? <OpenEye className="h-3/4 w-3/4" /> : <ClosedEye className="h-3/4 w-3/4" />}
                    </button>
                </div>



                <label htmlFor="email" className="my-auto py-2 text-end pr-1">Email</label>
                <input className="w-80 p-1.5 my-2 bg-black border border-[#382418]" id="email" name="email" type="text" pattern="^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$"
                    title="Please enter a valid email (ex: name@example.com)" onChange={(e) => setEmail(e.target.value)} />

                {email === "" && (
                    <div className="text col-span-2 text-center text-rsyellow text-sm">! Without an email password recovery will be impossible !</div>
                )}
            </div>
            <footer className="flex justify-end gap-4 p-4 border-[#373737] border-t">
                <button className="bg-[#382418] border-[#251911] border-2 hover:bg-[#492f1f] hover:cursor-pointer px-4 py-2" onClick={onClose}>Close</button>
                <button className="bg-[#5a7e26] border-[#3a5218] border-2 hover:bg-[#72A22F] hover:cursor-pointer px-4 py-2" type="submit">Register</button>
            </footer>
        </form>
    )
}

export default SignupForm;