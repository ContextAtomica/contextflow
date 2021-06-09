import React, { useContext } from "react";
import "./header.css";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../provider/UserProvider";
import { Navbar, Nav, Dropdown } from "react-bootstrap";
import logo from "../../assets/logo.png";
import axios from "axios";
import profile from "../../assets/profile.png";

const Header = () => {
  const value = useContext(UserContext);
  const [userData, setUserData] = value.user;
  const history = useHistory();
  const LogOut = async () => {
    try {
      await axios.get("http://localhost:8080/user/logout");
      localStorage.removeItem("firstLogin");
      localStorage.setItem("refresh_token", "");
      window.location.href = "/";
    } catch (err) {
      window.location.href = "/";
    }
  };
  const userLink = () => {
    return (
      <>
        <Dropdown>
          <Dropdown.Toggle
            style={{ background: "#0b615e" }}
            id="dropdown-basic"
          >
            {userData.user.name}
          </Dropdown.Toggle>

          <Dropdown.Menu style={{ background: "#F0FFFF" }}>
            <Dropdown.Item onClick={() => history.replace("/profile")}>
              Profile
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                LogOut();
              }}
            >
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </>
    );
  };
  return (
    <Navbar collapseOnSelect expand="lg" className="nav" variant="dark">
      <Navbar.Brand>
        <Link style={{ textDecoration: "none" }} to="/">
          <img className="logo-wrapper" src={logo} alt="logo" />
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          {userData.user !== undefined ? (
            <>
              <Nav.Link
                as={Link}
                to="/contextlist"
                style={{ color: "#F0FFFF" }}
                className="nav-item"
              >
                Context List
              </Nav.Link>

              <Nav.Link
                as={Link}
                to="/anchor"
                style={{ color: "#F0FFFF" }}
                className="nav-item"
              >
                Anchor
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/search-context"
                style={{ color: "#F0FFFF" }}
                className="nav-item"
              >
                Search
              </Nav.Link>
            </>
          ) : (
            ""
          )}
        </Nav>
        <Nav>
          {userData.user !== undefined ? (
            userLink()
          ) : (
            <>
              <span
                className="signin"
                onClick={() => history.replace("/login")}
              >
                <img src={profile} alt="icon" />
                Sign In
              </span>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default Header;
