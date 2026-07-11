import { useEffect, useState } from "react";
import Application from "./application/Application";
import Auth from "./auth/authPage";
import { useLocation, useNavigate } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
function App(){
     const [clickedPost , setclickedPost] = useState<string>("")
    const [clickedPostId , setclickedPostId] = useState<string>("")
    const [clicked , setClicked] = useState(false)

  //localStorage.clear()
     const [logginInfo , setLogginInfo]= useState({
        email : "",
        password : "",
    });
    const navigate = useNavigate();
    const location = useLocation();
    
    const [logged , setLogged] = useState(localStorage.getItem("state") === "logged")
//
    useEffect(()=>{
        if(location.pathname === "/"){
            setClicked(false)
        }
    },[location.pathname])
    const handleLoggin = (logged : any)=>{
        if(logged){
            if(!clicked){
                 navigate("/" , {replace : true})
            }
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
                        element={<Application user={logginInfo} logState={setLogged} clickedPost={clickedPost} setclickedPost={setclickedPost} clickedPostId={clickedPostId} setclickedPostId={setclickedPostId} clicked={clicked} setClicked={setClicked} location={location} />  }
                    />
                 <Route 
                        path="/post/:id" 
                        element={<Application user={logginInfo} logState={setLogged} clickedPost={clickedPost} setclickedPost={setclickedPost} clickedPostId={clickedPostId} setclickedPostId={setclickedPostId} clicked={clicked} setClicked={setClicked} location={location} />} />
                </Routes>
       
        )
        }

export default App