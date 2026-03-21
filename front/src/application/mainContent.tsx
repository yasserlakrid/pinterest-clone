import "./mainContent.css"
import {  useEffect, useRef, useState } from "react"
import BigPost from "../components/bigPost.tsx"
const accessKey = "RAkFPc9q0iKs6GarPDAw07HMQ8ktUKAnXdqk2U9DAA5FWJUCRF2xaaS1"
import SearchDrop from "../components/searchDrop.tsx"
function MainContent(props :any) {
    const [bottom , reachedBottom ] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null); 
    const [loading , setLoading] = useState(true)
    const [firstfetch , setFirstFetch] = useState(false)
    const [photos , setPhotos] = useState<object[]>([])
    const [columns , setColumns] = useState<Array<object[]>>([])
    const [lastAction , setlastAction] = useState<any>("random")
    const [clickedPost , setclickedPost] = useState<string>("")
    const [page, setPage] =useState(1)
    const [dropQuery,setDropQuery] = useState<string>("")
    const isFirstFetch = useRef(true);

    //the number of columns 

    const [viewPort , setViewPort] = useState<number>(Math.floor( window.innerWidth / (15 + 220)))

   useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const handleScroll = () => {
      const atBottom =( element.scrollTop + element.clientHeight >= element.scrollHeight - 5);
       
      reachedBottom(atBottom);
    };
    element.addEventListener("scroll", handleScroll);
    return () => element.removeEventListener("scroll", handleScroll);
  }, []);

// define the number of columns 

useEffect(()=>{
window.addEventListener("resize" , ()=>setViewPort(Math.floor( window.innerWidth / (15 + 220))))
return ()=> window.removeEventListener("resize" ,  ()=>setViewPort(Math.floor( window.innerWidth / (15 + 220))))
},[])


  //i should edit this function to share photos to columns based on the shotrest one 
function addItemToEachColumn(items : Array<object>  , length : number ){

    for(let i = 0 ; i < length ; i ++){
        setColumns(prev => prev.map((column ,index)=>
               {
                return  i == index ? [...column , items[i]] : column}
        ))
    }
}


  function fetching(state : string , looking : any){   
        console.log("fetching with state : " , state , " and looking for : " , looking)
         if(state === "choice" || state === "search"){
          setLoading(true)
          setPhotos([])
        }  
        
        
        const req = async ()=>{
            try{
                if(props.intrest.length === 0) {
                    props.setintrest((prev : any) => [...prev, "random"])
                }
                const reqs =  await fetch(`https://api.pexels.com/v1/search?query=${looking || "random"}&page=${page}&per_page=${viewPort}`,{
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
            addItemToEachColumn( data.photos, viewPort )
            

           }else if(state == "choice" || state == "search"){
            setPage(1)
            setPhotos([...data.photos])
            setColumns([[],[],[],[],[],[],[]])
            addItemToEachColumn(data.photos , viewPort)
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
        
        if(!bottom || !firstfetch) return;
        setPage(prev=> prev < 85 ? prev+1 : prev)
        fetching("scroll" , lastAction)
        
    },[bottom]);

    useEffect(()=>{
        
        fetching("choice",props.intrest)
        setlastAction(props.intrest)
        
    },[props.intrest])

    useEffect(()=>{
        fetching("search",props.query)
        setlastAction(props.query)
        
    },[props.query])

    useEffect(()=>{
        fetching("search",dropQuery)
        setlastAction(dropQuery)
        
    },[dropQuery])

    function clickPost(link : string, info: any ){
        props.viewPost(true)
        setclickedPost(link)
        props.resetInstrest(info)
        fetching("search",info)
        setlastAction(info)
        
        setPhotos(prev => prev.filter((prev : any )=> prev.src.large != link))
    }
    
    return (
        <div className= "MainContentVid "  ref={containerRef} style={{ placeItems : loading? "start" : "", paddingTop : loading?"64px":"0"} } onClick={props.closeSearchDrop}>
            {props.searchDrop &&<SearchDrop setquery={setDropQuery} closeDrop = {props.setSearchDrop} closePost = {props.closeDrop}/>}
            {
                loading &&
                    <div className="loadingAniamtion">
                        loading
                    </div>
                
            }
            {props.post && <BigPost postUrl = {clickedPost}/>}

               {columns.length === 0 ? (<>
               
               </> ): (

                            columns.map((column : Array<object> ,index : number)=>(
                                    <div className="column" key={index}>
                                        {column.map((post : object | any , index2 : number)=>(
                                             <div className={`postContainer` }key={index2} onClick={()=>clickPost(post.src.large,post.alt)} >
                                                    <img src={post.src.medium}>
                                                    </img>
                                              </div> 
                                        ))}
                                        
                                     </div>   
                                    )))
                }
                      
                
        </div>

    )
}


export default MainContent
/*              
                
         {photos.length!=0 && photos.map((e : any ,index)=>(
                                    <div className={`postContainer` }key={index} onClick={()=>clickPost(e.src.large,e.alt)} >
                                        <img src={e.src.medium} >
                                        </img>
                                    </div>
                                    )) }      
                */