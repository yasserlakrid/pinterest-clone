import React, { useState } from "react";
import "./sidebar.css";

//Logos
import pinterestLogo from "../assets/pinterest.svg";
import HomeLogo from "../assets/home.svg";
import CompassLogo from "../assets/compass.png";
import GridLogo from "../assets/layout.png";
import AddLogo from "../assets/more.png";
import NotificationLogo from "../assets/bell.png";
import commentsLogo from "../assets/comment.png";
import settingsLogo from "../assets/adjust.png";

function SideBar({ toggleList, toggleParam, toggleCreate ,toggleNotification , toggleMessages , renderHome}: any) {
  function render() {}
  function renderCompass() {}
  function refrech() {
    window.location.reload();
  }

  return (
    <>
      <div className="container">
        <div className="logo PintLogo " onClick={refrech}>
          <img src={pinterestLogo} />
        </div>
        <div className="logo HomeLogo " onClick={renderHome}>
          <img src={HomeLogo} />
        </div>

        <div className="logo CompassLogo ">
          <img src={CompassLogo} onMouseOver={toggleList} />
        </div>

        <div className="logo GridLogo " onClick={renderCompass}>
          <img src={GridLogo} />
        </div>
        <div className="logo AddLogo " onClick={toggleCreate}>
          <img src={AddLogo} />
        </div>
        <div className="logo notificationLogo " onClick={toggleNotification}>
          <img src={NotificationLogo} />
        </div>
        <div className="logo messagesLogo " onClick={toggleMessages}>
          <img src={commentsLogo} />
        </div>
        <div className="logo settingsLogo " onClick={toggleParam}>
          <img src={settingsLogo} />
        </div>
      </div>
    </>
  );
}
export default SideBar;
