import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { AuthContext } from "../../context/AuthContext";

import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";

function formatDate(dateVal) {
  var newDate = new Date(dateVal);

  var sMonth = padValue(newDate.getMonth() + 1);
  var sDay = padValue(newDate.getDate());
  var sYear = newDate.getFullYear();
  var sHour = newDate.getHours();
  var sMinute = padValue(newDate.getMinutes());
  var sAMPM = "AM";

  var iHourCheck = parseInt(sHour);

  if (iHourCheck > 12) {
    sAMPM = "PM";
    sHour = iHourCheck - 12;
  } else if (iHourCheck === 0) {
    sHour = "12";
  }

  sHour = padValue(sHour);

  return (
    sMonth +
    "/" +
    sDay +
    "/" +
    sYear +
    " " +
    sHour +
    ":" +
    sMinute +
    " " +
    sAMPM
  );
}

function padValue(value) {
  return value < 10 ? "0" + value : value;
}

const GalleryIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      height="100%"
      viewBox="0 0 172 172"
      style={{ fill: "#000", cursor: "pointer" }}
    >
      <g
        fill="none"
        fillRule="nonzero"
        stroke="none"
        strokeWidth="1"
        strokeLinecap="butt"
        strokeLinejoin="miter"
        strokeMiterlimit="10"
        strokeDasharray=""
        strokeDashoffset="0"
        fontFamily="none"
        fontWeight="none"
        fontSize="none"
        textAnchor="none"
        style={{ mixBlendMode: "normal" }}
      >
        <path d="M0,172v-172h172v172z" fill="none"></path>
        <g fill="#ffffff">
          <path d="M48.88576,22.52152c-3.29773,-0.13662 -6.52645,0.97062 -9.04632,3.10228c-2.86669,2.22432 -4.70353,5.52048 -5.08705,9.12859l-1.7551,14.39047h-5.44356c-7.72245,0 -13.51291,6.84627 -13.51291,14.56872v71.78093c-0.09623,3.62874 1.29062,7.13996 3.84055,9.72353c2.54993,2.58357 6.04268,4.01631 9.67236,3.96764h96.35579c7.72245,0 14.74354,-5.96872 14.74354,-13.69117v-2.80748c2.39449,-0.46222 4.66637,-1.41837 6.67076,-2.80748c2.84282,-2.3947 4.66271,-5.78552 5.08705,-9.47824l8.07621,-71.25646c0.82334,-7.74142 -4.73296,-14.70514 -12.46397,-15.62109l-95.82789,-10.88026c-0.43422,-0.06178 -0.87125,-0.10183 -1.30947,-0.11998zM48.7795,29.45623c0.23801,-0.00023 0.47591,0.01006 0.71301,0.03085l95.65306,11.05509c1.86633,0.17646 3.58456,1.09203 4.77191,2.54273c1.18735,1.4507 1.74517,3.31602 1.5492,5.1804l-8.25104,71.25646c0.01525,1.84801 -0.8266,3.5988 -2.27958,4.74083c-0.70204,0.70204 -2.283,1.051 -2.283,1.40202v-61.95305c-0.27634,-7.99638 -6.74444,-14.38778 -14.74354,-14.56872h-83.89182l1.57685,-13.69117c0.34276,-1.77242 1.26968,-3.37883 2.63265,-4.56258c1.33836,-0.92546 2.92514,-1.42491 4.5523,-1.43288zM27.55373,56.16327h96.35579c4.12597,0.17068 7.45805,3.42733 7.72314,7.54831v29.48366l-38.2626,22.29185c-3.28486,1.94498 -7.44177,1.59261 -10.35236,-0.87755l-19.30612,-17.02655c-5.53348,-4.75633 -13.62263,-5.04807 -19.48437,-0.70273l-23.16598,16.85172v-50.02041c0,-3.86122 2.63128,-7.54831 6.49251,-7.54831zM87.8408,67.23206c-4.01251,-0.1664 -7.91926,1.31129 -10.81724,4.09152c-2.89798,2.78023 -4.53637,6.62235 -4.53647,10.63831c-0.00038,8.14145 6.59866,14.74203 14.74012,14.74354c8.02677,0.00575 14.58316,-6.41095 14.75023,-14.43599c0.16707,-8.02504 -6.11657,-14.70906 -14.13663,-15.03738zM87.2272,74.24219c3.12394,-0.00111 5.94084,1.88 7.13683,4.76593c1.19599,2.88593 0.53547,6.20816 -1.67349,8.41712c-2.20896,2.20896 -5.53119,2.86948 -8.41712,1.67349c-2.88593,-1.19599 -4.76704,-4.01289 -4.76593,-7.13683c0.00151,-4.26285 3.45686,-7.71819 7.71971,-7.71971zM53.77742,100.76411c2.00104,0.09086 3.90423,0.89176 5.36814,2.25901l19.1313,16.85172c2.90551,2.43894 6.56276,3.80208 10.35579,3.85985c2.96613,0.03623 5.88375,-0.75431 8.42586,-2.283l34.57414,-20.00542v34.04624c0,3.86122 -3.86191,6.67076 -7.72314,6.67076h-96.35579c-1.76865,0.05156 -3.47787,-0.64085 -4.71197,-1.90883c-1.2341,-1.26798 -1.87997,-2.99533 -1.78054,-4.76193v-12.98501l27.20408,-20.00885c1.57541,-1.20996 3.52771,-1.8243 5.51212,-1.73454z"></path>
        </g>
      </g>
    </svg>
  );
};

const ChatMessage = ({ chat }) => {
  const { user } = useContext(AuthContext);

  return (
    <div
      className={`singleChatCont ${
        chat.username === user.username ? "right" : "left"
      }`}
    >
      <p className="chatUser">{chat.username}</p>
      <p className="chatText">{chat.text}</p>
      <p className="chatTime">{formatDate(chat.time)}</p>
    </div>
  );
};

const Chats = ({ chats }) => {
  return (
    <div className="chatCont">
      {!chats.length && <p className="defaultText">No chats yet ..</p>}
      {chats.map((chat, ind) => {
        return <ChatMessage chat={chat} key={ind} />;
      })}
    </div>
  );
};

const Groups = () => {
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState({ text: "", img: "" });
  const { user } = useContext(AuthContext);
  const { name } = useParams();

  const refreshChats = async () => {
    try {
      const { data } = await axios.get(`/chats/get-all-chats?group=${name}`);

      console.log("chats : ", data);

      setChats(data);
    } catch (err) {
      console.log(err);
    }
  };

  const startRefresh = () => {
    setInterval(() => {
      refreshChats();
    }, 5000);
  };

  useEffect(() => {
    refreshChats();

    startRefresh();
  }, []);

  const handleSubmit = async () => {
    try {
      if (!message.text) return;

      const data = {
        ...message,
        group: name,
        time: new Date().toISOString(),
        username: user.username,
      };

      await axios.post("/chats/", data);

      setMessage({ text: "", img: "" });
      refreshChats();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="groupChatCont">
      <Chats chats={chats} />
      <div className="messageCont">
        <div className="innMess">
          <GalleryIcon />
          <textarea
            type="text"
            value={message.text}
            className="message"
            placeholder="Enter your message here .."
            onChange={({ target }) => {
              setMessage({ ...message, text: target.value });
            }}
          />
          <button className="send" onClick={handleSubmit}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default function MainCont() {
  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />

        <Groups />
      </div>
    </>
  );
}
