
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
        <div className="SearchDrop">
            <div className="recherched">
                <p className="recent">
                    recent recherches
                </p>
                <div>
{ListOfIntrest.map((e,index)=>
                <div key = {index}>
                    {e}
                </div>
            )}
                </div>
                
            </div>

            <div className="idea">
                <p className="ideaFor">
                    ideas for you
                </p>
                <div>
                    {ListOfIntrest.map((e,index)=>
                <div key = {index}>
                    {e}
                </div>
            )}
                </div>
                
            </div>

            <div>
                <p>
                    popular at pintrest
                </p>
                <div>
{ListOfIntrest.map((e,index)=>
                <div key = {index}>
                    {e}
                </div>
            )}
                </div>
                
            </div>
            
            <div>
                
            </div>
            <div>
                
            </div>
        </div>
    )
}
export default SearchDrop