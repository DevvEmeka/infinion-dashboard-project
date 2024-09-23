import React from "react";
import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Overviews from "./pages/overview/Overviews";
import NewCampaign from "./pages/newcampaign/NewCampaign";
import CampaignData from "./pages/campaign-data/CampaignData";
import CampaignInformation from "./pages/campaign-information/CampaignInformation";
import Campaign from "./pages/campaign/Campaign";
import CampaignEdit from "./components/campaign-edit/CampaignEdit";

const App = () => {
  return (
    <BrowserRouter>
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Overviews />} />
      <Route path="new_campaign" element={<NewCampaign />} />
      <Route path="campaign" element={<Campaign />} />
      <Route path="campaign_data" element={<CampaignData />} />
      <Route path="campaign_information/:id" element={<CampaignInformation />} />
      <Route path="campaign_edit/:id" element={<CampaignEdit />} />
    </Route>
  </Routes>
</BrowserRouter>
  );
};

export default App;
