import { useState , useEffect } from "react"
import "./signup.css"
function SignUp({logged} : any){
    const [formData , setFormData] = useState({
        nom: "",
  prenom: "",
  telephone: "",
  password: "",
  email: ""
    })
     const [errorMsg , setErrorMsg] = useState("")

   
function addUser(){
    const req = async ()=>{
        try{
           
            const request = await fetch("http://127.0.0.1:8000/users",{
                method:"POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body:JSON.stringify(formData)
            })
            const response = await request.json();
            if(!request.ok){
                setErrorMsg(response.detail[0].msg || response.text || response.detail)
                console.log(response.detail[0].msg)

            }else{
                console.log("user added")
                logged(true)
            }
        }catch(err){
            console.log(err)
        }
    }
    req()
}

    return (

        <>
        <div className="SignUpPage">
            <div className="name">
                
                <input type="text" placeholder="Name" value={formData.prenom} onChange={(e : any)=>setFormData({...formData , prenom : e.target.value})}/>  
                <input type="text" placeholder="Familly name" value={formData.nom} onChange={(e : any)=>setFormData({...formData , nom : e.target.value})}/>
            </div>

             <div className="emailS">
                <input type="text" placeholder="Email" value={formData.email} onChange={(e : any)=>setFormData({...formData ,  email : e.target.value})}/>
            </div>
             <div className="phoneNumber">
                <input type="text" placeholder="Phone number" value={formData.telephone} onChange={(e : any)=>setFormData({...formData ,  telephone: e.target.value})}/>
            </div>
            <div className="passwordS">
                <input type="text" placeholder="Password" value={formData.password} onChange={(e : any)=>setFormData({...formData , password: e.target.value})}/>
            </div>
             <div className="passwordS">
                <input type="text" placeholder="Confirm Password" />
            </div>
            {errorMsg.length != 0 && <div className="ErrorMsg"> <p> {errorMsg} </p> </div>  }
            <div className="logginBtnCon">
                <button className="logginBtn" onClick={addUser}> confirm loggin </button>
            </div>
        </div>
        </>
    )
}
export default SignUp