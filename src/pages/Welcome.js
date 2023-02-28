import React from "react"
import { setLogout } from "../slice/Authslice";
import { useDispatch } from "react-redux";
export const Welcome = () =>{
    const dispatch= useDispatch();
    return(
        <div>
            Welcome to your mail box
            <button onClick={(e)=>{e.preventDefault(); dispatch(setLogout())}}>Log out</button>
        </div>
    );
}