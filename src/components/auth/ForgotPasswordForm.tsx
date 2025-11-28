import type { FormEvent } from "react";

function ForgotPasswordForm({ onClose }: { onClose: () => void }) {


    async function forgotPassword(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
    }

    return (
        <form onSubmit={forgotPassword}>
            <header className="border-[#373737] border-b flex justify-between text-2xl font-bold">
                <span className="px-4 pb-4 pt-3">Reset your password</span>
                <button className="pb-1 mb-5 px-3 text-[#AAAAAA] hover:text-[#DDDDDD] hover:cursor-pointer" onClick={onClose}>x</button>
            </header>
            <div className="px-4 py-3 bg-[#181818] flex flex-wrap justify-center text-lg font-medium">
                <span className=" basis-full text-center">Enter your email to get a password reset link.</span>
                <span className="basis-full text-center text-sm text-rsyellow">Accounts without an associated email cannot be recovered.</span>
                <label htmlFor="username" className="w-25 my-auto py-2 text-center">Email</label>
                <input className="w-80 p-1.5 my-2 bg-black border border-[#382418]" id="email" type="text" pattern="^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$" title="Please enter a valid email (ex: name@example.com)" required />
            </div>
            <footer className="flex justify-end gap-4 p-4 border-[#373737] border-t text-lg">
                <button className="bg-[#382418] border-[#251911] border-2 hover:bg-[#492f1f] hover:cursor-pointer px-4 py-2" onClick={onClose}>Close</button>
                <button className="bg-[#5a7e26] border-[#3a5218] border-2 hover:bg-[#72A22F] hover:cursor-pointer px-4 py-2" type="submit">Reset</button>
            </footer>
        </form>
    )
}

export default ForgotPasswordForm;