import React, { useState, useContext, useEffect } from "react";
import "./index.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { showErrMsg, showSuccessMsg } from "../utils/notification/Notification";
import { GoogleLogin } from "react-google-login";
import { UserLogin, getAccessToken } from "../../client-api/user-login";
import { UserContext } from "../../provider/UserProvider";

const initialState = {
  email: "",
  password: "",
  err: "",
  success: "",
};

function Login() {
  const value = useContext(UserContext);
  const [userData, setUserData] = value.user;
  const [users, setUsers] = useState(initialState);

  const { email, password, err, success } = users;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUsers({ ...users, [name]: value, err: "", success: "" });
  };
  const firstLogin = localStorage.getItem("firstLogin");
  useEffect(async () => {
    if (firstLogin) {
      const refresh_token = localStorage.getItem("refresh_token");
      const res = await getAccessToken({ refresh_token: refresh_token });
      if (res.data.access_token) {
        const resdata = await axios.get("http://localhost:8080/user/infor", {
          headers: { Authorization: res.data.access_token },
        });
        setUserData(resdata.data);
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await UserLogin({
        email,
        password,
      });

      localStorage.setItem("refresh_token", res.data.refresh_token);
      localStorage.setItem("firstLogin", true);

      setUsers({ ...users, err: "", success: res.data.msg });
      window.location.href = "/";
    } catch (err) {
      err.response.data.msg &&
        setUsers({ ...users, err: err.response.data.msg, success: "" });
    }
  };

  const responseGoogle = async (response) => {
    try {
      const res = await axios.post("http://localhost:8080/user/google_login", {
        tokenId: response.tokenId,
      });
      localStorage.setItem("refresh_token", res.data.refresh_token);
      localStorage.setItem("firstLogin", true);

      setUsers({ ...users, error: "", success: res.data.msg });

      window.location.href = "/";
    } catch (err) {
      err.response.data.msg &&
        setUsers({ ...users, err: err.response.data.msg, success: "" });
    }
  };

  const responseFacebook = async (response) => {
    try {
      const { accessToken, userID } = response;
      const res = await axios.post(
        "http://localhost:8080/user/facebook_login",
        {
          accessToken,
          userID,
        }
      );

      setUsers({ ...users, error: "", success: res.data.msg });
      localStorage.setItem("firstLogin", true);
      window.location.href = "/";
    } catch (err) {
      err.response.data.msg &&
        setUsers({ ...users, err: err.response.data.msg, success: "" });
    }
  };

  return (
    <div className="login_page">
      <h2>Login</h2>
      {err && showErrMsg(err)}
      {success && showSuccessMsg(success)}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email Address</label>
          <input
            type="text"
            required={true}
            placeholder="Enter email address"
            id="email"
            value={email}
            name="email"
            onChange={handleChangeInput}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            required={true}
            placeholder="Enter password"
            id="password"
            value={password}
            name="password"
            onChange={handleChangeInput}
          />
        </div>

        <div className="row">
          <button type="submit">Login</button>
          <Link to="/forgot_password">Forgot your password?</Link>
        </div>
      </form>

      <div className="hr">Or Login With</div>

      <div className="social">
        <GoogleLogin
          clientId="205097311165-9bhfilmspcpdn4ohprs2ln0asov2lpa7.apps.googleusercontent.com"
          buttonText="Login with google"
          onSuccess={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
      </div>

      <p>
        New Customer? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default Login;
