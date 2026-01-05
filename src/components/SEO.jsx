import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://francescodabbiccoart.com";

export default function SEO() {
   const { pathname } = useLocation();

   useEffect(() => {
      let link = document.querySelector("link[rel='canonical']");
      if (!link) {
         link = document.createElement("link");
         link.setAttribute("rel", "canonical");
         document.head.appendChild(link);
      }

      const canonical = `${SITE_URL}${window.location.pathname}`;
      link.setAttribute("href", canonical);
   }, [pathname]);

   return null;
}