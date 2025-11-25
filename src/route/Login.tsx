import logo from "../assets/logo.png"
import button from "../assets/button.png"
import battleIcon from "../assets/battling_icon.png"
import dungioneeringIcon from "../assets/dungioneering_icon_small.png"
import miningIcon from "../assets/mining_icon.png"
import woodcuttingIcon from "../assets/woodcutting_icon.png"
import quarryingIcon from "../assets/quarrying_icon.png"
import runecraftingIcon from "../assets/runecrafting_icon.png"
import jewelcraftingIcon from "../assets/jewelcrafting_icon.png"
import herbloreIcon from "../assets/herblore_icon.png"
import marketIcon from "../assets/market_icon.png"
import clansIcon from "../assets/clans_icon.png"
import chatIcon from "../assets/chat_icon.png"
import { useState } from "react"
import AuthPopup from "../components/AuthPopup"

function Login() {
  const [activeForm, setActiveForm] = useState("")



  return (
    <>
      <AuthPopup form={activeForm} formSelector={(form: string) => setActiveForm(form)} />

      < div className=" px-8 w-[1250px] min-h-lvh m-auto pt-2" >

        <img src={logo} alt="" className="w-[65%] mx-auto" />

        <div className=" text-center p-2 font-pixel text-[1.4rem]">
          There are currently 67,420 players online!
        </div>

        <div className="flex justify-center gap-5 text-[1.8rem] font-semibold mb-11 mt-3 h-[150px]">
          <button className="relative hover:cursor-pointer" onClick={() => setActiveForm("login")}>
            <img src={button} alt="" className="h-full -z-1" />
            <span className=" rounded-md hover:bg-[#00000033] z-1 absolute inset-0 pb-1.5 flex justify-center items-center hover:underline">Login</span>
          </button>
          <button className="relative hover:cursor-pointer" onClick={() => setActiveForm("register")}>
            <img src={button} alt="" className="h-full" />
            <span className=" rounded-md hover:bg-[#00000033] z-1 absolute inset-0 pb-1.5 flex justify-center items-center hover:underline">Register</span>
            <div className="absolute inset-0 top-24 font-pixel text-[#FFEF60] text-[1.1rem] outline-text">no email required</div>
          </button>
        </div>

        <div className="bg-black border-2 border-[#382418] p-1 m-auto mb-2.5 w-[81%] h-107">
          <div className=" underline underline-offset-4 text-[1.45rem]/6">Skilling&nbsp;&nbsp;&nbsp;</div>
          <div className="text-[1.1rem]/5 my-px">
            Battle through various areas and dungeons, level up skills, and obtaining valuable items as you progress...
          </div>
          <ul className="text-[1.1rem]/5.5 my-1 mx-0.5">
            <li className="grid grid-cols-[0.34fr_10fr]"><img src={battleIcon} alt="" className="inline-block max-h-5 max-w-6 m-auto" /><span><span className="text-[#90C040]">Battling</span>: Fight monsters, collecting dungeon keys and components to increase your power...</span></li>
            <li className="grid grid-cols-[0.34fr_10fr]"><img src={dungioneeringIcon} alt="" className="inline-block max-h-5 max-w-6 m-auto" /><span><span className="text-[#90C040]">Dungeoneering</span>: Make your way through dungeons to obtain loot from the chest at the end...</span></li>
            <li className="grid grid-cols-[0.34fr_10fr]"><img src={miningIcon} alt="" className="inline-block max-h-5 max-w-6 m-auto" /><span><span className="text-[#90C040]">Mining</span>: Gather metal for your clan, and collect gems to craft rings...</span></li>
            <li className="grid grid-cols-[0.34fr_10fr]"><img src={woodcuttingIcon} alt="" className="inline-block max-h-5 max-w-6 m-auto" /><span><span className="text-[#90C040]">Woodcutting</span>: Gather wooad for your clan, collecting sap to craft potions...</span></li>
            <li className="grid grid-cols-[0.34fr_10fr]"><img src={quarryingIcon} alt="" className="inline-block max-h-5 max-w-6 m-auto" /><span><span className="text-[#90C040]">Quarrying</span>: Gather stone for your clan, collecting valuable stones to craft runes...</span></li>
          </ul>
          <div className=" underline underline-offset-4 text-[1.45rem] leading-6">Crafting&nbsp;&nbsp;&nbsp;</div>
          <div className="text-[1.1rem]/5 my-px">
            All items are crafted by players. Only the highest level crafters can make the highest level items. Choose your crafting skills, power up, and supply the items on the market.
          </div>
          <ul className="text-[1.1rem]/5.5 my-1 mx-0.5">
            <li className="grid grid-cols-[0.34fr_10fr]"><img src={runecraftingIcon} alt="" className="inline-block max-h-5 max-w-6 m-auto" /><span><span className="text-[#90C040]">Runecrafting</span>: Craft runes to provide benefits in battlings...</span></li>
            <li className="grid grid-cols-[0.34fr_10fr]"><img src={jewelcraftingIcon} alt="" className="inline-block max-h-5 max-w-6 m-auto" /><span><span className="text-[#90C040]">Jewelcrafting</span>: Craft rings to increase your power...</span></li>
            <li className="grid grid-cols-[0.34fr_10fr]"><img src={herbloreIcon} alt="" className="inline-block max-h-5 max-w-6 m-auto" /><span><span className="text-[#90C040]">Herblore</span>: Craft potions that boost resources, experience and more...</span></li>
          </ul>
          <div className=" underline underline-offset-4 text-[1.45rem] leading-6">Multiplayer&nbsp;&nbsp;&nbsp;</div>
          <div className="text-[1.1rem]/5 my-px">
            Talk with other players, team up in clans, and trade on the player market
          </div>
          <ul className="text-[1.1rem]/5.5 my-1 mx-0.5">
            <li className="grid grid-cols-[0.34fr_10fr]"><img src={marketIcon} alt="" className="inline-block h-5 m-auto" /><span><span className="text-[#90C040]">Market</span>: Buy and Sell items on the player market... </span></li>
            <li className="grid grid-cols-[0.34fr_10fr]"><img src={clansIcon} alt="" className="inline-block h-5 m-auto" /><span><span className="text-[#90C040]">Clans</span>: Team up with players, level up your clan, and more...</span></li>
            <li className="grid grid-cols-[0.34fr_10fr]"><img src={chatIcon} alt="" className="inline-block max-h-5 max-w-6 m-auto" /><span><span className="text-[#90C040]">Chat</span>: Talk with other players...</span></li>
          </ul>
        </div>
      </div >
    </>
  )
}

export default Login
