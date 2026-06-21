import "./mainContent.css"
import {  useEffect, useRef, useState } from "react"
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
  
    const firstFetch = useRef(true)
    const firstRender = useRef(true)
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



function redefinePage( actlength : number , target : number){
        console.log("the number of columns is : " , actlength , " and the target is : " , target)
        if(actlength > target && target > 1){
            setColumns((prev : any)=>{
                const listTosave = [];
                const removablelist = []; 

                const copy = [...prev ]
                for(let i = 0 ; i < target; i ++){
                    listTosave.push(copy[i] ? copy[i] : [])
                    removablelist.push(copy[i+target] ? copy[i+target] : [])
                }

                mergeTheLastArray(listTosave , setColumns , removablelist) 
                
                return listTosave ; 
            })
            
        
        }else if(target > actlength){
            setColumns((prev : column[])=>{
                const next = [...prev]
                for(let i = 0 ; i < (target - actlength) ; i ++){
                    next.push({posts : next[1] ? next[1].posts : [] , length : next[1]?next[1].length:0 })
                    console.log("adding a colomn with posts " , next[1].posts)
                }
                console.log("we reached " , next.length);
                return next 
            });
            
        }
    
      
    
}
//call this in case reducing the screen size

function mergeTheLastArray(listOfArrays : column[] , setListofArrays : any , listtoremove : column[]){
    for(let j= 0 ; j< listtoremove.length ; j ++){
        let list = listtoremove[j]
        let i = 0 ;
        let post 
        if(list){
        post = list.posts[0] ? list.posts[0] : null ; 
        }else{
            post = null
        }
        let k = 0 
        while(post){
            post = list.posts[i];
            if(!listOfArrays[k]){
                k = 0
            }else{
                k++
            }
            appendInArray(post , i , k, setListofArrays)
            i++
        }
    }
    

}
function appendInArray(post : any , index: number , listNumber : number , setter : any ){
    
    setter((prev : any) => {
        return prev.map((item : any , index : any ) => index == listNumber ? {posts : [...prev.splice(0 , index ) , post , ...prev.splice(index)] , length : prev.length} : item )
    })
}

//call this in case of increasing the screen size 
function addNewColumn(setColomnsList : any , colomnsList : any , length : number ){
    let posts :  Object[]
    posts = []

    let Newlength = 0 
    for(let i = 0 ; i < length ; i++){
        posts.push({})//now im adding the 1st post later i should detect the last post     
        Newlength += 100
    }
    setColomnsList([...colomnsList, {posts , Newlength}])
    
    }

function copyArray(array : any[]){
    const copy = array.map((object)=>{
        return {...object }
    })
    return copy
}

const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      const newWidth = window.innerWidth;
    
      setWidth(newWidth);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
   
    setViewPort(Math.floor(width / ((15 + 220) + 20)));
  }, [width]);

useEffect(()=>{
    console.log("the view port is :  , " , viewPort)

},[viewPort])

 useEffect(()=>{
    if(firstRender.current){
        firstRender.current = false 
        return 
    }
   console.log("not the initial render changing the columns size "); 
    redefinePage(columns.length || 0 , viewPort)
    
 },[viewPort])


useEffect(() => {
    console.log("initial render , the view port is :  , " , viewPort , "and the columns length is : " , columns.length)
    redefinePage(columns.length, viewPort);
}, []); 

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
        const nextColumns = copyArray(prevColumns)

        if (!items.length) {
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
           }else if(state == "choice" || state == "search"){
            setPage(1)
            setPhotos([...data.photos])
            }

            addItemToEachColumn(data.photos , viewPort)
            console.log("we add items  " , data.photos , 'to this much of colomns : ' , viewPort) ; 

            setFirstFetch(true)
            setLoading(false)
            }catch(err){
                console.log("error fetching", err)
            }
        }
        req()
        }
     
    //delete all rendered posts in the screen
    function resetPageColumns(){
         for(let i = 0 ; i < columns.length ; i ++){
        setColumns((prev : column[])=> prev.map((columnObject ,index)=>
        {

           return i == index ? {...columnObject , posts : [] , length : 0 } : columnObject

        }
        ))
    }
    }   
    useEffect(()=>{
        if(firstFetch.current){
            firstFetch.current = false
            return
        }
        if(!bottom) return;
        
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
        
        setPhotos(prev => prev.filter((prev : any )=> prev?.src?.large != link))
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
                                             post && post.src ? (
                                             <div className={`postContainer` }key={index2} onClick={()=>clickPost(post.src.large,post.alt)} >
                                                    <img src={post.src.medium}>
                                                    </img>
                                              </div>
                                             ) : null
                                        ))}
                                        
                                     </div>   
                                    )))
                }
                      
                
        </div>

    )
}


export default MainContent
