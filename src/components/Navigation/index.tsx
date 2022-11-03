import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="navigation">
      <ul>
        <li>
          <NavLink
            to={"/"}
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            Home Page
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/counter"}
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            Counter Page
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
