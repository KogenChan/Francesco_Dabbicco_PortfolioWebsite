export default function Home() {
   return (
      <main className="h-screen container mx-auto flex flex-col sm:grid sm:grid-cols-2 items-stretch sm:py-16">
         <figure className="sm:order-2 flex justify-end overflow-hidden flex-grow sm:h-auto">
            <img
               src="https://picsum.photos/id/12/650/800"
               alt="Francesco Dabbicco"
               className="w-full object-cover sm:w-auto sm:h-auto sm:object-contain"
            />
         </figure>

         <div className="sm:order-1 flex flex-col justify-end sm:justify-center px-0 pt-6 sm:pt-0 pb-10 sm:pb-8">
            <h1 className="text-4xl sm:text-5xl pb-5 sm:pb-6">Hello World!</h1>
            <p className="text-base sm:text-lg">
               Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores
               laudantium, et enim provident, iure quos autem ducimus ad, error ea
               adipisci neque alias deleniti consequatur tempora culpa similique
               facere. Architecto?
            </p>
         </div>
      </main>
   );
};