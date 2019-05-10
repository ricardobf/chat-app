import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Login from "./Login";
import Chat from "./Chat";

import auth from "./auth";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      auth.isAuthenticated() ? (
        <Component {...props} auth={auth} />
      ) : (
        <Redirect
          to={{
            pathname: "/login"
          }}
        />
      )
    }
  />
);

const App = () => (
  <Router>
    <Switch>
      <Route path="/login" render={props => <Login {...props} auth={auth} />} />
      <PrivateRoute path="/" component={Chat} />
    </Switch>
  </Router>
);

export default App;
