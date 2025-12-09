import useFetchData from "./useFetchData.min.js";

export default function useGallery(slug) {
   const PAYLOAD_API = import.meta.env.VITE_PAYLOAD_API_URL;
   
   const { data, loading, error } = useFetchData(
      `${PAYLOAD_API}/api/gallery?where[slug][equals]=${slug}&limit=1&depth=1`
   );

   const gallery = data?.docs?.[0];

   return { gallery, loading, error };
}