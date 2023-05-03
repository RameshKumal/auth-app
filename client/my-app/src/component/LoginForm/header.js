import { NavLink } from "react-router-dom";
import "./header.css";
import { useEffect, useState } from "react";

const Header = () => {
  const [isCookie, setCookie] = useState(false);
  const [state, setState] = useState({});
  console.log(document.cookie);
  const getCookie = () => {
    // let decodedCookie = decodeURIComponent(document.cookie);
    // let arr = decodedCookie.split(";");

    if (document.cookie) {
      setCookie(true);
    }
  };
  useEffect(() => {
    getCookie();
  }, [document.cookie]);
  return (
    <>
      <nav className="navbar ">
        <div className="item-1">Navbar</div>
        <div className="item-2">
          <NavLink to="/Home" className="nav-link">
            Home
          </NavLink>
        </div>
        <div className="item-3">
          <NavLink to="/register" className="nav-link">
            Register
          </NavLink>
        </div>
        <div className="item-4">
          <NavLink to="/StoreOwner" className="nav-link">
            Dashboard
          </NavLink>
        </div>
        <div className="item-5">
          {isCookie ? <button className="headerbtn">Log Out</button> : <button>Log In</button>}
        </div>
      </nav>
    </>
  );
};

export default Header;
