import { useEffect, useState } from "react";
import Application from "./application/Application";
import Auth from "./auth/authPage";
import { useNavigate } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
function App(){
  //localStorage.clear()
     const [logginInfo , setLogginInfo]= useState({
        email : "",
        password : "",
    });
    const navigate = useNavigate();

    const [logged , setLogged] = useState(localStorage.getItem("state") === "logged")
//
    const handleLoggin = (logged : any)=>{
        if(logged){
            navigate("/" , {replace : true})
        }else{
            navigate("/auth" , {replace : true})
        }
    }

    useEffect(()=>{
        
        handleLoggin(logged)
    },[logged, navigate])
    
        return(
       
                <Routes>
                    <Route
                        path="/auth"
                        element={<Auth logged={setLogged} logginInfo={logginInfo} setLogginInfo={setLogginInfo} />}/>
                    <Route
                        path="/"
                        element={<Application user={logginInfo} logState={setLogged} />  }
                    />
                </Routes>
       
        )
        }

export default App