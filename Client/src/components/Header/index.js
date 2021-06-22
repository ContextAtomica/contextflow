import React, { useContext } from "react";
import "./header.css";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../provider/UserProvider";
import { Navbar, Nav, Dropdown } from "react-bootstrap";
import logo from "../../assets/logo.png";
import axios from "axios";
import profile from "../../assets/profile.png";
import { CustomNavLinkSmall } from "./styles";

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
        {userData.user !== undefined ? (
          <>
            <Dropdown>
              <Dropdown.Toggle
                style={{ background: "rgb(255, 130, 92)" }}
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
        ) : (
          ""
        )}
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
              <CustomNavLinkSmall
                to="/contextlist"
                style={{ textDecoration: "none" }}
              >
                Context List
              </CustomNavLinkSmall>

              <CustomNavLinkSmall
                to="/anchor"
                style={{ textDecoration: "none" }}
              >
                Anchor
              </CustomNavLinkSmall>
              <CustomNavLinkSmall
                to="/search-context"
                style={{ textDecoration: "none" }}
              >
                Search
              </CustomNavLinkSmall>
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

// import { useState, useEffect, useContext } from "react";
// // import React, { useContext } from "react";
// // import "./header.css";
// import { Link, useHistory } from "react-router-dom";
// import { UserContext } from "../../provider/UserProvider";
// import { Nav, Dropdown } from "react-bootstrap";
// import logo from "../../assets/logo.png";
// import axios from "axios";
// import profile from "../../assets/profile.png";

// const Navbar = () => {
//   const value = useContext(UserContext);
//   const [userData, setUserData] = value.user;
//   const history = useHistory();
//   const [isOpen, setIsOpen] = useState(false);

//   const toggle = () => {
//     setIsOpen(!isOpen);
//   };

//   useEffect(() => {
//     const hideMenu = () => {
//       if (window.innerWidth > 768 && isOpen) {
//         setIsOpen(false);
//         console.log("i resized");
//       }
//     };

//     window.addEventListener("resize", hideMenu);

//     return () => {
//       window.removeEventListener("resize", hideMenu);
//     };
//   });

//   const LogOut = async () => {
//     try {
//       await axios.get("http://localhost:8080/user/logout");
//       localStorage.removeItem("firstLogin");
//       localStorage.setItem("refresh_token", "");
//       window.location.href = "/";
//     } catch (err) {
//       window.location.href = "/";
//     }
//   };

//   return (
//     <>
//       <nav
//         className="flex justify-between items-center h-16 bg-yellow-500 text-white relative shadow-sm font-mono"
//         role="navigation"
//       >
//         <Link to="/" className="pl-8">
//           HOME
//         </Link>
//         <div className="px-4 cursor-pointer md:hidden" onClick={toggle}>
//           <svg
//             className="w-8 h-8"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M4 6h16M4 12h16M4 18h16"
//             />
//           </svg>
//         </div>
//         <div className="pr-8 md:block hidden">
//           {userData.user !== undefined ? (
//             <ul className="flex items-center">
//               <li
//                 onClick={() => history.replace("/login")}
//                 className="p-4 cursor-pointer"
//               >
//                 Home
//               </li>
//               <li
//                 onClick={() => history.replace("/login")}
//                 className="p-4 cursor-pointer"
//               >
//                 Menu
//               </li>
//               <li
//                 onClick={() => history.replace("/login")}
//                 className="p-4 cursor-pointer"
//               >
//                 About
//               </li>
//               <li
//                 className="cursor-pointer"
//                 onClick={() => history.replace("/login")}
//                 className="p-4"
//               >
//                 Contact
//               </li>
//               <li className="cursor-pointer" className="p-4">
//                 <Dropdown>
//                   <Dropdown.Toggle
//                     style={{ background: "#0b615e" }}
//                     id="dropdown-basic"
//                   >
//                     {userData.user.name}
//                   </Dropdown.Toggle>

//                   <Dropdown.Menu style={{ background: "#F0FFFF" }}>
//                     <Dropdown.Item onClick={() => history.replace("/profile")}>
//                       Profile
//                     </Dropdown.Item>
//                     <Dropdown.Item
//                       onClick={() => {
//                         LogOut();
//                       }}
//                     >
//                       Logout
//                     </Dropdown.Item>
//                   </Dropdown.Menu>
//                 </Dropdown>
//               </li>
//             </ul>
//           ) : (
//             ""
//           )}
//         </div>
//       </nav>
//       <div
//         className={
//           isOpen
//             ? "grid grid-rows-4 text-center items-center list-none bg-yellow-500"
//             : "hidden"
//         }
//         onClick={toggle}
//       >
//         {userData.user !== undefined ? (
//           <ul className="items-center">
//             <li to="/" className="p-4">
//               Home
//             </li>
//             <li to="/menu" className="p-4">
//               Menu
//             </li>
//             <li to="/about" className="p-4">
//               About
//             </li>
//             <li to="/contact" className="p-4">
//               Contact
//             </li>
//           </ul>
//         ) : (
//           ""
//         )}
//       </div>
//     </>
//   );
// };

// export default Navbar;
