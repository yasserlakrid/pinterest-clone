import { useState } from "react";
import SideBar from "./components/sideBar";
import Search from "./components/search";
import Parameter from "./components/parameter";
import Notification from "./components/notification";
import Messages from "./components/messages";
//components
import ExploreList from "./components/exploreList";
import Create from "./components/create";
import "./App.css";

function App() {
  const [exploreSh, setDis] = useState(false);
  const [param, openPar] = useState(false);
  const [create, openCreate] = useState(false);
  const [notification, openNotification] = useState(false);
  const [messages , openMessages] = useState(false)
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
    console.log("hello noti")
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
            toggleNotification={toggleNotification}
            toggleMessages = {toggleMessages}
          />
        </div>
        <div className="Main">
          <div className={`MainContent mainGrid ${(param || create || notification || messages) ? "with-param" : ""}`}>
            {param && <Parameter />}
            {create && <Create />}
            {notification && <Notification />}
            {messages && <Messages />}
            <div className="main-content">This is the main content</div>
          </div>

          {exploreSh && <ExploreList toggleList={toggleList} />}

        </div>
      </div>
    </>
  );
}

export default App;
