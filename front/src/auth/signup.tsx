import { useState , useEffect } from "react"
import "./signup.css"
function SignUp(){
    return (

        <>
        <div className="SignUpPage">
            <div className="name">
                
                <input type="text" placeholder="Name"/>  
                <input type="text" placeholder="Familly name"/>
            </div>

             <div className="emailS">
                <input type="text" placeholder="Email"/>
            </div>
            <div className="passwordS">
                <input type="text" placeholder="Password"/>
            </div>
             <div className="passwordS">
                <input type="text" placeholder="Confirm Password"/>
            </div>
            <div className="logginBtnCon">
                <button className="logginBtn"> confirm loggin </button>
            </div>
        </div>
        </>
    )
}
export default SignUp