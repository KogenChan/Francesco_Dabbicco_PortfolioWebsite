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
   textClassName = '',
   bg = '',
   detailRoute = ''
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
               <figure className={`flex overflow-hidden grow lg:h-auto lg:mx-0 ${reverse ? 'justify-end lg:order-2' : 'justify-start lg:order-1'}`}>
                  <img
                     src={imageSrc}
                     alt={imageAlt}
                     className="w-full object-cover lg:w-auto lg:pt-0 max-h-[90vh]"
                  />
               </figure>

               {/* # Text content */}
               <div className={`flex flex-col justify-end lg:justify-center px-0 pt-6 lg:pt-0 pb-10 lg:pb-8 ${reverse ? 'lg:order-1' : 'lg:order-2'} ${textClassName}`}>
                  <div className="hidden lg:block pb-6">
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
               <Gallery
                  content={galleryPhotos}
                  className={galleryClassName}
                  detailRoute={detailRoute || '/opere'}
               />
            )}
         </section>
      </>
   );
};