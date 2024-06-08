/* eslint-disable no-unused-vars */
import  Login  from './components/Login/Login'
import Signup from './components/Signup/Signup'
import ResetPassword from './components/resetPassword/ResetPassword'
import Workspace from './components/workspace/Workspace'
import { BrowserRouter as Router, Route ,Routes, Navigate} from 'react-router-dom'
import CreateCampaignForm from './components/create-campaign/CreateCampaignForm'
import CreateBusinessForm from './components/create-business/CreateBusinessForm'
import QRCodes from './components/workspace/QrCodes'
import PrivateRoutes from './utils/PrivateRoutes'
import useAuthContext from './hooks/useAuthContext'
import NotFoundPage from "./components/Errors/NotFound"
import CustomersTable from './components/client-management/CustomersTable'
import EditProfile from './components/Profile/editProfile'
import Settings from './components/Profile/Settings'
import CampaignClientForm from './components/Campaign-client/CampaignClientForm'



import ChangePassword from './components/Profile/ChangePassword'
import PromoCode from './components/LoyalityPrograms/PromoCode/PromoCode';
import MisteryBox from './components/LoyalityPrograms/MisteryBox/MisteryBoxTable'
import MisteryBoxWinners from './components/LoyalityPrograms/MisteryBox/MisteryBoxWinners'
import ClientAmbassador from './components/LoyalityPrograms/ClientAmbassador/ClientAmbassador'
import Raffle from './components/LoyalityPrograms/Raffle/Raffle'
import PromoCodeList from './components/LoyalityPrograms/PromoCode/PromoCodeList'
import CampaignDetail from './components/Campaign-details/CampaignDetail'
import {ListOfBusiness } from './components/workspace/business'
import { BusinessDetail } from './components/workspace/BusinessDetail'
import AcoountVerified from './components/Signup/AccountVerified'
import ResetPasswordForm from './components/resetPassword/ResetPasswordForm'



function App({ Component, pageProps }) {


  const {user} = useAuthContext();
  

  return (
    <Router>
    
      <Routes>
        <Route exact path="/" element={user ? <Navigate to="/Workspace"/> :<Login/>}/>
        <Route exact path="/signup" element={<Signup/>}/>
        <Route exact path="/resetpassword" element={<ResetPassword/> }/>
        <Route  path="/reset-password-process" element={<ResetPasswordForm/> }/>

        <Route path="/auth" element={<AcoountVerified />} />

        <Route exact path="/campaign/:campaignId" element={<CampaignClientForm/> }/>        
        <Route exact path="/Workspace" element={user ? <Workspace/> : <Navigate to="/"/>}/>
        <Route exact path="/qr-codes" element={user ? <QRCodes/> : <Navigate to="/"/>}/>
        <Route exact path="/list-businesses" element={user ? <ListOfBusiness/> : <Navigate to="/"/>}/>
        <Route exact path="/business-detail/:businessId" element={user ? <BusinessDetail/> : <Navigate to="/"/>}/>
        <Route exact path="/campaign-detail/:campaignId" element={user ? <CampaignDetail/> : <Navigate to="/"/>}/>
        <Route exact path="/create-campaign" element={user ? <CreateCampaignForm/> : <Navigate to="/"/>}/>
        <Route exact path="/create-business" element={user ? <CreateBusinessForm/> : <Navigate to="/"/>}/>
        <Route exact path="/my-profile" element={user ?<EditProfile/> : <Navigate to="/"/>}/>
        <Route exact path="/settings" element={user ?<Settings/> : <Navigate to="/"/>}/>
        <Route exact path="/change-password" element={user ?<ChangePassword/> : <Navigate to="/"/>}/>
        <Route exact path="/client-management/:campaignId" element={user ?<CustomersTable {...pageProps}/> : <Navigate to="/"/>}/>
        <Route exact path="/mistery-box/:campaignId" element={user ?<MisteryBox {...pageProps}/> : <Navigate to="/"/>}/>
        <Route exact path="/mistery-box-winners/:campaignId" element={user ?<MisteryBoxWinners {...pageProps}/> : <Navigate to="/"/>}/>
        <Route exact path="/promo-code/:couponGroupId" element={user ?<PromoCode {...pageProps}/> : <Navigate to="/"/>}/>
        <Route exact path="/raffle" element={user ?<Raffle {...pageProps}/> : <Navigate to="/"/>}/>
        <Route exact path="/promo-codes-list/:campaignId" element={user ?<PromoCodeList {...pageProps}/> : <Navigate to="/"/>}/>
        <Route exact path="/client-ambassador" element={user ?<ClientAmbassador {...pageProps}/> : <Navigate to="/"/>}/>
       <Route exact path="*" element={user ?<NotFoundPage/> : <Navigate to="/"/>}/>
       
       
      </Routes>
      


    </Router>
  
    
    
  )
}

export default App
