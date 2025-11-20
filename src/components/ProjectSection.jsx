import Gallery from './Gallery';

export default function ProjectSection({
   title,
   description,
   imageSrc,
   imageAlt,
   reverse = false,
   galleryPhotos = null,
   className = '',
   galleryClassName = ''
}) {
   return (
      <>
         <section className="bg-secondary">
            <article className={`min-h-screen bg-none container mx-auto flex flex-col items-stretch lg:py-16 ${reverse ? 'lg:grid lg:grid-cols-2 lg:flex-col-reverse' : 'lg:grid lg:grid-cols-2'
               } ${className}`}>

               {/* # Title for mobile */}
               <h2 className="text-4xl pb-6 pt-12 lg:hidden">{title}</h2>

               {/* # Image */}
               <figure className={`flex overflow-hidden grow lg:h-auto ${reverse ? 'justify-end' : 'justify-start'
                  } ${reverse ? 'lg:ps-4 lg:pe-0 lg:order-2' : 'lg:ps-0 lg:pe-4 lg:order-1'}`}>
                  <img
                     src={imageSrc}
                     alt={imageAlt}
                     className="w-full object-cover lg:w-auto lg:h-auto lg:object-contain"
                  />
               </figure>

               {/* # Text content */}
               <div className={`flex flex-col justify-end lg:justify-center px-0 pt-6 lg:pt-0 pb-10 lg:pb-8 ${reverse ? 'lg:ps-0 lg:pe-4 lg:order-1' : 'lg:ps-4 lg:pe-0 lg:order-2'
                  }`}>
                  <h1 className="text-4xl pb-8 hidden lg:block">{title}</h1>
                  {Array.isArray(description) ? (
                     description.map((paragraph, index) => (
                        <div key={index}>
                           <p className="text-base lg:text-lg">{paragraph}</p>
                           {index < description.length - 1 && <br />}
                        </div>
                     ))
                  ) : (
                     <p className="text-base lg:text-lg">{description}</p>
                  )}
               </div>
            </article>

            {/* # Optional Gallery */}
            {galleryPhotos && galleryPhotos.length > 0 && (
               <Gallery content={galleryPhotos} className={galleryClassName} />
            )}
         </section>
      </>
   );
};