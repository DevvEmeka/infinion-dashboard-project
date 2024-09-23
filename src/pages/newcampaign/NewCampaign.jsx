import React, { useState, useEffect } from "react";
import "./NewCampaign.scss";
import axios from "axios";

// REACT SELECT======
import CreatableSelect from "react-select/creatable";
import { useNavigate } from "react-router-dom";
import { GiCheckMark } from "react-icons/gi";

const components = {
  DropdownIndicator: null, // Remove the dropdown indicator for a cleaner input
};

// Helper function to create new options
const createOption = (label) => ({
  label,
  value: label,
});
// REACT SELECT======

const NewCampaigns = () => {
  const [inputValue, setInputValue] = useState(""); // Manage input value
  const [value, setValue] = useState([]); // Manage selected options
  const [isModalVisible, setModalVisible] = useState(false); // Modal state
  const navigate = useNavigate(); // React Router hook for navigation

  const handleKeyDown = (event) => {
    if (!inputValue) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        setValue((prev) => [...prev, createOption(inputValue)]); // Add new option
        setInputValue(""); // Clear input field
        event.preventDefault();
        break;
      default:
        break;
    }
  };

  const [values, setValues] = useState({
    campaignName: "",
    campaignDescription: "",
    startDate: "",
    endDate: "",
    receiveDigest: false,
    linkedKeywords: [],
    dailyDigest: "",
  });

  const handleChangeTxt = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleChangeDate = (e) => {
    const { name, value } = e.target;
    const formattedDate = new Date(value).toISOString();
    setValues({
      ...values,
      [name]: formattedDate,
    });
  };

  const handleChange = (e) => {
    const { name, type, checked } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: type === "checkbox" ? checked : prevValues[name],
    }));
  };

  const handleSelectChange = (e) => {
    setValues({
      ...values,
      dailyDigest: e.target.value,
    });
  };

  // Update linkedKeywords in values whenever selected options change
  useEffect(() => {
    const linkedKeywordsArray = value.map((option) => option.label);
    setValues((prevValues) => ({
      ...prevValues,
      linkedKeywords: linkedKeywordsArray,
    }));
  }, [value]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert CreatableSelect options to an array of strings for linkedKeywords
    const linkedKeywordsArray = value.map((option) => option.value);

    // Format the start and end dates in ISO 8601 format
    const formattedStartDate = values.startDate
      ? new Date(values.startDate).toISOString()
      : null;
    const formattedEndDate = values.endDate
      ? new Date(values.endDate).toISOString()
      : null;

    // Prepare the data to be posted
    const dataToPost = {
      ...values,
      linkedKeywords: linkedKeywordsArray,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    };

    axios
      .post(
        "https://infinion-test-int-test.azurewebsites.net/api/Campaign",
        dataToPost
      )
      .then((res) => {
        console.log(res);
        setModalVisible(true); // Show the modal after successful creation
      })
      .catch((err) => console.log(err));
  };

  const handleModalClose = () => {
    setModalVisible(false); // Hide modal
    navigate("/campaign_data"); // Navigate to home page after button click
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <section className="campaign-form">
      <h3 className="form-header">Create New Campaign</h3>
      <div className="form-container">
        <form className="form-cover" onSubmit={handleSubmit}>
          <div className="form-group-1">
            <label htmlFor="campaignName">Campaign Name</label>
            <input
              type="text"
              name="campaignName"
              placeholder="e.g. The Future is now"
              value={values.campaignName}
              onChange={handleChangeTxt}
            />
          </div>

          <div className="form-group-2">
            <label htmlFor="campaignDescription">Campaign Description</label>
            <input
              type="text"
              name="campaignDescription"
              placeholder="Please add a description to your campaign"
              value={values.campaignDescription}
              onChange={handleChangeTxt}
            />
          </div>

          <div className="date-div">
            <div className="form-group-3">
              <label htmlFor="startDate">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={values.startDate ? values.startDate.slice(0, 10) : ""}
                onChange={handleChangeDate}
                placeholder="dd/mm/yyyy"
              />
            </div>

            <div className="form-group-4">
              <label htmlFor="endDate">End Date</label>
              <input
                type="date"
                name="endDate"
                value={values.endDate ? values.endDate.slice(0, 10) : ""}
                onChange={handleChangeDate}
                placeholder="dd/mm/yyyy"
              />
            </div>
          </div>

          <div className="form-group-5">
            <label htmlFor="receiveDigest">
              Want to receive daily digest about the campaign?
            </label>
            <label className="switch">
              <input
                type="checkbox"
                name="receiveDigest"
                checked={values.receiveDigest}
                onChange={handleChange}
              />
              <span className="slider"></span>
            </label>
          </div>

          <div className="form-group-6">
            <p className="keyword-txt">Linked Keywords</p>
            <CreatableSelect
              components={components}
              inputValue={inputValue}
              isClearable
              isMulti
              menuIsOpen={false}
              onChange={(newValue) => setValue(newValue)}
              onInputChange={(newValue) => setInputValue(newValue)}
              onKeyDown={handleKeyDown}
              placeholder="To add keywords, type your keyword and press enter"
              value={value}
            />
          </div>

          <div className="form-group-7">
            <label htmlFor="dailyDigest">
              Kindly select how often you want to receive daily digest
            </label>
            <select
              name="dailyDigest"
              value={values.dailyDigest}
              onChange={handleSelectChange}
              required
            >
              <option value="" disabled>
                Select
              </option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>

          <div className="form-btn">
            <button onClick={handleCancel} className="btn-submit">
              Cancel
            </button>
            <button className="btn-col" type="submit">
              Create Campaign
            </button>
          </div>
        </form>
      </div>

      {isModalVisible && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-icon">
              <span>
                <GiCheckMark />
              </span>
            </div>
            <p>Campaign Successfully Created!</p>
            <button onClick={handleModalClose} className="modal-button">
              Go Back to campaign list
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default NewCampaigns;
