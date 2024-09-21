import React, { useState } from "react";
// import "./Overview.scss";
// import { HiMiniArrowUpTray } from "react-icons/hi2";
// import { PiCalendarDots } from "react-icons/pi";
// import { RiArrowDropDownLine } from "react-icons/ri";
// import CampaignFeedback from "../../component/campaign-feedback/CampaignFeedback";

const Overviews = () => {
  // State to store the input string and the resulting array of strings
  const [input, setInput] = useState('');
  const [outputArray, setOutputArray] = useState([]);

  // Event handler to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Split the input string into an array of words (by spaces or commas)
    const wordsArray = input.split(/[ ,]+/); // Split by spaces and commas
    setOutputArray(wordsArray); // Update state with the resulting array
  };

  return (
    <div>
      {/* Form to capture input */}
      <form onSubmit={handleSubmit}>
        <label>Enter words (separated by spaces or commas):</label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)} // Update input state
          placeholder="E.g. apple, banana orange"
        />
        <button type="submit">Submit</button>
      </form>

      {/* Output the array of words */}
      <div style={{ marginTop: '20px' }}>
        <h3>Output:</h3>
        <ul>
          {outputArray.map((word, index) => (
            <li key={index}>{word}</li> // Display each word in a list item
          ))}
        </ul>
      </div>
    </div>
 
    // <section className="overview-cover">
    //   <div className="overview-main">
    //     <div className="overview-txt">Overview</div>
    //     <div className="overview-data">
    //       <div className="date-container">
    //         <div className="calender">
    //           <PiCalendarDots className="cal-icon" />
    //           <div className="cal-txt">Date Range</div>
    //         </div>
    //         <div className="realtime-date">
    //           <p>Nov 1, 2022 - Nov 7, 2022.</p>
    //           <RiArrowDropDownLine className="arrow-icon" />
    //         </div>
    //       </div>
    //       <div className="export">
    //         <HiMiniArrowUpTray className="export-icon" />
    //         <p>Export</p>
    //       </div>
    //     </div>
    //   </div>

    //   <CampaignFeedback />
    // </section>
  );
};

export default Overviews;





    