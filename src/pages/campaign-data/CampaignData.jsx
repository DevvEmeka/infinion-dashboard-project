import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // For redirection
import userDataFetcher from "../../components/user-data-fetcher/UserDataFetcher";
import Campaign from "../campaign/Campaign";
import "./CampaignData.scss";
import { GoEye } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiSolidEdit } from "react-icons/bi";
import axios from "axios";

// Delete Confirmation Modal Component
const DeleteModal = ({ show, campaignName, onDelete, onCancel }) => {
  if (!show) return null; // Don't render if not visible

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-header">Stop Campaign</h2>
        <p className="modal-text">
          Are you sure you want to delete the {campaignName} campaign?
          <br />
          This action cannot be undone.
        </p>
        <div className="modal-buttons">
          <button className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
          <button className="delete-btn" onClick={onDelete}>
            Delete Campaign
          </button>
        </div>
      </div>
    </div>
  );
};

// Success Modal Component
const SuccessModal = ({ show, campaignName, onGoBack }) => {
  if (!show) return null; // Don't render if not visible

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-header">Campaign Deleted</h2>
        <p className="modal-text">
          The {campaignName} campaign has been deleted.
        </p>
        <div className="modal-buttons">
          <button className="go-back-btn" onClick={onGoBack}>
            Go Back to campaign list
          </button>
        </div>
      </div>
    </div>
  );
};

const CampaignData = () => {
  const [data, setData] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [campaignToDelete, setCampaignToDelete] = useState(null);
  const navigate = useNavigate(); // For navigating between routes

  // Fetch campaign data on mount
  useEffect(() => {
    axios
      .get("https://infinion-test-int-test.azurewebsites.net/api/Campaign")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  // Show delete confirmation modal
  const openDeleteModal = (campaign) => {
    setCampaignToDelete(campaign);
    setShowDeleteModal(true);
  };

  // Close the delete modal
  const closeModal = () => {
    setShowDeleteModal(false);
    setCampaignToDelete(null);
  };

  // Handle campaign deletion
  const handleDelete = () => {
    const { id } = campaignToDelete; // Get the ID of the selected campaign
    axios
      .delete(`https://infinion-test-int-test.azurewebsites.net/api/Campaign/${id}`)
      .then((res) => {
        // Filter out the deleted campaign from the data state
        setData((prevData) => prevData.filter((campaign) => campaign.id !== id));
        closeModal(); // Close the delete confirmation modal
        setShowSuccessModal(true); // Show the success modal
        console.log("Campaign deleted successfully:", res);
      })
      .catch((err) => console.log("Error deleting campaign:", err));
  };

  // Handle redirect to campaign list
  const handleGoBack = () => {
    setShowSuccessModal(false);
    navigate("/campaign_data"); // Redirect to the campaign list route
  };

  const { loading, pages, totalPages, currentPage, setCurrentPage } = userDataFetcher(); // Hook for pagination data
  const itemsPerPage = 10; // Display 10 items per page
  const offset = currentPage * itemsPerPage; // Calculate offset for the current page

  return (
    <div className="cam-data-cover">
      <div>
        <table>
          <thead>
            <tr className="header-tb">
              <th>S/N</th>
              <th>Campaign Name</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6">Loading...</td>
              </tr>
            ) : (
              pages.slice(offset, offset + itemsPerPage).map((page, index) => (
                <tr key={page.id}>
                  <td>{offset + index + 1}</td>
                  <td>{page.campaignName}</td>
                  <td>{new Date(page.startDate).toLocaleDateString()}</td>
                  <td>{page.campaignStatus}</td>
                  <td>
                    <Link to={`/campaign_information/${page.id}`}>
                      <GoEye />
                    </Link>
                    <Link to={`/campaign_edit/${page.id}`}>
                      <BiSolidEdit />
                    </Link>
                    <button onClick={() => openDeleteModal(page)}>
                      <RiDeleteBin6Line />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <Campaign
        totalPages={Math.ceil(pages.length / itemsPerPage)} // Total pages based on API response
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      {/* Delete Confirmation Modal */}
      <DeleteModal
        show={showDeleteModal}
        campaignName={campaignToDelete?.campaignName}
        onDelete={handleDelete}
        onCancel={closeModal}
      />
      {/* Success Modal */}
      <SuccessModal
        show={showSuccessModal}
        campaignName={campaignToDelete?.campaignName}
        onGoBack={handleGoBack}
      />
    </div>
  );
};

export default CampaignData;
