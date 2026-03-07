
  import "./searchDrop.css"
function SearchDrop(){
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
        <div className="SearchDrop s">
            <div className="recherched s">
                <p className="recent s">
                    recent recherches
                </p>
                <div className="s">
                    {ListOfIntrest.map((e,index)=>
                        <div key = {index} className="s">
                            {e}
                        </div>
                    )}
                </div>
                
            </div>
            
            <div className="recherched s">
                <p className="ideas s">
                    ideas for you
                </p>
                <div className="s"> 
                    {ListOfIntrest.map((e,index)=>
                        <div key = {index} className="s">
                            {e}
                        </div>
                    )}
                </div>
                
            </div>

            <div className="recherched s">
                <p className="trend s">
                    trendy on pintrest
                </p>
                <div className="s">
                    {ListOfIntrest.map((e,index)=>
                        <div key = {index} className="s">
                            {e}
                        </div>
                    )}
                </div>
                
            </div>
           

            
                
        </div>
       
    )
}
export default SearchDrop