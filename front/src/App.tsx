import { useState } from "react";
import Application from "./application/Application";
import Auth from "./auth/authPage";

function App(){
  //localStorage.clear()
     const [logginInfo , setLogginInfo]= useState({
        email : "",
        password : "",
    });
    
    const [logged , setLogged] = useState(localStorage.getItem("state") ? true : false)
    return(
        logged ? <Application user = {logginInfo}/> : <Auth logged = {setLogged} logginInfo={logginInfo} setLogginInfo={setLogginInfo}/>
    )
}
export default App