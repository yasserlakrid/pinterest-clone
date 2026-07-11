import "./mainContent.css"
import {  useEffect, useRef, useState } from "react"

import ExtendPost from "./ExtendPost.tsx"

const accessKey = import.meta.env.VITE_ACCESS_KEY
import SearchDrop from "../components/searchDrop.tsx"
import { Route, Routes, useNavigate } from "react-router-dom"
import searchDrop from "../components/searchDrop.tsx"
const darkColors = [
  '#1a1a2e', // dark navy
  '#2c1810', // dark brown
  '#0f3d3e', // dark teal
  '#3d0f2e', // dark magenta
  '#1e2d24', // dark forest green
  '#2b1a3d', // dark purple
  '#3d1a1a', // dark red
  '#1a2e3d', // dark blue
  '#2d2a1a', // dark olive
  '#1a1a1a', // near black
];
function randomIndex(array: any[]) {
  return Math.floor(Math.random() * array.length);
}
export type column ={
        posts : object[],
        length : number
    }
function MainContent(props :any) {
   
    
    const [bottom , reachedBottom ] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null); 
    const [loading , setLoading] = useState(true)
    const [photos , setPhotos] = useState<object[]>([])
    
    const [columns , setColumns] = useState<column[]>([{posts : [] , length : 0}])

    const [lastAction , setlastAction] = useState<any>("random")

   
    const [page, setPage] =useState(1)
    const [dropQuery,setDropQuery] = useState<string>("")
  
    const firstFetch = useRef(true)
    const [viewPort , setViewPort] = useState<number>(Math.floor( window.innerWidth /((15 + 220 ) + 20)))
    const [isScroling , setScroling] = useState(false)
    //track the scroll move 
   useEffect(() => {
    const element = props.containerRef.current;
    if (!element) return;
    const handleScroll = () => {
        const atBottom =( element.scrollTop + element.clientHeight >= element.scrollHeight - 100);
        reachedBottom(atBottom);
        setScroling(prev => !prev)
    };
    element.addEventListener("scroll", handleScroll);
    return () => element.removeEventListener("scroll", handleScroll);
  }, []);

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

function createEmptyColumns(columnCount : number): column[] {
    return Array.from({ length: Math.max(2 ,  columnCount) }, () => ({ posts: [] as object[] , length: 0 }))
}

function addItemToEachColumn(items : Array<any> , length : number){
    const totalColumns = Math.max(1, length)
    const containerWidth = containerRef.current?.clientWidth ?? window.innerWidth
    const horizontalGap = 15
    const containerHorizontalPadding = 20
    const columnWidth = Math.max(
        220,
        (containerWidth - containerHorizontalPadding - horizontalGap * (totalColumns - 1)) / totalColumns
    )
    const verticalGap = 10
    
    const nextColumns = createEmptyColumns(totalColumns) //this create an empty list to start with 

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

    setColumns(nextColumns)
    
}
  function fetching(state : string , looking : any, pageToUse: number = page){   
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
                const reqs =  await fetch(`https://api.pexels.com/v1/search?query=${looking || "random"}&page=${pageToUse}&per_page=${viewPort > 8 ? viewPort*2 : 16}`,{
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
            setPhotos([...data.photos])
            }

            console.log("we add items  " , data.photos , 'to this much of colomns : ' , viewPort) ; 

            setLoading(false)
            }catch(err){
                console.log("error fetching", err)
            }
        }
        req()
        }
     
    useEffect(() => {
     
        addItemToEachColumn(photos, viewPort)
    
    }, [photos, viewPort ,props.location ])

    useEffect(()=>{
        if(firstFetch.current){
            firstFetch.current = false
            return
        }
        if(!bottom) return;
        
        const nextPage = page < 85 ? page + 1 : page
        setPage(nextPage)
        fetching("scroll" , lastAction, nextPage)
        
    },[bottom]);
    
   useEffect(()=>{
        fetching("choice",props.intrest, 1)
        setlastAction(props.intrest)
        
    },[props.intrest])

    useEffect(()=>{
        fetching("search",props.query, 1)
        setlastAction(props.query)
    },[props.query])

    useEffect(()=>{
        fetching("search",dropQuery, 1)
        setlastAction(dropQuery)
        
    },[dropQuery])
    useEffect(()=>{
        if(props.location.pathname === "/"){
           setlastAction("random")
        fetching("search", "random", 1)
             
        }
    }, [props.location])
