import useFetchData from "./useFetchData.min.js";

export default function useGallery(slug) {
   const PAYLOAD_API = import.meta.env.VITE_PAYLOAD_API_URL;
   
   // Only build URL if slug is provided
   const url = slug
      ? `${PAYLOAD_API}/api/gallery?where[slug][equals]=${slug}&limit=1&depth=3`
      : null;

   const { data, loading, error } = useFetchData(url);

   const gallery = data?.docs?.[0];

   return { gallery, loading, error };
}