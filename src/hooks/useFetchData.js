import { useEffect, useState } from "react";
import { useGlobalLoading } from "../context/LoadingContext";

export default function useFetchData(url) {
   const [data, setData] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   const { startLoading, stopLoading } = useGlobalLoading();

   useEffect(() => {
      let mounted = true;

      async function fetchData() {
         setLoading(true);
         setError(null);
         startLoading();

         try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);

            const json = await response.json();
            if (mounted) setData(json);
         } catch (err) {
            if (mounted) setError(err.message);
         } finally {
            if (mounted) setLoading(false);
            stopLoading();
         }
      }

      fetchData();
      return () => (mounted = false);
   }, [url, startLoading, stopLoading]);

   return { data, loading, error };
};