import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import Groups from "./pages/groups/Groups";
import Network from "./pages/network/Network";
import GroupChat from "./pages/groupChat/GroupChat";
import Courses from "./pages/courses/courses";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

import "./global.css";

const ProtectedRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      auth ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);

function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user ? <Home /> : <Register />}
        </Route>
        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route>
        <ProtectedRoute
          exact
          auth={user}
          path="/profile/:username"
          component={Profile}
        />

        <ProtectedRoute exact auth={user} path="/groups" component={Groups} />

        <ProtectedRoute
          exact
          auth={user}
          path="/my-network"
          component={Network}
        />

        <ProtectedRoute
          exact
          auth={user}
          path="/groups/:name"
          component={GroupChat}
        />

        <Route exact path="/courses" component={Courses} />
      </Switch>
    </Router>
  );
}

export default App;