const navigate = useNavigate()

    function clickPost(link : string, info: any , id :any){
        props.viewPost(true)

        props.setclickedPost(link)
        props.setclicked(true)
        props.setclickedPostId(id)
        navigate(`/post/${id}`, {replace : false}) // ✅ no colon
        props.resetInstrest(info)
        fetching("search",info, 1)
        setlastAction(info)
        setPhotos(prev => prev.filter((prev : any )=> prev?.src?.large != link))
    }
    
    return (
        <div className= "MainContentVid "  ref={containerRef} style={{ placeItems : loading? "start" : "", paddingTop : loading?"64px":"0"} } onClick={props.closeSearchDrop}>
            {props.searchDrop &&<SearchDrop setquery={setDropQuery} closeDrop = {props.setSearchDrop} closePost = {props.closeDrop} DropState={props.DropState}/>}
            {
                loading &&
                    <div className="loadingAniamtion">
                        loading
                    </div>
                
            }

             {   props.clicked ? <ExtendPost source={props.clickedPost} id={props.clickedPostId} feed={columns} columns={columns} loading={loading} searchDrop={props.searchDrop} containerRef={containerRef} setSearchDrop={props.setSearchDrop} closeDrop={props.closeDrop} DropState={props.DropState} setDropQuery={setDropQuery} closeSearchDrop={props.closeSearchDrop} clickedState={props.clickedState} clickPost={clickPost} isScroling={isScroling} viewPort={viewPort} width={width}/> : <>
             { columns[0] && columns[0].posts && columns[0].posts.length === 0 ? (<>
               
               </> ): (

                            columns.map((column : column ,index : number)=>(
                                    <div className={props.clickedState && (index === 0 || index === 1) ? "column clicked" : "column" } key={index}>
                                        {column.posts.map((post : object | any , index2 : number)=>(
                                             post && post.src ? (
                                            <LazyPost post={post} index={index2} clickPost={clickPost} parent={containerRef.current} scrolingState = {isScroling} viewPort = {viewPort} screenWidth={width}/>
                                             ) : null
                                        ))}
                                        
                                     </div>   
                                    )))
                }
             </>
                      
}    
        </div>
            
    )
}

function LazyPost({post , index ,clickPost , parent , scrolingState , viewPort , screenWidth}:any ){
    const [visible, setVisible] = useState(true)
    const cardRef = useRef<HTMLDivElement | null>(null)
  
    useEffect(() => {
        const element = cardRef.current
        if (!element) return

        const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
            setVisible(true)
            observer.disconnect()
        }else{
            setVisible(false)
        }
        }, { root :null ,  rootMargin: "200px", threshold: 0.1 })

        observer.observe(element)
        return () => observer.disconnect()
    }, [scrolingState])


    //to calculate the height of the non rendered image 

    const totalColumns = Math.max(1, viewPort)
    const containerWidth = parent.current?.clientWidth ?? window.innerWidth
    const horizontalGap = 15
    const containerHorizontalPadding = 20
    const columnWidth = Math.max(
        220,
        (containerWidth - containerHorizontalPadding - horizontalGap * (totalColumns - 1)) / totalColumns
    )
  
        const imageWidth = post.width || 1
        const imageHeight = post.height || 0
        const heightScale = screenWidth <= 520 ? 0.5 : 1
        const renderedHeight = ((imageHeight / imageWidth) * columnWidth ) * heightScale

      
    return (
    
       
<div className={`postContainer`} style={{ backgroundColor: darkColors[randomIndex(darkColors)] }} key={index} onClick={()=>clickPost(post.src.large,post.alt,post.id)} ref={cardRef}>
              {
            visible ? (   
                                <img src={post.src.medium} style={{width: "100%", height: renderedHeight, objectFit: "cover", display: "block"  }} />
                
              ):(
 <div style={{ height: renderedHeight }} />
            )
        } 
            
        </div>
            
        
        
    )
}
export {LazyPost}
export default MainContent
//comment