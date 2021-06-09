import React from "react";
import Anchor from "./components/anchor/index";
import Header from "./components/Header/index";
import LandingPage from "./components/Landing-page/index";
import ContextList from "./components/contextlist/ContextList";
import "bootstrap/dist/css/bootstrap.css";
import "toastr/build/toastr.min.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import UserProvider from "./provider/UserProvider";
import "./App.css";
import SearchContext from "./components/contextlist/SearchContext";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
// import UserProvider from "./provider/UserProvider";
import ActivationEmail from "./components/auth/ActivationEmail";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";
import Profile from "./components/profile";
function App() {
  return (
    <div className="App">
      <UserProvider>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/anchor" component={Anchor} />
            <Route path="/contextlist" component={ContextList} />
            {/* <Route path="/sign-up" component={SignUp} />
            <Route path="/login" component={LogIn} /> */}
            <Route path="/search-context" component={SearchContext} />

            <Route path="/login" component={Login} exact />
            <Route path="/register" component={Register} exact />
            <Route path="/profile" component={Profile} exact />
            <Route
              path="/user/activate/:activation_token"
              component={ActivationEmail}
              exact
            />
            <Route path="/forgot_password" component={ForgotPassword} exact />
            <Route path="/user/reset/:token" component={ResetPassword} exact />
          </Switch>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
