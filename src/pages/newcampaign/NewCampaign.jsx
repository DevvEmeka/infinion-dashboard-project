import React, { useState, KeyboardEventHandler, useEffect } from "react";
import "./NewCampaign.scss";
import axios from "axios";

// REACT SELECT======
import CreatableSelect from "react-select/creatable";
import { useNavigate } from "react-router-dom";
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
  // REACT SELECT======
  const [inputValue, setInputValue] = useState(""); // Manage input value
  const [value, setValue] = useState([]); // Manage selected options
  console.log(value);

  // Handle keyboard events (Enter/Tab) to add new options
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
  // REACT SELECT======

  const [values, setValues] = useState({
    campaignName: "",
    campaignDescription: "",
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
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

  // HANDLE THE REACT SELECT
  // Update linkedKeywords in values whenever selectedOptions changes
  useEffect(() => {
    const linkedKeywordsArray = value.map((option) => option.label);
    setValues((prevValues) => ({
      ...prevValues,
      linkedKeywords: linkedKeywordsArray, // Update with array of strings
    }));
  }, [value]);
  // HANDLE THE REACT SELECT
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://infinion-test-int-test.azurewebsites.net/api/Campaign",
        values
      )
      .then((res) => {
        console.log(res);
        // Navigate to a new page after successful submission
        navigate("/");
        setValues({
          startDate: new Date().toISOString(),
          endDate: new Date().toISOString(),
          linkedKeywords: [],
          dailyDigest: "",
          campaignName: "",
          campaignDescription: "",
          receiveDigest: false,
        });
      })
      .catch((err) => console.log(err));
  };

  const navigate = useNavigate(); // React Router hook for navigation

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
            <p>Linked Keywords</p>
            <CreatableSelect
              components={components} // Disable dropdown indicator
              inputValue={inputValue} // Controlled input value
              isClearable // Allow clearing all options
              isMulti // Enable multi-select
              menuIsOpen={false} // Prevent dropdown from opening
              onChange={(newValue) => setValue(newValue)} // Update selected options
              onInputChange={(newValue) => setInputValue(newValue)} // Update input value on typing
              onKeyDown={handleKeyDown} // Handle keypress events (Enter/Tab)
              placeholder="To add keywords, type your keyword and press enter"
              value={value} // Selected options displayed
            />
            <div>
              <h4>Selected Values:</h4>
              <ul>
                {value.map((option, index) => (
                  <li key={index}>{option.label}</li>
                ))}
              </ul>
            </div>
          </div>
          {/* REACT SELECT ====== */}

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
            <button className="btn-submit">Stop Campaign</button>
            <button className="btn-col" type="submit">Submit</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default NewCampaigns;
