import "./mainContent.css"
import {  useEffect, useRef, useState } from "react"
const accessKey = "SsfwWHtRiHXuJAnN03Roxxd5Fyq-aA4I2DNm0nlEzVI"

function MainContent() {
    const [bottom , reachedBottom ] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null); 
     const [loading , setLoading] = useState(true)
     const [firstfetch , setFirstFetch] = useState(false)
const [photos , setPhotos] = useState<object[]>([])

   useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const handleScroll = () => {
      const atBottom =
        element.scrollTop + element.clientHeight >= element.scrollHeight - 5;
      reachedBottom(atBottom);
    };

    element.addEventListener("scroll", handleScroll);
    return () => element.removeEventListener("scroll", handleScroll);
  }, []);


  

    useEffect(()=>{
        const req = async ()=>{
            if(!bottom && firstfetch) return;

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
            
            
                setPhotos(prev => [...prev, ...data])
                setFirstFetch(true)

            setLoading(false)
           console.log("you reached the bottom the number of images is : " , photos.length)
            }catch(err){
                console.log("error fetching", err)
            }
           

        }
        req()
       

    },[bottom])
    useEffect(()=>{
        console.log("the number of images is : " , photos.length)
    },[photos])
    return (
        <div className="MainContentVid" ref={containerRef} style={{  overflowY: "scroll" }}>
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