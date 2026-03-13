import { useState , useEffect } from "react"
import "./loggin.css"
function Loggin({logged}:any){
    const [logginInfo , setLogginInfo]= useState({
        email : "",
        password : "",
    });
    const handle = ()=>{
        localStorage.setItem("state" , "loggedIn");
        localStorage.setItem("user",String(logginInfo))
        logged(true)
    }
    return (

        <>
        <div className="logginPage">
            
             <div className="password email " >
                <input type="text" placeholder="Email" value={logginInfo.email} onChange={(e:any)=>setLogginInfo({...logginInfo, email : e.target.value})}/>
            </div>
            <div className="password">
                <input type="text" placeholder="Password" value={logginInfo.password} onChange={(e:any)=>setLogginInfo({...logginInfo , password : e.target.value})}/>
            </div>
           
            <div className="logginBtnCon">
                <button className="logginBtn" onClick={handle}> confirm loggin </button>
            </div>
        </div>
        </>
    )
}
export default Loggin