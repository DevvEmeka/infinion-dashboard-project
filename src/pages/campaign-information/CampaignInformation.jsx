import React, { useEffect, useState } from "react";
import "./CampaignInformation.scss";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";

const CampaignInformation = () => {
  const [viewData, setViewData] = useState(null); // Use null as initial state for fetched data
  const { id } = useParams(); // Get campaign ID from URL params
  const navigate = useNavigate(); // For navigation after deletion

  // Fetch campaign data by ID when the component mounts or when ID changes
  useEffect(() => {
    axios
      .get(`https://infinion-test-int-test.azurewebsites.net/api/Campaign/${id}`)
      .then((res) => {
        setViewData(res.data); // Adjusted to set the fetched data directly
        console.log("Fetched campaign data:", res.data);
      })
      .catch((err) => {
        console.error("Error fetching campaign:", err);
      });
  }, [id]); // Dependency array includes `id`, so it fetches again if `id` changes

  // Handle delete request
  const handleDelete = () => {
    axios
      .delete(`https://infinion-test-int-test.azurewebsites.net/api/Campaign/${id}`)
      .then(() => {
        console.log("Campaign deleted successfully.");
        navigate("/campaign_data"); // Redirect to campaign list after deletion
      })
      .catch((err) => {
        console.error("Error deleting campaign:", err);
      });
  };

  // Render the component
  return (
    <section>
      <Link to="/campaign_data">Back</Link>

      {viewData ? (
        <div>
          <h2>Campaign Details</h2>
          <p>
            <strong>Campaign Name:</strong> {viewData.campaignName}
          </p>
          <p>
            <strong>Description:</strong> {viewData.campaignDescription}
          </p>
          <p>
            <strong>Start Date:</strong> {new Date(viewData.startDate).toLocaleDateString()}
          </p>
          <p>
            <strong>End Date:</strong> {new Date(viewData.endDate).toLocaleDateString()}
          </p>
          <p>
            <strong>Digest Campaign:</strong> {viewData.digestCampaign ? "Yes" : "No"}
          </p>
          <p>
            <strong>Linked Keywords:</strong> {viewData.linkedKeywords?.join(", ")}
          </p>
          <p>
            <strong>Daily Digest:</strong> {viewData.dailyDigest}
          </p>
        </div>
      ) : (
        <p>Loading campaign data...</p>
      )}
      
      <div>
        <Link to={`/campaign_edit/${viewData?.id}`}>Edit Information</Link>
        <button onClick={handleDelete}>Stop Campaign</button>
      </div>
    </section>
  );
};

export default CampaignInformation;
