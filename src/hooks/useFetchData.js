import { useEffect, useState } from "react";
import { useGlobalLoading } from "../context/LoadingContext";
import { useLocale } from "../context/LocaleContext";

export default function useFetchData(url, options = {}) {
   const { manageLoading = true } = options;
   const [data, setData] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const { startLoading, stopLoading } = useGlobalLoading();
   const { locale } = useLocale();

   useEffect(() => {
      if (!url) {
         setLoading(false);
         return;
      }

      let active = true;

      async function fetchData() {
         setLoading(true);
         setError(null);

         if (manageLoading) startLoading();

         try {
            const localeUrl = `${url}${url.includes("?") ? "&" : "?"}locale=${locale}`;
            const response = await fetch(localeUrl);
            if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);
            const json = await response.json();
            if (active) setData(json);
         } catch (err) {
            if (active) setError(err.message);
         } finally {
            if (active) setLoading(false);
            if (manageLoading) stopLoading();
         }
      }

      fetchData();

      return () => { active = false; };
   }, [url, manageLoading, startLoading, stopLoading, locale]); // 👈 locale added

   return { data, loading, error };
}