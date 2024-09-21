import React, { useState } from "react";
import "./Sidebar.scss";
import { BsSpeedometer } from "react-icons/bs";
import { FaPlus, FaRegCircleQuestion } from "react-icons/fa6";
import { HiOutlineLightBulb } from "react-icons/hi";
import { SlSettings } from "react-icons/sl";
import { TbSpeakerphone } from "react-icons/tb";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [activeLink, setActiveLink] = useState(0);
  const handleLinkClick = (index) => {
    setActiveLink(index);
  };

  const SIDEBAR_LINKS = [
    { id: 1, path: "/new_campaign", name: "New Campaign", icon: FaPlus },
    { id: 2, path: "/", name: "Overview", icon: BsSpeedometer },
    { id: 3, path: "/campaign_data", name: "Campaign", icon: TbSpeakerphone },
    {
      id: 4,
      path: "/",
      name: "Market Intelligience",
      icon: HiOutlineLightBulb,
    },
    { id: 5, path: "/", name: "Account Settings", icon: SlSettings },
  ];
  return (
    <section className="sidebar_container">
      {/* logo */}
      <div className="logo">
        <img
          src="/assets/arcticons_google-messages.png"
          alt="logo"
          className="logo-img"
        />
        <div className="logo-txt">Scrutz</div>
      </div>
      {/* logo */}

      {/* Navigation links */}
      <ul className="side-content">
        {SIDEBAR_LINKS.map((link, index) => (
          <li
            key={index}
            className={`list-items ${
              link.name === "Overview" ? "overview" : ""
            } ${link.name === "New Campaign" ? "new-campaign" : ""} ${activeLink === index ? 'active-link' : ''}`}
          >
            <Link to={link.path} onClick={() => handleLinkClick(index)}>
              <span className="list-icons">{link.icon()}</span>
              <span>{link.name}</span>
            </Link>
          </li>
        ))}
      </ul>
      {/* Navigation links */}

      {/* customer-care */}
      <div className="care-container">
        <div className="inner-container">
          <div>
            <FaRegCircleQuestion className="care-icon" />
          </div>
          <h3>Need help ?</h3>
          <div className="care-txt">
            <p>We're readily available to </p>
            <p>provide help</p>
          </div>
        </div>
        <div className="care-btn">Get help</div>
      </div>
      {/* customer-care */}
    </section>
  );
};

export default Sidebar;
