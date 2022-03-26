import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { useContext, useEffect, useState } from "react";
import axios from "../../utils/axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@material-ui/icons";

export default function Rightbar() {
  const Image = ({ url, text }) => {
    return (
      <div className="Rtcontainer">
        <img className="RtImg" src={url} />
        <h1 className="RtText">{text}</h1>
      </div>
    );
  };

  const HomeRightbar = () => {
    return (
      <>
        <Image url="assets/work.jpg" text="Find Friends" />
        <Image url="assets/mentor.jpg" text="Find your guru" />
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        <HomeRightbar />
      </div>
    </div>
  );
}
