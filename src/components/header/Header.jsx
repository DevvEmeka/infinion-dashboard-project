import React from "react";
import "./Header.scss";
import { IoMdSearch } from "react-icons/io";
import { FaRegBell } from "react-icons/fa";
import { IoPersonCircleOutline } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";

const Header = () => {
  return (
    <header className="header-cover">
      <div className="inner-cover">
        <div className="search">
          <input type="text" placeholder="search..." />
          <IoMdSearch className="search-icon" />
        </div>
        <div className="header-profile">
          <div className="bell-container">
            <FaRegBell className="bell-icon" />
          </div>
          <div className="account">
            <IoPersonCircleOutline className="profile-icon" />
            <p className="profile-txt">Big Tech</p>
            <RiArrowDropDownLine className="arrow-icon" />
          </div>
        </div>
      </div>
      <div className="header-line"></div>
    </header>
  );
};

export default Header;
