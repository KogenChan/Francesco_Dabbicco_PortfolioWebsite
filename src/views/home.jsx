import Carousel from "../components/Carousel";
import ProjectSection from "../components/ProjectSection.jsx"
import useFetchData from "../hooks/useFetchData.min.js";

export default function Home() {
   const { data, loading, error } = useFetchData('/images.min.json');

   return (
      <>
         <main className="h-screen bg-primary container mx-auto flex flex-col lg:grid lg:grid-cols-2 items-stretch lg:py-16">
            <figure className="lg:order-2 flex justify-center lg:justify-end overflow-hidden grow lg:h-auto">
               <img
                  src="../../public/media/cover.webp"
                  alt="Francesco Dabbicco"
                  className="w-full object-cover lg:w-auto lg:h-auto lg:object-contain pt-16 lg:pt-4"
               />
            </figure>

            <div className="lg:order-1 flex flex-col justify-end lg:justify-center px-0 pt-6 lg:pt-0 pb-10 lg:pb-6">
               <h1 className="text-4xl pb-5 lg:pb-6">Francesco Dabbicco</h1>
               <p className="text-base lg:text-lg">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores
                  laudantium, et enim provident, iure quos autem ducimus ad, error ea
                  adipisci neque alias deleniti consequatur tempora culpa similique
                  facere. Architecto?
               </p>
            </div>
         </main>

         {/* ! Opere recenti */}

         <section className="container mx-auto pb-16 lg:pb-20 overflow-x-hidden">
            <h2 className="text-3xl pb-6 pt-12">Latest Works</h2>
            {error && <p className="text-center text-red-500">Error: {error}</p>}
            {!loading && !error && data.length > 0 && <Carousel items={data} />}
         </section>

         {/* ! In evidenza */}

         <ProjectSection
            title="Nome Progetto"
            description={[
               "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores laudantium, et enim provident, iure quos autem ducimus ad, error ea adipisci neque alias deleniti consequatur tempora culpa similique facere. Architecto?",
               "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores laudantium, et enim provident, iure quos autem ducimus ad, error ea adipisci neque alias deleniti consequatur tempora culpa similique facere. Architecto? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores laudantium, et enim provident, iure quos autem ducimus ad, error ea adipisci neque alias deleniti consequatur tempora culpa similique facere. Architecto?"
            ]}
            imageSrc="https://picsum.photos/id/12/650/800"
            imageAlt="Francesco Dabbicco"
            className="lg:mb-20"
         />
      </>
   );
};