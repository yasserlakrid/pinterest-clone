import { useEffect, useState } from "react";


import "./search.css"
function Search({query ,setQuery , searchDrop}:any) {
  const [submitedSearch , setsubmitedSearch] = useState<string>("")

  function handleSubmit(){
    setQuery(submitedSearch)
    
  }

 

  return (
    <>
      <div className="searchBar">
        <input className="searchInput" type="text" placeholder="search" value={submitedSearch} onChange={(e:any)=>setsubmitedSearch(e.target.value) } onClick={()=>{searchDrop(true)}}/>

        <button className="submitSearch" onClick={handleSubmit}> search</button>

      </div>

      
    </>
  );
}
export default Search;
