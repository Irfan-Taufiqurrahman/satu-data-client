import React from "react";
import { NavLink } from "react-router-dom";
import useNavStore from "../context/userNavStore";

const Subnav = ({ label, icon, open, href }) => {
  const { switchNav, findNav, findActiveNav } = useNavStore();
  const currentPage = findNav(label);
  const activeNav = findActiveNav();
  return (
    <li>
      <NavLink to={currentPage.href} onClick={() => switchNav(currentPage.id)}>
        <div
          to={currentPage.href}
          className={`flex items-center p-2 text-base font-normal hover:text-gray-800 rounded-lg hover:bg-gray-100 group active:bg-gray-100 active:text-gray-800 ${
            currentPage === activeNav
              ? "bg-gray-100 text-gray-800"
              : "text-gray-50"
          } `}
        >
          {currentPage.icon}
          <span className={`ml-3 ${open ? "flex" : "hidden"}`}>{label}</span>
        </div>
      </NavLink>
    </li>
  );
};

export default Subnav;