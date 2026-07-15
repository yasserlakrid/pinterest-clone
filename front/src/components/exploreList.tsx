import "./exploreList.css";

function ExploreList({ toggleList  , setintrest ,closeBigPost}  : any )  {

  const ListOfIntrest = [
    "Art",
    "Animaux de compagnie",
    "Beauté",
    "Design",
    "Cuisine et Boissons",
    "Mode femme",
    "Mode homme",
    "Décoration intérieure",
    "Bricolage et DIY",
    "Citations",
    "Voyage",
    "Fitness",
    "Mariages",
  ];
  function handleClick(e : any){
    closeBigPost(false)
    setintrest(e)
    closeBigPost(false)
  }
  return (
    <>
      <div className="containerList" onMouseLeave={toggleList}>
        {ListOfIntrest.map((e,index) => (
          <div key = {index}>
            <p onClick={()=>handleClick(e)}> {e}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default ExploreList;
