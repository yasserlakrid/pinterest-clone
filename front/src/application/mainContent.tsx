import "./mainContent.css"
import {  use, useEffect, useRef, useState } from "react"
import BigPost from "../components/bigPost.tsx"
const accessKey = "RAkFPc9q0iKs6GarPDAw07HMQ8ktUKAnXdqk2U9DAA5FWJUCRF2xaaS1"
import SearchDrop from "../components/searchDrop.tsx"
function MainContent(props :any) {
    type column ={
        posts : object[],
        length : number
    }
    const [bottom , reachedBottom ] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null); 
    const [loading , setLoading] = useState(true)
    const [firstfetch , setFirstFetch] = useState(false)
    const [photos , setPhotos] = useState<object[]>([])
    const [columns , setColumns] = useState<column[]>([{posts : [] , length : 0}])
    const [lastAction , setlastAction] = useState<any>("random")
    const [clickedPost , setclickedPost] = useState<string>("")
    const [page, setPage] =useState(1)
    const [dropQuery,setDropQuery] = useState<string>("")
    const isFirstFetch = useRef(true);
    const firstFetch = useRef(true)
    const [viewPort , setViewPort] = useState<number>(Math.floor( window.innerWidth /((15 + 220 ) + 20)))

//track the scroll move 
   useEffect(() => {
    const element = props.containerRef.current;
    if (!element) return;
    const handleScroll = () => {
    const atBottom =( element.scrollTop + element.clientHeight >= element.scrollHeight - 5);
    reachedBottom(atBottom);
    };
    element.addEventListener("scroll", handleScroll);
    return () => element.removeEventListener("scroll", handleScroll);
  }, []);

// define the number of columns 
function reDefineSize( Setarray  : any , length : number , target : number){
    console.log("the actual view port is " , length  , 'the targeted view port is ' ,target )
    //Setarray([{posts : [{}] , length : 0}])
    if(length < target){
        for(let i = 0 ; i < target   - length   ; i ++){
             Setarray((prev : any) => [...prev , {posts : [] , length : 0}])
             console.log("the final reached view port is : " , i)  
        }
    }else{
        for(let i = 0 ; i < length - target ;i ++  ){
            Setarray((prev : any )=> prev.slice(0,-1))
            console.log("the final reached view port is : " , i)
        }
    }
    
}

useEffect(()=>{
reDefineSize(setColumns ,  columns.length || 0 , viewPort)
fetching("scroll" , lastAction)
console.log("the window length is : " , window.innerWidth , "the view port is : " , viewPort)
window.addEventListener("resize" , ()=>setViewPort(Math.floor( window.innerWidth /((15 + 220 ) + 20)) ))
return ()=> window.removeEventListener("resize" ,  ()=>setViewPort(Math.floor( window.innerWidth /((15 + 220 ) + 20))))
},[viewPort])


function minHeightIndex(columns : any ){
    if (!columns.length) return 0
    let min = columns[0].length ;
    let index  = 0
    for(let i = 0 ; i < columns.length ; i++){
        if(columns[i].length < min){
            min = columns[i].length
            index = i ;
        }
    }
    return index
}


function addItemToEachColumn(items : Array<any> , length : number){
    setColumns((prevColumns : column[])=>{
        const nextColumns = prevColumns.map((columnObject)=>({
            ...columnObject,
            posts: [...columnObject.posts]
        }))

        if (!nextColumns.length || !items.length) {
            return nextColumns
        }

        const totalColumns = length > 0 ? length : nextColumns.length
        const containerWidth = containerRef.current?.clientWidth ?? window.innerWidth
        const horizontalGap = 15
        const containerHorizontalPadding = 20
        const columnWidth = Math.max(
            220,
            (containerWidth - containerHorizontalPadding - horizontalGap * (totalColumns - 1)) / totalColumns
        )
        const verticalGap = 10

        for (const item of items) {
            const targetIndex = minHeightIndex(nextColumns)
            const imageWidth = item.width || 1
            const imageHeight = item.height || 0
            const renderedHeight = (imageHeight / imageWidth) * columnWidth
            nextColumns[targetIndex] = {
                ...nextColumns[targetIndex],
                length: nextColumns[targetIndex].length + renderedHeight + verticalGap,
                posts: [...nextColumns[targetIndex].posts, item]
            }
        }

        return nextColumns
    })
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
                const reqs =  await fetch(`https://api.pexels.com/v1/search?query=${looking || "random"}&page=${page}&per_page=${viewPort > 8 ? viewPort : 8}`,{
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
            console.log('the actual number of colomn is ' , columns.length)
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
        
    function resetPageColumns(){
         for(let i = 0 ; i < columns.length ; i ++){
        setColumns((prev : column[])=> prev.map((columnObject ,index)=>
        {

           return i == index ? {...columnObject , posts : []} : columnObject

        }
                    
            
        ))
    }
    }   
    useEffect(()=>{
        if(firstFetch.current){
            firstFetch.current = false
            return
        }
        if(!bottom || !firstfetch) return;
        setPage(prev=> prev < 85 ? prev+1 : prev)
        fetching("scroll" , lastAction)
        
    },[bottom]);

    useEffect(()=>{
        resetPageColumns()
        fetching("choice",props.intrest)
        setlastAction(props.intrest)
        
    },[props.intrest])

    useEffect(()=>{
        resetPageColumns()
        fetching("search",props.query)
        setlastAction(props.query)
    },[props.query])

    useEffect(()=>{
        resetPageColumns()
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

               {columns[0].posts.length === 0 ? (<>
               
               </> ): (

                            columns.map((column : column ,index : number)=>(
                                    <div className="column" key={index}>
                                        {column.posts.map((post : object | any , index2 : number)=>(
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