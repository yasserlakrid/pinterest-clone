import { useState , useEffect } from "react"
import "./loggin.css"
function Loggin({logged , logginInfo , setLogginInfo}:any){
   
    const [wrongPass , setWrongPass]= useState(false)
    const [errorMsg , setErrorMsg] = useState("")
   function checkUser(){
    const req = async ()=>{
        try{
            const response = await fetch("http://127.0.0.1:8000/users/verify",{
                        method:"POST",
                        headers:{
                            "Content-Type": "application/json"
                        },
                        body:JSON.stringify(logginInfo)
                    })
            const data = await response.json()

            if(!response.ok){
                setWrongPass(true)
               setErrorMsg(data.detail[0].msg||data.detail)
            }else{
                setWrongPass(false)
                setLogginInfo(data)
                logged(true)
            }
            
            
            
        }catch(err){
            console.log(err);
            
        }
        
        
    } 
    req()
    
   }
    

    const handle = ()=>{
        checkUser()
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
           
            {wrongPass && <div className="ErrorMsg"> <p> {errorMsg} </p> </div> }
           
            <div className="logginBtnCon">
                <button className="logginBtn" onClick={handle}> confirm loggin </button>
            </div>
            
        </div>
        </>
    )
}
export default Loggin