import React from "react";
import "./CampaignFeedback.scss";
import { FaPlus } from "react-icons/fa6";

const CampaignFeedback = () => {
  return (
    <div className="feedback-container">
      <div className="campaign-feedback-img">
        <img src="/public/assets/Clip path group.png" alt="overview image" />
      </div>
      <p className="campaign-txt">
        No activity yet. Create a new campaign to get started
      </p>
      <div className="campaign-btn">
        <FaPlus className="btn-icon"/>
        New Campaign
    </div>
    </div>
  );
};

export default CampaignFeedback;
