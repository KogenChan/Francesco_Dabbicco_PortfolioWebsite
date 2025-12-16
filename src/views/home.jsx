import { useState, useEffect } from 'react';
import Carousel from "../components/Carousel";
import ProjectSection from "../components/ProjectSection.jsx";
import useFetchData from "../hooks/useFetchData.min.js";
import useProjectSection from "../hooks/useProjectSection.min.js";
import RichText from "../components/RichText.jsx";
import { Link } from "react-router";
import routes from "../routing/routes.min";

export default function Home() {
   const PAYLOAD_API = import.meta.env.VITE_PAYLOAD_API_URL;
   const [isLandscape, setIsLandscape] = useState(window.innerWidth > window.innerHeight);

   useEffect(() => {
      const handleOrientationChange = () => {
         setIsLandscape(window.innerWidth > window.innerHeight);
      };

      window.addEventListener('resize', handleOrientationChange);
      window.addEventListener('orientationchange', handleOrientationChange);

      return () => {
         window.removeEventListener('resize', handleOrientationChange);
         window.removeEventListener('orientationchange', handleOrientationChange);
      };
   }, []);

   const { data: heroData, error: heroError } = useFetchData(
      `${PAYLOAD_API}/api/homepage-hero?limit=1`
   );

   const { data: carouselData, error: carouselError } = useFetchData(
      `${PAYLOAD_API}/api/carousel-item?sort=order&depth=1`
   );

   const { project, error: projectError } = useProjectSection('homepage');

   const hero = heroData?.docs?.[0];
   const carouselItems = carouselData?.docs || [];

   const transformedCarouselItems = carouselItems.map(item => ({
      id: item.id,
      image: item.image,
      alt: typeof item.image === 'object' ? item.image?.alt : `Carousel image ${item.order}`
   }));

   if (heroError) return <p className="text-red-500">Hero Error: {heroError}</p>;
   if (carouselError) return <p className="text-red-500">Carousel Error: {carouselError}</p>;
   if (projectError) return <p className="text-red-500">Project Error: {projectError}</p>;

   // In landscape on mobile/tablet, behave like lg breakpoint
   const isEffectiveLg = (isLandscape && window.innerWidth < 1024) || window.innerWidth >= 1024;

   return (
      <>
         <main className="h-screen bg-primary">
            {hero && (
               <div className={`h-screen container mx-auto flex flex-col items-stretch lg:py-16 ${isEffectiveLg ? 'grid grid-cols-2' : ''
                  }`}>
                  <figure className={`flex justify-center lg:justify-end overflow-hidden grow lg:h-auto ${isEffectiveLg ? 'order-2 justify-end' : ''
                     }`}>
                     <img
                        src={typeof hero.image === 'object' ? hero.image?.url : hero.image}
                        alt={typeof hero.image === 'object' ? hero.image?.alt : "Hero Image"}
                        className={`w-full object-cover lg:w-auto lg:h-auto lg:object-contain lg:pt-4 ${isEffectiveLg ? 'w-auto h-auto object-contain pt-4' : 'pt-16'
                           }`}
                     />
                  </figure>

                  <div className={`flex flex-col justify-end lg:justify-center px-0 pt-6 lg:pt-0 pb-10 lg:pb-6 ${isEffectiveLg ? 'order-1 justify-center pt-0 pb-6' : ''
                     }`}>
                     <h1 className="text-4xl pb-5 lg:pb-6">{hero.title}</h1>
                     <div className="text-base lg:text-lg">
                        <RichText content={hero.text} />
                     </div>
                  </div>
               </div>
            )}
         </main>

         <section className="container mx-auto pb-8 lg:pb-14 overflow-x-hidden">
            <h2 className="text-4xl pb-6 pt-4">Opere recenti</h2>
            {transformedCarouselItems.length > 0 ? (
               <Carousel items={transformedCarouselItems} />
            ) : (
               <p>No carousel items found.</p>
            )}
         </section>

         {project && (
            <Link to={routes.installations}>
               <ProjectSection
                  project={project}
                  className="lg:mb-0 lg:pb-0"
                  textClassName='ps-0 lg:ps-8'
               />
            </Link>
         )}
      </>
   );
}