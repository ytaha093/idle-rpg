import { useState, type FormEvent } from "react";

function SignupForm({ onClose }: { onClose: () => void }) {

    const [email, setEmail] = useState("")


    async function signup(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
    }

    return (
        <form onSubmit={signup}>
            <header className="border-[#373737] border-b  flex justify-between text-2xl font-bold">
                <span className="px-4 pb-4 pt-3">Create an account</span>
                <button className="pb-1 mb-5 px-3 text-[#AAAAAA] hover:text-[#DDDDDD] hover:cursor-pointer" onClick={onClose}>x</button>
            </header>
            <div className="px-5 py-3 bg-[#181818] grid grid-cols-[3fr_6fr] gap-x-4 text-lg font-medium">
                <label htmlFor="username" className="my-auto py-2 text-end">Username<span className="text-red-400">*</span></label>
                <input className="w-80 p-1.5 my-2 bg-black border border-[#382418]" id="username" required />
                <label htmlFor="password" className="my-auto py-2 text-end">Password<span className="text-red-400">*</span></label>
                <input className="w-80 p-1.5 my-2 bg-black border border-[#382418]" id="password" type="password" required />
                <label htmlFor="confirm" className="my-auto py-2 text-end">Confirm Password<span className="text-red-400">*</span></label>
                <input className="w-80 p-1.5 my-2 bg-black border border-[#382418]" id="confirm" type="password" required />
                <label htmlFor="email" className="my-auto py-2 text-end leading-5">Email</label>
                <input className="w-80 p-1.5 my-2 bg-black border border-[#382418]" id="email" type="text" pattern="^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$"
                    title="Please enter a valid email (ex: name@example.com)" onChange={(e) => setEmail(e.target.value)} />
                {email === "" && (
                    <div className="text col-span-2 text-center text-rsyellow">!! Without an email password recovery will be impossible !!</div>
                )}
            </div>
            <footer className="flex justify-end gap-4 p-4 border-[#373737] border-t text-lg">
                <button className="bg-[#382418] border-[#251911] border-2 hover:bg-[#492f1f] hover:cursor-pointer px-4 py-2" onClick={onClose}>Close</button>
                <button className="bg-[#5a7e26] border-[#3a5218] border-2 hover:bg-[#72A22F] hover:cursor-pointer px-4 py-2" type="submit">Register</button>
            </footer>
        </form>
    )
}

export default SignupForm;