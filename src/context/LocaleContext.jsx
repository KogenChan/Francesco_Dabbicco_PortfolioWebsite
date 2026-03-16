import { createContext, useContext, useState } from "react";
import i18n from "../i18n/index.js";

const LocaleContext = createContext({
   locale: "it",
   setLocale: () => {},
});

export const LocaleProvider = ({ children }) => {
   const [locale, setLocale] = useState(
      localStorage.getItem("locale") || "it"
   );

   const handleSetLocale = (l) => {
      setLocale(l);
      localStorage.setItem("locale", l);
      i18n.changeLanguage(l);
   };

   return (
      <LocaleContext.Provider value={{ locale, setLocale: handleSetLocale }}>
         {children}
      </LocaleContext.Provider>
   );
};

export const useLocale = () => useContext(LocaleContext);