
import {LazyPost} from "./mainContent.tsx";
import type { column } from "./mainContent.tsx";

import "./mainContent.css"
import "./Application.css"
function ExtendPost({source , columns , containerRef , clickPost , isScroling , viewPort , width }  : any ) {
   
   return (
       <>
      

<div className="extendedPostContainer">
            <div className="extendedPost">
               <img src={source} alt="Extended Post" />
            </div>
            <div className="extendedpostDescription">

            </div>
            
            </div>
            { columns[0] && columns[0].posts && columns[0].posts.length === 0 ? (<>
               
               </> ): (

                            columns.map((column : column ,index : number)=>(
                                    <div className={(index === 0 || index === 1) ? "column clicked" : "column other" }  key={index}>
                                        {column.posts.map((post : object | any , index2 : number)=>(
                                             post && post.src ? (
                                            <LazyPost post={post} index={index2} clickPost={clickPost} parent={containerRef.current} scrolingState = {isScroling} viewPort = {viewPort} screenWidth={width}/>
                                             ) : null
                                        ))}
                                        
                                     </div>   
                                    )))
                }

    
       
      
       </>
             

            
     
    )
}
export default ExtendPost;
