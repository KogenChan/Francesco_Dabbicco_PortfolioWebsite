import useFetchData from "../hooks/useFetchData.min.js";
import RichText from "../components/RichText.jsx";

export default function About() {
   const PAYLOAD_API = import.meta.env.VITE_PAYLOAD_API_URL;

   const { data: aboutData, error } = useFetchData(
      `${PAYLOAD_API}/api/about?limit=1`
   );

   const about = aboutData?.docs?.[0];

   if (error) return <p className="text-red-500">Error: {error}</p>;

   return (
      <>
         {/* STATEMENT SECTION */}
         {about?.statement && (
            <section className="container mx-auto pt-24 pb-16 lg:pb-24 lg:pt-30">
               <div className="mx-auto">
                  <div className="text-lg leading-relaxed">
                     <RichText content={about.statement} />
                  </div>
               </div>
            </section>
         )}

         {/* BIO AND HISTORY SECTION - COMBINED WITH COLUMN WRAP */}
         {(about?.bio || about?.history) && (
            <section className="container mx-auto pb-16 lg:pb-24">
               <div className="h-full columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-8 lg:gap-12 md:text-sm">
                  {about?.bio && (
                     <div className="inline">
                        <h3 className="pb-2 text-base">Francesco Dabbicco</h3>
                        <RichText content={about.bio} />
                     </div>
                  )}
                  
                  {about?.history && (
                     <div className="inline">
                        <br />
                        <h3 className="pb-2 text-base">Selected publications and exhibitions</h3>
                        <RichText content={about.history} />
                     </div>
                  )}
               </div>
            </section>
         )}
      </>
   );
};