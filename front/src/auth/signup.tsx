import { useState , useEffect } from "react"

function SignUp(){
    return (

        <>
        <div className="SignUpPage">
            <div className="name">
                
                <input type="text" placeholder="Name"/>
               
                <input type="text" placeholder="Familly name"/>
            </div>

             <div className="password email ">
                <input type="text" placeholder="Email"/>
            </div>
            <div className="password">
                <input type="text" placeholder="Password"/>
            </div>
             <div className="password">
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