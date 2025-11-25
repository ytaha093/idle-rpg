import { useState } from "react";

function AuthPopup({ form, formSelector }: { form: string, formSelector: (form: string) => void }) {
    if (!form) return null;

    // keep track of email state for no email warning durring regestration
    const [email, setEmail] = useState("")


    // handle transition when closeing authpopup
    async function fadeOutAndClose() {
        const modal = document.querySelector('.animate-scaleIn') as HTMLElement;
        const bg = document.querySelector('.animate-fadeIn') as HTMLElement;
        bg.classList.add('animate-fadeOut');
        modal.classList.add('animate-scaleOut');
        await new Promise(resolve => setTimeout(resolve, 200));
        formSelector("");
    }

    // handle transition to forget page
    async function forgotPassword() {
        const modal = document.querySelector('.animate-scaleIn') as HTMLElement;
        modal.classList.add('animate-scaleOut');
        await new Promise(resolve => setTimeout(resolve, 200)); formSelector("forgot")
        modal.classList.remove('animate-scaleOut');
        formSelector("forgot");
    }

    async function login() {

    }

    async function signup() {

    }

    return (
        <div className="fixed inset-0  pb-24 flex items-center justify-center z-50">

            {/* BG Overlay */}
            <div
                className="absolute inset-0 bg-black animate-fadeIn opacity-50"
                onClick={fadeOutAndClose}
            />

            {/* Modal */}
            <div className="relative z-10 animate-scaleIn bg-[#1d1d1d] w-[550px] text- font-pixel">
                {form === "login" && (
                    <>
                        <header className="border-[#373737] border-b-1  flex justify-between text-2xl font-bold">
                            <span className="px-4 pb-4 pt-3">Authentication</span>
                            <button className="pb-1 mb-5 px-3 text-[#AAAAAA] hover:text-[#DDDDDD] hover:cursor-pointer" onClick={fadeOutAndClose}>x</button>
                        </header>
                        <div className="px-7 py-3 bg-[#181818] flex flex-wrap justify-center text-lg font-medium">
                            <label htmlFor="username" className="w-25 my-auto py-2 text-center">Username</label><input className="w-80 p-1.5 my-2 bg-black border border-[#382418]" id="username" placeholder="" required />
                            <label htmlFor="password" className="w-25 my-auto py-2 text-center">Password</label><input className="w-80 p-1.5 my-2 bg-black border border-[#382418]" id="password" type="password" placeholder="" required />
                            <div className="w-25"></div><div className="p-1 pt-0 mr- w-80 text-blue-400"><span className="hover:cursor-pointer hover:underline" onClick={forgotPassword}>Forgot password?</span></div>
                        </div>
                        <footer className="flex justify-end gap-4 p-4 border-[#373737] border-t-1 text-lg">
                            <button className="bg-[#382418] border-[#251911] border-2 hover:bg-[#492f1f] hover:cursor-pointer px-4 py-2" onClick={fadeOutAndClose}>Close</button>
                            <button className="bg-[#5a7e26] border-[#3a5218] border-2 hover:bg-[#72A22F] hover:cursor-pointer px-4 py-2" type="submit" onClick={login}>Login</button>
                        </footer>
                    </>
                )}
                {form === "register" && (
                    <>
                        <header className="border-[#373737] border-b-1  flex justify-between text-2xl font-bold">
                            <span className="px-4 pb-4 pt-3">Create an account</span>
                            <button className="pb-1 mb-5 px-3 text-[#AAAAAA] hover:text-[#DDDDDD] hover:cursor-pointer" onClick={fadeOutAndClose}>x</button>
                        </header>
                        <div className="px-5 py-3 bg-[#181818] grid grid-cols-[3fr_6fr] gap-x-4 text-lg font-medium">
                            <label htmlFor="username" className="my-auto py-2 text-end">Username<span className="text-red-400">*</span></label><input className="w-80 p-1.5 my-2 bg-black border border-[#382418]" id="username" placeholder="" required />
                            <label htmlFor="password" className="my-auto py-2 text-end">Password<span className="text-red-400">*</span></label><input className="w-80 p-1.5 my-2 bg-black border border-[#382418]" id="password" type="password" placeholder="" required />
                            <label htmlFor="confirm" className="my-auto py-2 text-end">Confirm Password<span className="text-red-400">*</span></label><input className="w-80 p-1.5 my-2 bg-black border border-[#382418]" id="confirm" type="password" placeholder="" required />
                            <label htmlFor="email" className="my-auto py-2 text-end leading-5">Email</label><input className="w-80 p-1.5 my-2 bg-black border border-[#382418]" id="email" type="email" placeholder="" onChange={(e) => setEmail(e.target.value)} />
                            {email === "" && (
                                <div className="text col-span-2 text-center text-[#e4d553]">!! Without an email password recovery will be impossible !!</div>
                            )}
                        </div>
                        <footer className="flex justify-end gap-4 p-4 border-[#373737] border-t-1 text-lg">
                            <button className="bg-[#382418] border-[#251911] border-2 hover:bg-[#492f1f] hover:cursor-pointer px-4 py-2" onClick={fadeOutAndClose}>Close</button>
                            <button className="bg-[#5a7e26] border-[#3a5218] border-2 hover:bg-[#72A22F] hover:cursor-pointer px-4 py-2" type="submit" onClick={signup}>Register</button>
                        </footer>
                    </>
                )}
                {form === "forgot" && (
                    <>
                        password recovery, under construction
                    </>
                )}
            </div>
        </div>
    );
}

export default AuthPopup