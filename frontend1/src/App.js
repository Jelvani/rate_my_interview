import React from "react";
import { Route, Switch } from "react-router-dom";

import Navigation from "./components/navbar"
import Welcome from "./components/welcome"
import Create from "./components/create"
import ReviewsList from "./components/reviewsList"
import Footer from "./components/footer"
import About from "./components/about"
import Login from "./components/login"
import PrivateRoute from './components/privateroute'
import PrivacyPolicy from "./components/privPolicy"
import Contact from "./components/contact"


const App = () => {

  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <Navigation />
        <Switch>
          <Route exact path="/">
            <div className='welcome gx-5'>
              <Welcome />
            </div>
          </Route>
          <Route path="/reviews">
            <ReviewsList />
            <br />
          </Route>
          <PrivateRoute path="/create">
            <Create />
          </PrivateRoute>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/privacy-policy">
            <PrivacyPolicy />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
        </Switch>

      </div>
      <Footer />
    </>

  );
};

export default App;
