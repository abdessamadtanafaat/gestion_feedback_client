import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import global_english from './translation/english/global.json';
import global_french from './translation/french/global.json';
import global_arabic from './translation/arabic/global.json';
import global_portuguese from './translation/Portuguese/global.json';
import global_Spanish from './translation/Spanish/global.json';

import i18next from 'i18next'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import { ThemeProvider } from "@material-tailwind/react";
import { PrimeReactProvider } from 'primereact/api';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { AuthContextProvider } from './context/AuthContext.jsx'
import { BusinessContextProvider } from './context/BusinessContext.jsx'
import { CampaignFormContextProvider } from './context/CampaignFormContext.jsx'
import { UserContextProvider } from './context/UserContext.jsx'
import { CampaignClientContextProvider } from './context/CampaignClientContext.jsx'
// import './translation/i18n.jsx';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector'
i18n.use(LanguageDetector)
.use(initReactI18next)
.init({
  interpolation:{escapeValue: false},
  lng:"english",
  resources:{
    english:{
      global:global_english
    },
    french:{
      global:global_french
    },
    portuguese:{
      global:global_portuguese
    },
    arabic:{
      global:global_arabic
    },
    Spanish:{
      global:global_Spanish
    },
    
  }

})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <UserContextProvider>
      <BusinessContextProvider>
      <CampaignFormContextProvider>
      <CampaignClientContextProvider>
      <I18nextProvider i18n={i18next}>
      <ThemeProvider>
      <PrimeReactProvider>
        <App />
      </PrimeReactProvider>
      </ThemeProvider>
      </I18nextProvider>
      </CampaignClientContextProvider>
      </CampaignFormContextProvider>
      </BusinessContextProvider>
      </UserContextProvider>
    </AuthContextProvider>

  </React.StrictMode>,
)
