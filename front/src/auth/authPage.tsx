import { useState , useEffect } from "react"
import SignUp from "./signup"
import Loggin from "./loggin"
import "./authPage.css"

import pinterestLogo from "../assets/pinterest.svg";


function Auth({logged , logginInfo , setLogginInfo} : any){
    
    const [loggedIn , setLoggedIn] = useState(false);
    const [page , setPage] = useState(loggedIn ? "signUp" : "loggin")
    return (
        <div className="AuthPage">
            <Sider />
            <div className="authMain">
                <h1>
                     { page !== "signUp" ? <p>Nice to see you again ! </p> : <p>Welcome to Pintrest</p> } 
                </h1>
                <div className="toggler">
                        <div className="signInBtnCon">
                            <button className="signInBtn" onClick={()=>setPage("signUp")}>
                                Sign in 
                            </button>
                        </div>
                        <div className="logginBtnCon">
                            <button className="logginBtn" onClick={()=>setPage("Loggin")}>
                                 Log in 
                            </button>
                        </div>
            </div>
                {loggedIn || page == "signUp"? (
                    <SignUp logged = {logged}/>
                ):(
                    <Loggin logged = {logged} logginInfo={logginInfo} setLogginInfo={setLogginInfo}/>
                ) }
            </div>
        </div>
        
    )
}

function Sider(){
    return(
        <div className="sider">
                
        <div className="Dividing-sections section-1"></div>
        <div className="Dividing-sections section-2"></div>
        <div className="Dividing-sections section-3"></div>
        <div className="Dividing-sections section-4"></div>
        <div className="Dividing-sections section-5"></div>
        <div className="Dividing-sections section-6"></div>
        <div className="Dividing-sections section-7"></div>
        <div className="Dividing-sections section-8"></div>
        <div className="Dividing-sections section-9"></div>
        <div className="Dividing-sections section-10"></div>
        <div
          className="logo-container"
         
        >
            <img src={pinterestLogo}>
            </img>
        </div>
      
    </div>
    )
}
export default Auth