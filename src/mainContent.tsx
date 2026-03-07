import "./mainContent.css"
import {  useEffect, useRef, useState } from "react"
import BigPost from "./components/bigPost.tsx"
const accessKey = "RAkFPc9q0iKs6GarPDAw07HMQ8ktUKAnXdqk2U9DAA5FWJUCRF2xaaS1"
import SearchDrop from "./components/searchDrop.tsx"
function MainContent(props :any) {
    const [bottom , reachedBottom ] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null); 
    const [loading , setLoading] = useState(true)
    const [firstfetch , setFirstFetch] = useState(false)
    const [photos , setPhotos] = useState<object[]>([])
    const [lastAction , setlastAction] = useState<any>("random")
    const [clickedPost , setclickedPost] = useState<string>("")
    const [page, setPage] =useState(1)
    const [dropQuery,setDropQuery] = useState<string>("")
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


  function fetching(state : string , looking : any){   
   
         if(state === "choice" || state === "search"){
          setLoading(true)
          setPhotos([])
        }  
    
        
        const req = async ()=>{
            try{
                if(props.intrest.length === 0) {
                    props.setintrest((prev : any) => [...prev, "random"])
                }
                const reqs =  await fetch(`https://api.pexels.com/v1/search?query=${looking || "random"}&page=${page}&per_page=15`,{
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
            console.log("the data is  : " , data)
           if(state == "scroll"){
            setPhotos(prev => [...prev, ...data.photos])
           }else if(state == "choice" || state == "search"){
            setPage(1)
            setPhotos([...data.photos])
           }
            
           
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
        setPage(prev=> prev < 85 ? prev+1 : prev)
        fetching("scroll" , lastAction)
    },[bottom]);

    useEffect(()=>{
        fetching("choice",props.intrest)
        setlastAction(props.intrest)
        console.log("intrests are changin s")
    },[props.intrest])

    useEffect(()=>{
        fetching("search",props.query)
        setlastAction(props.query)
        
    },[props.query])
    useEffect(()=>{
        fetching("search",dropQuery)
        setlastAction(dropQuery)
    },[dropQuery])
    function clickPost(link : string ){
        props.viewPost(true)
        setclickedPost(link)
        setPhotos(prev => prev.filter((prev : any )=> prev.src.large != link))
    }
    
    return (
        <div className= "MainContentVid" ref={containerRef} style={{  overflowY: "scroll" }} onClick={props.closeSearchDrop}>
            {props.searchDrop &&<SearchDrop setquery={setDropQuery}/>}
            {
                loading &&
                    <div className="loadingAniamtion">
                        loading
                    </div>
                
            }
            {props.post && <BigPost postUrl = {clickedPost}/>}

                {photos.length === 0 ? (<></> ): (
                            photos.map((e : any ,index)=>(
                                    <div className={`postContainer` }key={index} onClick={()=>clickPost(e.src.large)} >
                                        <img src={e.src.medium} >
                                        </img>
                                    </div>
                                    )))
                }
                
        </div>

    )
}
export default MainContent