import {  useEffect, useState } from "react";


import "./search.css"
function Search({setQuery , searchDrop , closeSearchDrop , user , logState}:any) {
  const [submitedSearch , setsubmitedSearch] = useState<string>("")
  const [toggleProfile , setToggleProfile] = useState(false)
  const [searchList , setSearchList] = useState<string[]>([])
  function handleSubmit(){
    setQuery(submitedSearch)
   }

  function handleLogOut(){
    localStorage.setItem("user","")
    localStorage.setItem("state","")
    logState(false)
  }
  function toUpper(item : string){
      let first = item[0];
      let sub
      first = first.toUpperCase();
      sub = first ;
      for(let i = 1 ; i < item.length ; i++){
        sub += item[i]
      }
      return sub 
  }
  return (
    <>
      <div className="searchBar" onClick={closeSearchDrop}>

        <button className="submitSearch" onClick={handleSubmit}></button>
        <input className="searchInput s" type="text" placeholder="search" value={submitedSearch} onChange={(e:any)=>setsubmitedSearch(e.target.value) } onClick={()=>{searchDrop(true)}}/>

      <div className="userProfile" onClick={()=>setToggleProfile(prev=>!prev)}>
        <img src="" alt="" />
        <div className="userDetails" style={{display : toggleProfile ? "flex": "none"}}>
            <div className="userName">
                 {user.prenom  ? toUpper(user.prenom): toUpper(JSON.parse(localStorage.getItem("user")||"").prenom)  } {user.nom ? toUpper(user.nom) : toUpper(JSON.parse(localStorage.getItem("user")||"").nom)}
            </div>
            <div className="option">
              <button className="logOut" onClick={handleLogOut}>Log out</button>
            </div>
        </div>
      </div>
      
      </div>

      
    </>
  );
}
export default Search;
