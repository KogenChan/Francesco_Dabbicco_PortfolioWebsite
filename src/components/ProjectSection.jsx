import Gallery from './Gallery';
import RichText from './RichText';

export default function ProjectSection({
   title,
   subtitle,
   description,
   imageSrc,
   imageAlt,
   reverse = false,
   galleryPhotos = null,
   className = '',
   galleryClassName = '',
   bg = ''
}) {
   return (
      <>
         <section className={`bg-${bg}`}>
            <article className={`bg-none container mx-auto flex flex-col items-stretch lg:py-16 ${reverse ? 'lg:grid lg:grid-cols-2 lg:flex-col-reverse' : 'lg:grid lg:grid-cols-2'
               } ${className}`}>

               {/* # Title for mobile */}
               <div className="lg:hidden pt-10 pb-6">
                  <h2 className="text-4xl">{title}</h2>
                  {subtitle && <p className="text-xl text-gray-600 mt-2">{subtitle}</p>}
               </div>

               {/* # Image */}
               <figure className={`flex overflow-hidden grow lg:h-auto ${reverse ? 'justify-end lg:ms-4 lg:me-0 lg:order-2' : 'justify-start lg:ms-0 lg:me-4 lg:order-1'}`}>
                  <img
                     src={imageSrc}
                     alt={imageAlt}
                     className="w-full object-cover lg:w-auto lg:h-[95%] lg:pt-0 "
                  />
               </figure>

               {/* # Text content */}
               <div className={`flex flex-col justify-end lg:justify-center px-0 pt-6 lg:pt-0 pb-10 lg:pb-0 ${reverse ? 'lg:ps-0 lg:pe-4 lg:order-1' : 'lg:ps-4 lg:pe-0 lg:order-2'
                  }`}>
                  <div className="hidden lg:block pb-8">
                     <h1 className="text-4xl">{title}</h1>
                     {subtitle && <p className="text-xl text-gray-600 mt-2">{subtitle}</p>}
                  </div>
                  <div className='text-base lg:text-lg'>
                     <RichText content={description} />
                  </div>
               </div>
            </article>

            {/* # Optional Gallery */}
            {galleryPhotos && (
               <Gallery content={galleryPhotos} className={galleryClassName} />
            )}
         </section>
      </>
   );
};