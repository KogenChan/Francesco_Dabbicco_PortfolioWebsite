import useFetchData from "./useFetchData.min.js";

export default function useProjectSection(slug) {
   const PAYLOAD_API = import.meta.env.VITE_PAYLOAD_API_URL;

   const { data, loading, error } = useFetchData(
      `${PAYLOAD_API}/api/project-section?where[slug][equals]=${slug}&limit=1&depth=2`
   );

   const project = data?.docs?.[0];

   return { project, loading, error };
};