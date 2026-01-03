import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import ForgotPasswordForm from "./ForgotPasswordForm";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store";
import { resetForm } from "../../slices/AuthSlice";

function AuthPopup({ form, formSelector }: { form: string, formSelector: (form: string) => void }) {

    const dispatch = useDispatch<AppDispatch>();

    if (!form) return null;

    // keep track of email state for no email warning durring regestration


    // handle transition when closeing authpopup
    async function fadeOutAndClose() {
        const modal = document.querySelector('.animate-scaleIn') as HTMLElement
        const bg = document.querySelector('.animate-fadeIn') as HTMLElement
        bg.classList.add('animate-fadeOut')
        modal.classList.add('animate-scaleOut')
        await new Promise(resolve => setTimeout(resolve, 200))
        dispatch(resetForm())
        formSelector("")
    }

    return (
        <div className="fixed inset-0 pb-24 flex items-center justify-center z-50">

            {/* BG Overlay */}
            <div
                className="absolute inset-0 bg-black animate-fadeIn opacity-60"
                onClick={fadeOutAndClose}
            />

            {/* Modal */}
            <div className="relative z-10 animate-scaleIn bg-[#1d1d1d] w-[550px] text- font-pixel">
                {form === "login" && (
                    <LoginForm formSelector={formSelector} onClose={fadeOutAndClose}></LoginForm>
                )}
                {form === "register" && (
                    <SignupForm onClose={fadeOutAndClose}></SignupForm>
                )}
                {form === "forgot" && (
                    <ForgotPasswordForm onClose={fadeOutAndClose}></ForgotPasswordForm>
                )}
            </div>
        </div>
    );
}

export default AuthPopup