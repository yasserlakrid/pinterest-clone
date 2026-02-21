import { useState } from "react";
import SideBar from "./components/sideBar";
import Search from "./components/search";
import Parameter from "./components/parameter";
//components
import ExploreList from "./components/exploreList";
import Create from "./components/create";
import "./App.css";

function App() {
  const [exploreSh, setDis] = useState(false);
  const [param, openPar] = useState(false);
  const [create, openCreate] = useState(false);

  function closeOthers(open: any, close : ( (state : boolean)=> void)[] ){

    open((prev : Boolean)=> !prev)
    close.forEach((item : (state : boolean)=> void)=>{
      item(false)
    })
  }

  function toggleList() {
    
    setDis(!exploreSh)
  }


  function toggleParam() {
    closeOthers(openPar,[openCreate])
  }

  function toggleCreate() {
    closeOthers(openCreate,[openPar]);
  }
  
  return (
    <>
      <div className="Container">
        <div className="Search">
          <Search />
        </div>
        <div className="Side">
          <SideBar
            toggleList={toggleList}
            toggleParam={toggleParam}
            toggleCreate={toggleCreate}
          />
        </div>
        <div className="Main">
          <div className={`MainContent mainGrid ${(param || create) ? "with-param" : ""}`}>
            {param && <Parameter />}
            {create && <Create />}
            <div className="main-content">This is the main content</div>
          </div>

          {exploreSh && <ExploreList toggleList={toggleList} />}
        </div>
      </div>
    </>
  );
}

export default App;
