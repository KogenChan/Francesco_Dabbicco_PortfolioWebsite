import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { LocaleProvider } from './context/LocaleContext.jsx';
import "./i18n/index.js";

createRoot(document.getElementById('root')).render(
   <>
      <LocaleProvider>
         <App />
      </LocaleProvider>
   </>
);