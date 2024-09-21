import React from 'react';
import userDataFetcher from '../../components/user-data-fetcher/UserDataFetcher';
import Campaign from '../campaign/Campaign';

const CampaignData = () => {
  const { loading, pages, totalPages, currentPage, setCurrentPage } = userDataFetcher(); // Hook for fetching data
  const itemsPerPage = 10; // Display 10 items per page
  const offset = currentPage * itemsPerPage; // Calculate offset for the current page

  return (
    <div>
      <div>
        {/* Table Display */}
        <table>
          <thead>
            <tr>
              <th>S/N</th>
              <th>Campaign Name</th>
              <th>Start Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Display loading state */}
            {loading ? (
              <tr>
                <td colSpan="5">Loading...</td>
              </tr>
            ) : (
              // Limit to displaying only 10 items using the slice method based on current page
              pages.slice(offset, offset + itemsPerPage).map((page, index) => (
                <tr key={page.id}>
                  <td>{offset + index + 1}</td> {/* Adjust serial number with offset */}
                  <td>{page.campaignName}</td>
                  <td>{new Date(page.startDate).toLocaleDateString()}</td>
                  <td>{page.status}</td>
                  <td>
                    <button>View</button>
                    <button>Edit</button>
                    <button>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pass pagination controls */}
      <Campaign
        totalPages={Math.ceil(pages.length / itemsPerPage)} // Total pages based on API response
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default CampaignData;
