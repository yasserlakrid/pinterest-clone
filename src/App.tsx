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

  function toggleList() {
    setDis(!exploreSh);
  }

  function toggleParam() {
    openPar(!param);
  }

  function toggleCreate() {
    openCreate(!create);
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
