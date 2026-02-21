import "./mainContent.css"
import { use, useEffect, useState } from "react"
const accessKey = "SsfwWHtRiHXuJAnN03Roxxd5Fyq-aA4I2DNm0nlEzVI"

function MainContent() {
    const [bottom , reachedBottom ] = useState(false);
    const [loading , setLoading] = useState(true)
const [photos , setPhotos] = useState([])
    useEffect(()=>{
        const req = async ()=>{
            try{
               const reqs =  await fetch("https://api.unsplash.com/photos/random?count=15&query=coffee&orientation=landscape",{
                headers: {
                Authorization: `Client-ID ${accessKey}`
            }
            })
              if (!reqs.ok) {
    const text = await reqs.text();
    console.log("Error response:", text);
    return;
  }

            const data = await reqs.json() 
            setPhotos(data)
            
            setLoading(false)
        
           
            }catch(err){
                console.log("error fetching", err)
                 
            }
           

        }
        req()
       

    },[])
    return (
        <div className="MainContentVid">
            {
                loading ? (
                    <div className="loadingAniamtion">
                        loading
                    </div>
                ):(
                    <>
                    </>
                )
            }
            {photos.length === 0 ? (<></> ): (
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