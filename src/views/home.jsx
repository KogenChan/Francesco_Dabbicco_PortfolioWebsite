import Carousel from "../components/Carousel";
import useFetchData from "../hooks/useFetchData";

export default function Home() {
   const { data, loading, error } = useFetchData('/images.min.json');

   return (
      <>
         <main className="h-screen bg-primary container mx-auto flex flex-col lg:grid lg:grid-cols-2 items-stretch lg:py-16">
            <figure className="lg:order-2 flex justify-center lg:justify-end overflow-hidden grow lg:h-auto">
               <img
                  src="https://picsum.photos/id/12/650/800"
                  alt="Francesco Dabbicco"
                  className="h-full object-cover lg:w-auto lg:h-auto lg:object-contain pt-16"
               />
            </figure>

            <div className="lg:order-1 flex flex-col justify-end lg:justify-center px-0 pt-6 lg:pt-0 pb-10 lg:pb-8">
               <h1 className="text-4xl pb-5 lg:pb-6">Francesco Dabbicco</h1>
               <p className="text-base lg:text-lg">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores
                  laudantium, et enim provident, iure quos autem ducimus ad, error ea
                  adipisci neque alias deleniti consequatur tempora culpa similique
                  facere. Architecto?
               </p>
            </div>
         </main>

         <section className="container mx-auto py-12 overflow-x-hidden">
            {loading && <p className="text-center text-gray-500">Loading images...</p>}
            {error && <p className="text-center text-red-500">Error: {error}</p>}
            {!loading && !error && data.length > 0 && <Carousel items={data} />}
         </section>

         <section className="bg-secondary">
            <div className="h-screen bg-none container mx-auto flex flex-col lg:grid lg:grid-cols-2 items-stretch lg:py-16">
               <h1 className="text-4xl pb-6 pt-12 lg:hidden">Nome Progetto</h1>
               <figure className="flex justify-start overflow-hidden grow lg:h-auto">
                  <img
                     src="https://picsum.photos/id/12/650/800"
                     alt="Francesco Dabbicco"
                     className="w-full object-cover lg:w-auto lg:h-auto lg:object-contain"
                  />
               </figure>

               <div className="flex flex-col justify-end lg:justify-center px-0 pt-6 lg:pt-0 pb-10 lg:pb-8 lg:ps-4 2xl:ps-0">
                  <h1 className="text-4xl pb-6 hidden lg:block">Nome Progetto</h1>
                  <p className="text-base lg:text-lg">
                     Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores
                     laudantium, et enim provident, iure quos autem ducimus ad, error ea
                     adipisci neque alias deleniti consequatur tempora culpa similique
                     facere. Architecto?
                  </p>
                  <br />
                  <p className="text-base lg:text-lg">
                     Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores
                     laudantium, et enim provident, iure quos autem ducimus ad, error ea
                     adipisci neque alias deleniti consequatur tempora culpa similique
                     facere. Architecto? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores
                     laudantium, et enim provident, iure quos autem ducimus ad, error ea
                     adipisci neque alias deleniti consequatur tempora culpa similique
                     facere. Architecto?
                  </p>
               </div>
            </div>
         </section>
      </>
   );
};