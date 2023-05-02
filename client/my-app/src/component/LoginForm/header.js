import { NavLink } from "react-router-dom";
import "./header.css";

const Header = () => {
  return (
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
    </nav>
  );
};

export default Header;
