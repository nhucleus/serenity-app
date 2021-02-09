import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { Redirect } from "react-router-dom";
import * as sessionActions from "./store/auth";
import NavBar from "./components/NavBar";
import SplashPage from "./components/SplashPage";
import Dashboard from "./components/Dashboard";


function App() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [isLoaded, setIsLoaded] = useState(true);
  
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(false));
  }, [dispatch]);

  return (
    <>
      <NavBar isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/dashboard" exact>
            {sessionUser && <Dashboard />}
            {!sessionUser && <Redirect to="/" />}
          </Route>
          <Route path="/" exact>
            {sessionUser && <Redirect to="/dashboard" />}
            <SplashPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
