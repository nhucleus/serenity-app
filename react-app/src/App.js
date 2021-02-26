import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { Redirect } from "react-router-dom";
import * as sessionActions from "./store/auth";
import NavBar from "./components/NavBar";
import SplashPage from "./components/SplashPage";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";
import Drawer from "./components/Drawer";
import JournalEntriesList from "./components/JournalEntriesList";
import DrawingsList from "./components/DrawingsList";
import FriendsList from "./components/FriendsList";
import Inbox from "./components/Inbox";


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
      {sessionUser && <Drawer />}
      {isLoaded && (
        <Switch>
          <Route path="/" exact>
            {sessionUser && <Redirect to="/dashboard" />}
            <SplashPage />
            <Footer />
          </Route>
          <Route path="/entries/journal">
            {!sessionUser && <Redirect to="/" />}
            <JournalEntriesList />
          </Route>
          <Route path="/entries/drawings">
            {!sessionUser && <Redirect to="/" />}
            <DrawingsList />
          </Route>
          <Route path="/dashboard" exact>
            {sessionUser && <Dashboard />}
            {!sessionUser && <Redirect to="/" />}
            <Footer />
          </Route>
          <Route path="/friends">
            <FriendsList />
            <Footer /> 
          </Route>
          <Route path="/inbox">
            <Inbox />
            <Footer /> 
          </Route>
        </Switch>
      )}
      
    </>
  );
};

export default App;
