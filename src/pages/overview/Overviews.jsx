import React from "react";
import "./Overviews.scss";
import { HiMiniArrowUpTray } from "react-icons/hi2";
import { PiCalendarDots } from "react-icons/pi";
import { RiArrowDropDownLine } from "react-icons/ri";
import CampaignFeedback from "../../components/campaign-feedback/CampaignFeedback";

const Overview = () => {
  return (
    <section className="overview-cover">
      <div className="overview-main">
        <div className="overview-txt">Overview</div>
        <div className="overview-data">
          <div className="date-container">
            <div className="calender">
              <PiCalendarDots className="cal-icon" />
              <div className="cal-txt">Date Range</div>
            </div>
            <div className="realtime-date">
              <p>Nov 1, 2022 - Nov 7, 2022.</p>
              <RiArrowDropDownLine className="arrow-icon" />
            </div>
          </div>
          <div className="export">
            <HiMiniArrowUpTray className="export-icon" />
            <p>Export</p>
          </div>
        </div>
      </div>

      <CampaignFeedback />
    </section>
    // <div>
    //   <ReactSelect />
      
      
    // </div>
  );
};

export default Overview;
