import "./mainContent.css"
import { useEffect, useState } from "react"
const accessKey = "SsfwWHtRiHXuJAnN03Roxxd5Fyq-aA4I2DNm0nlEzVI"

function MainContent() {
    const [bottom , reachedBottom ] = useState(false);
const [photos , setPhotos] = useState([])
    useEffect(()=>{
        const req = async ()=>{
            try{
               const reqs =  await fetch("https://api.unsplash.com/photos/random?count=15&query=coffee&orientation=landscape",{
                headers: {
              Authorization: `Client-ID ${accessKey}`
            }
            })
            const data = await reqs.json() 
            setPhotos(data)
            
            console.log("the pic are available", data)
            }catch(err){
                console.log("error fetching", err)
            }
           

        }
        req()
       
    },[])
    return (
        <div className="MainContentVid">
            {photos.length === 0 ? (<div className="loader">Loading ... </div> ): (
            photos.map((e : any ,index)=>(
                    <div key={index}>
                        <img src={e.urls.regular} >
                        </img>
                    </div>
                    )))
            }
                
        </div>

    )
}
export default MainContent