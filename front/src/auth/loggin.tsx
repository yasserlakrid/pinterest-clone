import { useState , useEffect } from "react"
import "./loggin.css"
function Loggin(){
    return (

        <>
        <div className="logginPage">
            
             <div className="password email ">
                <input type="text" placeholder="Email"/>
            </div>
            <div className="password">
                <input type="text" placeholder="Password"/>
            </div>
           
            <div className="logginBtnCon">
                <button className="logginBtn"> confirm loggin </button>
            </div>
        </div>
        </>
    )
}
export default Loggin