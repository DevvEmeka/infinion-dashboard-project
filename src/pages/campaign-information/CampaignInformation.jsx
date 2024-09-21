import React, { useEffect, useState } from "react";
import './CampaignInformation.scss'

const CampaignInformation = () => {

    const [fetchedData, setFetchedData] = useState(null); // To store fetched campaign data

    // Fetch campaign data by ID (GET /api/Campaign/{id})
  useEffect(() => {
    if (campaignId) {
      axios
        .get(`https://infinion-test-int-test.azurewebsites.net/api/Campaign/${campaignId}`)
        .then((res) => {
          setFetchedData(res.data); // Store the fetched campaign data
          console.log('Fetched Data:', res.data); // Log the fetched data
        })
        .catch((err) => {
          console.error('Error fetching campaign:', err);
        });
    }
  }, [campaignId]); // Trigger when campaignId is set

  return (
    <section>
      {/* Display the fetched campaign data */}
      {fetchedData && (
        <div>
          <h2>Fetched Campaign Data</h2>
          <p>
            <strong>Campaign Name:</strong> {fetchedData.campaignName}
          </p>
          <p>
            <strong>Campaign Description:</strong>
            {fetchedData.campaignDescription}
          </p>
          <p>
            <strong>Start Date:</strong>
            {new Date(fetchedData.startDate).toLocaleDateString()}
          </p>
          <p>
            <strong>End Date:</strong>
            {new Date(fetchedData.endDate).toLocaleDateString()}
          </p>
          <p>
            <strong>Digest Campaign:</strong>
            {fetchedData.digestCampaign ? "Yes" : "No"}
          </p>
          <p>
            <strong>Linked Keywords:</strong>
            {fetchedData.linkedKeywords.join(", ")}
          </p>
          <p>
            <strong>Daily Digest:</strong> {fetchedData.dailyDigest}
          </p>
        </div>
      )}
    </section>
  );
};

export default CampaignInformation;
