import useFetchData from "./useFetchData.min.js";

export default function useMediaItem(filename) {
   const PAYLOAD_API = import.meta.env.VITE_PAYLOAD_API_URL;

   const actualFilename = filename ? filename.replace(/_/g, ' ') + '.webp' : null;
   
   const { data, loading, error } = useFetchData(
      actualFilename ? `${PAYLOAD_API}/api/media?where[filename][equals]=${encodeURIComponent(actualFilename)}&depth=1` : null
   );

   return { media: data?.docs?.[0], loading, error };
};