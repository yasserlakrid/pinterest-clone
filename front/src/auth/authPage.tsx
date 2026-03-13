import { useState , useEffect } from "react"
import SignUp from "./signup"
import Loggin from "./loggin"
import "./authPage.css"
function Auth({logged} : any){
    const [loggedIn , setLoggedIn] = useState(false);
    const [page , setPage] = useState(loggedIn ? "signUp" : "loggin")
    return (
        <div className="AuthPage">
            <div className="sider">
                
            </div>
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
                    <SignUp />
                ):(
                    <Loggin logged = {logged}/>
                ) }
            </div>
        </div>
        
    )
}
export default Auth