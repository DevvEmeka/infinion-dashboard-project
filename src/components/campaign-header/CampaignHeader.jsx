import React from "react";
import './CampaignHeader.scss'
import { IoMdSearch } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";

const CampaignHeader = () => {
  return (
    <div className="campaign-container">
      <div className="campaign-cover">
        <div className="activity-one">
          <div>
            All <span>(90)</span>
          </div>
        </div>
        <div className="activity-two">
          <div>Inactive</div>
          <div>(90)</div>
        </div>
        <div className="activity-three">
          <div>Active</div>
          <div>(90)</div>
        </div>
      </div>
      <div className="search-bar">
        <div className="search-first">
          <input type="text" placeholder="search..." />
          <IoMdSearch className="search-icon" />
        </div>
        <div className="search-second">
          <input type="text" placeholder="search..." />
          <RiArrowDropDownLine className="dwn-icon" />
        </div>
      </div>
      {/* <RxEyeOpen />
      <FaRegPenToSquare />
      <RiDeleteBin5Line /> */}
    </div>
  );
};

export default CampaignHeader;
