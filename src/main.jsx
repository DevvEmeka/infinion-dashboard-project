import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
// import CampaignInformation from './pages/campaign-information/CampaignInformation.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/* <CampaignInformation /> */}
  </StrictMode>,
)
