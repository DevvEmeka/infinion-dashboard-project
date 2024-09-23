import React, { useEffect, useState } from "react";
import "./CampaignEdit.scss";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import CreatableSelect from "react-select/creatable";

const CampaignEdit = () => {
  const { id } = useParams(); // Get campaign ID from URL params
  const navigate = useNavigate();
  const [value, setValue] = useState([]); // Manage selected options for keywords
  const [inputValue, setInputValue] = useState(""); // Manage text input in CreatableSelect

  const [values, setValues] = useState({
    id: null,
    campaignName: "",
    campaignDescription: "",
    startDate: "",
    endDate: "",
    receiveDigest: false,
    linkedKeywords: [],
    dailyDigest: "",
  });

  // Fetch campaign data on mount
  useEffect(() => {
    axios
      .get(
        `https://infinion-test-int-test.azurewebsites.net/api/Campaign/${id}`
      )
      .then((res) => {
        const campaign = res.data;
        setValues({
          id: parseInt(id), // Ensure ID is an integer
          campaignName: campaign.campaignName || "",
          campaignDescription: campaign.campaignDescription,
          startDate: campaign.startDate || "", // Populate with existing data
          endDate: campaign.endDate || "",
          receiveDigest: campaign.digestCampaign || false,
          linkedKeywords: campaign.linkedKeywords || [],
          dailyDigest: campaign.dailyDigest || "",
        });

        // Map linked keywords to format needed for CreatableSelect
        setValue(
          campaign.linkedKeywords?.map((kw) => ({ label: kw, value: kw })) || []
        );
      })
      .catch((err) => {
        console.error("Error fetching campaign:", err);
      });
  }, [id]);

  // Handle input change for text fields
  const handleChangeTxt = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // Handle date change
  const handleChangeDate = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // Handle checkbox toggle
  const handleChange = (e) => {
    const { name, checked } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: checked,
    }));
  };

  // Handle select change for dailyDigest
  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // Handle form submission for updating the campaign
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

    const updatedCampaign = {
      ...values,
      linkedKeywords: linkedKeywordsArray, // Update with array of strings
      startDate: formattedStartDate, // ISO 8601 format
      endDate: formattedEndDate, // ISO 8601 format
    };

    console.log("Updated Campaign Data:", updatedCampaign);

    axios
      .put(
        `https://infinion-test-int-test.azurewebsites.net/api/Campaign/${id}`,
        updatedCampaign
      )
      .then((res) => {
        console.log("Campaign updated successfully:", res.data);
        navigate("/campaign_data"); // Redirect to campaign list after update
      })
      .catch((err) => {
        console.error("Error updating campaign:", err);
      });
  };

  // Handle key down events in CreatableSelect (for Enter and Tab)
  const handleKeyDown = (event) => {
    if (!inputValue) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        setValue((prev) => [...prev, { label: inputValue, value: inputValue }]);
        setInputValue("");
        event.preventDefault();
        break;
      default:
        break;
    }
  };

  // Render the component
  return (
    <div>
      <form className="form-cover" onSubmit={handleSubmit}>
        <div className="form-group-1">
          <label htmlFor="campaignName">Campaign Name</label>
          <input
            type="text"
            name="campaignName"
            placeholder="e.g. The Future is Now"
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

        {/* REACT SELECT ====== */}
        <div className="form-group-6">
          <p className="keyword-txt">Linked Keywords</p>
          <CreatableSelect
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

        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default CampaignEdit;
