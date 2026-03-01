import { use, useState } from "react";
import SideBar from "./components/sideBar";
import Search from "./components/search";
import Parameter from "./components/parameter";
import Notification from "./components/notification";
import Messages from "./components/messages";
//components
import ExploreList from "./components/exploreList";
import MainContent from "./mainContent"
import Create from "./components/create";
import "./App.css";

function App() {
  const [exploreSh, setDis] = useState(false);
  const [param, openPar] = useState(false);
  const [create, openCreate] = useState(false);
  const [notification, openNotification] = useState(false);
  const [messages , openMessages] = useState(false)
  const [interest , setinterest] = useState<string>("random")
  const [searchQuery , setsearchQuery] = useState<string>("search")
  
 //side bar functions 
  function closeOthers(open: ( (state : (prev: Boolean) => boolean)=> void), close : ( (state : boolean)=> void)[] ){
    open((prev : Boolean)=> !prev)
    close.forEach((item : (state : boolean)=> void)=>{
      item(false)
    })
  }

  function toggleList() {
    setDis(!exploreSh)
  }


  function toggleParam() {
    closeOthers(openPar,[openCreate,openNotification,openMessages])
  }

  function toggleCreate() {
    closeOthers(openCreate,[openPar,openNotification,openMessages])
  }
  function toggleNotification(){
    closeOthers(openNotification,[openCreate,openPar,openMessages])
    
  }
  function toggleMessages(){
    closeOthers(openMessages,[openCreate,openNotification,openPar])
  }
  function renderHome(){
      setinterest("random")
  }
 
  return (
    <>
      <div className="Container">
        <div className="Search">
          <Search query={searchQuery} setQuery={setsearchQuery}/>
        </div>
        <div className="Side">
          <SideBar
            toggleList={toggleList}
            toggleParam={toggleParam}
            toggleCreate={toggleCreate}
            toggleNotification={toggleNotification}
            toggleMessages = {toggleMessages}
            renderHome = {renderHome}
          />
        </div>
        <div className="Main">
          <div className={`MainContent mainGrid ${(param || create || notification || messages) ? "with-param" : ""}`}>
            {param && <Parameter />}
            {create && <Create />}
            {notification && <Notification />}
            {messages && <Messages />}
            <MainContent intrest = {interest} query= {searchQuery}/>
          </div>
          {exploreSh && <ExploreList toggleList={toggleList} intrest = {interest} setintrest={setinterest}/>}

        </div>
      </div>
    </>
  );
}

export default App;
