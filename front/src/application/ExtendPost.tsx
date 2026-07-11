import React, { useEffect, useRef, useState } from "react";
import SearchDrop from "../components/searchDrop";
import {LazyPost} from "./mainContent.tsx";
import type { column } from "./mainContent.tsx";

import "./mainContent.css"

function ExtendPost({source , columns , loading , searchDrop , containerRef , setSearchDrop , closeDrop , DropState , setDropQuery , closeSearchDrop , clickedState , clickPost , isScroling , viewPort , width }  : any ) {
    return (
       <div className= "MainContentVid "  ref={containerRef} style={{ placeItems : loading? "start" : "", paddingTop : loading?"64px":"0"} } onClick={closeSearchDrop}>
           
            {searchDrop &&<SearchDrop setquery={setDropQuery} closeDrop = {setSearchDrop} closePost = {closeDrop} DropState={DropState}/>}
            
            {
                loading &&
                    <div className="loadingAniamtion">
                        loading
                    </div>
                
            }

             

            { columns[0] && columns[0].posts && columns[0].posts.length === 0 ? (<>
               
               </> ): (

                            columns.map((column : column ,index : number)=>(
                                    <div className={(index === 0 || index === 1) ? "column clicked" : "column" } key={index}>
                                        {column.posts.map((post : object | any , index2 : number)=>(
                                             post && post.src ? (
                                            <LazyPost post={post} index={index2} clickPost={clickPost} parent={containerRef.current} scrolingState = {isScroling} viewPort = {viewPort} screenWidth={width}/>
                                             ) : null
                                        ))}
                                        
                                     </div>   
                                    )))
                }
                                        
         </div>   
            
     
    )
}
export default ExtendPost;
