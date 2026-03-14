import { useEffect, useState } from "react";
import Application from "./application/Application";
import Auth from "./auth/authPage";

function App(){
  //localStorage.clear()
     const [logginInfo , setLogginInfo]= useState({
        email : "",
        password : "",
    });
    const [logged , setLogged] = useState(localStorage.getItem("state") ? true : false)
    useEffect(()=>{
        console.log("users info in mount are  : " , logginInfo)
    },[logged])
    
    return(
        logged ? <Application user = {logginInfo} logState= {setLogged}/> : <Auth logged = {setLogged} logginInfo={logginInfo} setLogginInfo={setLogginInfo}/>
    )
}
export default App