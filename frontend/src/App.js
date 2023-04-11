// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import "./index.css"
import SpotImagesPage from "./components/SpotImagesPage";
import CreateNewSpot from "./components/CreateNewSpot";
import LogInModal from "./components/LogInModal";
import SignupModal from "./components/SignupModal";
import SpotIdPage from "./components/SpotIdPage";
import ManageSpots from "./components/ManageSpots";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser())
    setIsLoaded(true)
  }, [dispatch])


  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LogInModal />
          </Route>
          <Route path="/signup">
            <SignupModal />
          </Route>
          <Route exact path="/">
            <SpotImagesPage />
          </Route>
          <Route path="/create-spot">
            <CreateNewSpot />
          </Route>
          <Route path="/spots/:id" component={SpotIdPage}>
            <SpotIdPage />
          </Route>
          <Route path="/manage-spots">
            <ManageSpots />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
