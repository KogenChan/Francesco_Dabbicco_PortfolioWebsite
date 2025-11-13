import { useEffect, useState } from "react";

export default function useFetchData(url) {
   const [data, setData] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
      async function fetchData() {
         try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);
            const data = await response.json();
            setData(data);
         } catch (err) {
            setError(err.message);
         } finally {
            setLoading(false);
         }
      }

      fetchData();
   }, [url]);

   return { data, loading, error };
}
