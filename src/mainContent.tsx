import "./mainContent.css"
import {  useEffect, useRef, useState } from "react"

const accessKey = "RAkFPc9q0iKs6GarPDAw07HMQ8ktUKAnXdqk2U9DAA5FWJUCRF2xaaS1"

function MainContent(props :any) {
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


  function fetching(state : string){
      const req = async ()=>{
            try{
                if(props.intrest.length === 0) {
                    props.setintrest((prev : any) => [...prev, "random"])
                }
                console.log("looking for" , props.intrest )
               const reqs =  await fetch(`https://api.pexels.com/v1/search?query=${props.intrest}`,{
                headers: {
                Authorization: accessKey
            }
            })
              if (!reqs.ok) {
                    const text = await reqs.text();
                    console.log("Error response:", text);
                    return;
                }

            const data = await reqs.json() 
            
           if(state == "scroll"){
            setPhotos(prev => [...prev, ...data.photos])
           }else if(state == "choice"){
            setPhotos([...data.photos])
           }
                
            
           
            console.log("data is : " , data.photos)
            setFirstFetch(true)

            setLoading(false)
            
            }catch(err){
                console.log("error fetching", err)
            }
    

        }
        req()
        }

    
    useEffect(()=>{
        if(!bottom && firstfetch) return;

        fetching("scroll")
        console.log("am scrolling")

    },[bottom]);

    useEffect(()=>{
        fetching("choice")
        console.log("choice specified")
    },[props.intrest])
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
                        <img src={e.src.original} >
                        </img>
                    </div>
                    )))
            }
                
        </div>

    )
}
export default MainContent