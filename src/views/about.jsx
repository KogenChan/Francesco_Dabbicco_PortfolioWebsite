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
            <section className="container mx-auto pt-18 pb-16 lg:pb-24 lg:pt-30">
               <div className="mx-auto">
                  <div className="inline">
                     <h3 className="pb-3 text-lg">Artist's Statement</h3>
                     <RichText content={about.statement} className="text-sm"/>
                  </div>
               </div>
            </section>
         )}

         {/* BIO AND HISTORY SECTION - COMBINED WITH COLUMN WRAP */}
         {(about?.bio || about?.exhibits || about?.publications || about?.illustrations) && (
            <section className="container mx-auto pb-16 lg:pb-24">
               <div className="h-full columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-8 lg:gap-12 md:text-sm">
                  {about?.bio && (
                     <div className="inline">
                        <h3 className="pb-3 text-base">Francesco Dabbicco</h3>
                        <RichText content={about.bio} className="text-xs"/>
                     </div>
                  )}
                  
                  {about?.exhibits && (
                     <div className="inline">
                        <br />
                        <h3 className="pb-3 text-base">Mostre</h3>
                        <RichText content={about.exhibits} className="text-xs"/>
                     </div>
                  )}

                  {about?.publications && (
                     <div className="inline">
                        <br />
                        <h3 className="pb-3 text-base">Premi/Pubblicazioni</h3>
                        <RichText content={about.publications} className="text-xs"/>
                     </div>
                  )}

                  {about?.illustrations && (
                     <div className="inline">
                        <br />
                        <h3 className="pb-3 text-base">Illustrazioni per libri</h3>
                        <RichText content={about.illustrations} className="text-xs"/>
                     </div>
                  )}
               </div>
            </section>
         )}
      </>
   );
};