import "./exploreList.css";

function ExploreList({ toggleList  , intrest , setintrest}: any )  {

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
  return (
    <>
      <div className="containerList" onMouseLeave={toggleList}>
        {ListOfIntrest.map((e,index) => (
          <div key = {index}>
            <p onClick={()=>setintrest(e)}> {e}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default ExploreList;
