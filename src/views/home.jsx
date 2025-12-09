import Carousel from "../components/Carousel";
import ProjectSection from "../components/ProjectSection.jsx";
import useFetchData from "../hooks/useFetchData.min.js";
import useProjectSection from "../hooks/useProjectSection.min.js";
import RichText from "../components/RichText.jsx";

export default function Home() {
   const PAYLOAD_API = import.meta.env.VITE_PAYLOAD_API_URL;

   const { data: heroData, error: heroError } = useFetchData(
      `${PAYLOAD_API}/api/homepage-hero?limit=1`
   );

   const { data: carouselData, error: carouselError } = useFetchData(
      `${PAYLOAD_API}/api/carousel-item?sort=order&depth=1`  // Add depth=1
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

   return (
      <>
         {hero && (
            <main className="h-screen bg-primary container mx-auto flex flex-col lg:grid lg:grid-cols-2 items-stretch lg:py-16">
               <figure className="lg:order-2 flex justify-center lg:justify-end overflow-hidden grow lg:h-auto">
                  <img
                     src={typeof hero.image === 'object' ? hero.image?.url : hero.image}
                     alt={typeof hero.image === 'object' ? hero.image?.alt : "Hero Image"}
                     className="w-full object-cover lg:w-auto lg:h-auto lg:object-contain pt-16 lg:pt-4"
                  />
               </figure>

               <div className="lg:order-1 flex flex-col justify-end lg:justify-center px-0 pt-6 lg:pt-0 pb-10 lg:pb-6">
                  <h1 className="text-4xl pb-5 lg:pb-6">{hero.title}</h1>
                  <div className="text-base lg:text-lg">
                     <RichText content={hero.text} />
                  </div>
               </div>
            </main>
         )}

         <section className="container mx-auto pb-8 lg:pb-14 overflow-x-hidden">
            <h2 className="text-4xl pb-6 pt-4">Opere recenti</h2>
            {transformedCarouselItems.length > 0 ? (
               <Carousel items={transformedCarouselItems} />
            ) : (
               <p>No carousel items found.</p>
            )}
         </section>

         {project && (
            <ProjectSection
               title={project.title}
               subtitle={project.subtitle}
               description={project.description}
               imageSrc={typeof project.image === 'object' ? project.image?.url : project.image}
               imageAlt={typeof project.image === 'object' ? project.image?.alt : ""}
               galleryPhotos={project.gallery}
               className="lg:mb-0 lg:pb-0"
            />
         )}
      </>
   );
};