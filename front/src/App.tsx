import { useState } from "react";
import Application from "./application/Application";
import Auth from "./auth/authPage";

function App(){
    //localStorage.clear()
    const [logged , setLogged] = useState(localStorage.getItem("state") ? true : false)
    return(
        logged ? <Application/> : <Auth logged = {setLogged}/>
    )
}
export default App