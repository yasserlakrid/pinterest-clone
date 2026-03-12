import { useState , useEffect } from "react"
import SignUp from "./signup"
import Loggin from "./loggin"
import "./authPage.css"
function Auth(){
    const [loggedIn , setLoggedIn] = useState(false);
    const [page , setPage] = useState(loggedIn ? "signUp" : "loggin")
    return (
        <div className="AuthPage">
            <div className="sider">
                
            </div>
            <div className="authMain">
                <h1>
                    Hello { page == "signUp" ? <span>again</span> : "" } to Pintrest
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
                    <Loggin/>
                ) }
            </div>
        </div>
        
    )
}
export default Auth