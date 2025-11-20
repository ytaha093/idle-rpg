import backround from "../assets/bg.jpg"
import logo from "../assets/logo.png"
import button from "../assets/button.png"

function Login() {

  return (
    <div className="bg-repeat-y bg-center bg-contain px-8 w-[1200px] h-lvh m-auto" style={{ backgroundImage: `url(${backround})` }}>
      <img src={logo} alt="" className="w-[60%] mx-auto" />

      <div className=" text-center p-2.5 font-pixel text-[1.05rem]">
        There are currently 67,420 players online!
      </div>

      <div className="flex justify-center gap-4 text-2xl font-semibold">
        <button className="h-[126px] w-[152px] bg-no-repeat bg-contain hover:underline hover:cursor-pointer" style={{ backgroundImage: `url(${button})` }}>
          Login
        </button>
        <button className="h-[126px] w-[152px] bg-no-repeat bg-center hover:underline hover:cursor-pointer" style={{ backgroundImage: `url(${button})` }}>
          Register
        </button>
      </div>
    </div>
  )
}

export default Login
