import React from "react";
import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Overviews from "./pages/overview/Overviews";
import NewCampaign from "./pages/newcampaign/NewCampaign";
import CampaignData from "./pages/campaign-data/CampaignData";
import CampaignInfo from "./pages/campain-info/CampaignInfo";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Overviews />} />
          <Route path="/new_campaign" element={<NewCampaign />} />
          <Route path="/campaign_data" element={<CampaignData />} />
          <Route path="/campaign_info" element={<CampaignInfo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
