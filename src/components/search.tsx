import {  useState } from "react";


import "./search.css"
function Search({setQuery , searchDrop , closeSearchDrop}:any) {
  const [submitedSearch , setsubmitedSearch] = useState<string>("")

  function handleSubmit(){
    setQuery(submitedSearch)
    
  }

 

  return (
    <>
      <div className="searchBar" onClick={closeSearchDrop}>
        <input className="searchInput s" type="text" placeholder="search" value={submitedSearch} onChange={(e:any)=>setsubmitedSearch(e.target.value) } onClick={()=>{searchDrop(true)}}/>

        <button className="submitSearch" onClick={handleSubmit}> search</button>

      </div>

      
    </>
  );
}
export default Search;
