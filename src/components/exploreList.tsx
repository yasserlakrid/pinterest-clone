import "./exploreList.css";

function ExploreList({ toggleList }: any) {
  var ListOfIntrest = [
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
        {ListOfIntrest.map((e) => (
          <div>
            <p>{e}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default ExploreList;
