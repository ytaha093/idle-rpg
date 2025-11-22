function AuthPopup({ form, onClose }) {
    if (!form) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">

            {/* BG Overlay */}
            <div
                className="absolute inset-0 bg-black animate-fadeIn opacity-50"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative z-10 animate-scaleIn bg-[#181818] border-2 border-[#382418] p-6 rounded-lg w-[450px] text-white font-pixel">
                {form === "login" && (
                    <>
                        <h2 className="text-[1.8rem] mb-4">Login</h2>
                        <input className="w-full p-2 mb-3 bg-black border border-[#382418]" placeholder="Username" />
                        <input className="w-full p-2 mb-3 bg-black border border-[#382418]" type="password" placeholder="Password" />
                        <button className="w-full bg-[#382418] text-white p-2">Login</button>
                    </>
                )}

                {form === "register" && (
                    <>
                        <h2 className="text-[1.8rem] mb-4">Register</h2>
                        <input className="w-full p-2 mb-3 bg-black border border-[#382418]" placeholder="Username" />
                        <button className="w-full bg-[#382418] text-white p-2">Register</button>
                    </>
                )}
            </div>
        </div>
    );
}

export default AuthPopup