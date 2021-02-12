import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { Redirect } from "react-router-dom";
import * as sessionActions from "./store/auth";
import NavBar from "./components/NavBar";
import SplashPage from "./components/SplashPage";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";


function App() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(async () => {
    await dispatch(sessionActions.restoreUser())
    setIsLoaded(true)
  }, [dispatch]);

  return (
    <>
      <NavBar isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/" exact>
            {sessionUser && <Redirect to="/dashboard" />}
            <SplashPage />
          </Route>
          <Route path="/dashboard" exact>
            {sessionUser && <Dashboard />}
            {!sessionUser && <Redirect to="/" />}
          </Route>
        </Switch>
      )}
      <Footer />
    </>
  );
}

export default App;
