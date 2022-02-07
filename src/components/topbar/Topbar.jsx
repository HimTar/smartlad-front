import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { Link, useHistory, withRouter } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Toolbar } from "@material-ui/core";

function Topbar() {
  const history = useHistory();
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const signout = () => {
    localStorage.clear();
    setTimeout(() => {
      history.go("/login");
    }, 3000);
  };

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">SmartLAD</span>
        </Link>
      </div>
      <div className="topbarLeft2"></div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input placeholder="Search " className="searchInput" />
        </div>
      </div>
      <div className="topbarRight">
        {/* <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div> */}
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            {/* <span className="topbarIconBadge">1</span> */}
          </div>
          {/* <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span> 
      </div> */}
          <div className="topbarIconItem">
            <Notifications />
            {/* <span className="topbarIconBadge">1</span> */}
          </div>
          {/* <div className="topbarIconItem">
            <Logout />
          </div> */}
        </div>
        <div className="dropdown">
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="topbarImg"
          />
          <ul className="dropdown-nav">
            <li className="dropdown-item">
              <Link to={`/profile/${user.username}`}>My Profile</Link>
            </li>
            <li className="dropdown-item">
              <Link to="/">My Network</Link>
            </li>
            <li className="dropdown-item">
              <Link to="/my-post">My Posts</Link>
            </li>
            <li className="dropdown-item">
              <Link onClick={signout}>Sign out</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Topbar);
