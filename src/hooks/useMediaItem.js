import useFetchData from "./useFetchData.min.js";

export default function useMediaItem(id) {
   const PAYLOAD_API = import.meta.env.VITE_PAYLOAD_API_URL;

   const { data, loading, error } = useFetchData(
      id ? `${PAYLOAD_API}/media/${id}?depth=1` : null
   );

   return { media: data, loading, error };
};