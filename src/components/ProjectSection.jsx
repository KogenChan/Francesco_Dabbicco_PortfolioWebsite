import { useNavigate } from 'react-router';
import Gallery from './Gallery';
import RichText from './RichText';

export default function ProjectSection({
   project,
   reverse = false,
   mainImageClickable = false,
   className = '',
   galleryClassName = '',
   textClassName = '',
   detailRoute,
   useZoomModal = false,
}) {
   const navigate = useNavigate();

   if (!project) return null;

   const formatFilename = (filename) => {
      if (!filename) return null;
      return filename.replace(/\.[^/.]+$/, '').replace(/\s+/g, '_');
   };

   const handleMainImageClick = () => {
      if (mainImageClickable && project.image) {
         const targetSlug = project.image.mainWork?.filename
            ? formatFilename(project.image.mainWork.filename)
            : formatFilename(project.image.filename);

         if (targetSlug) {
            const route = detailRoute || project.detailRoute || '/opere';
            navigate(`${route}/${targetSlug}`);
         }
      }
   };

   const imageSrc = project.image?.url;
   const imageAlt = project.image?.alt || project.title;
   const bg = project.bg || '';

   const imageElement = (
      <img
         src={imageSrc}
         alt={imageAlt}
         className={`w-full object-cover lg:w-auto lg:pt-0 max-h-[90vh] ${mainImageClickable ? 'cursor-pointer transition-opacity duration-300 hover:opacity-80' : ''
            }`}
         onClick={mainImageClickable ? handleMainImageClick : undefined}
      />
   );

   return (
      <>
         <section className={`bg-${bg}`}>
            <article className={`bg-none container mx-auto flex flex-col items-stretch lg:py-16 ${reverse ? 'lg:grid lg:grid-cols-2 lg:flex-col-reverse' : 'lg:grid lg:grid-cols-2'
               } ${className}`}>

               {/* # Title for mobile */}
               <div className="lg:hidden pt-10 pb-6">
                  <h2 className="text-4xl">{project.title}</h2>
                  {project.subtitle && <p className="text-xl text-gray-600 mt-2">{project.subtitle}</p>}
               </div>

               {/* # Image */}
               <figure className={`min-h-[50vh] lg:min-h-[88vh] flex overflow-hidden grow lg:h-auto lg:mx-0 ${reverse ? 'justify-end lg:order-2' : 'justify-start lg:order-1'
                  }`}>
                  {imageElement}
               </figure>

               {/* # Text content */}
               <div className={`flex flex-col justify-end lg:justify-center px-0 pt-6 lg:pt-0 pb-10 lg:pb-8 ${reverse ? 'lg:order-1' : 'lg:order-2'
                  } ${textClassName}`}>
                  <div className="hidden lg:block pb-6">
                     <h1 className="text-4xl">{project.title}</h1>
                     {project.subtitle && <p className="text-xl text-gray-600 mt-2">{project.subtitle}</p>}
                  </div>
                  <div className='text-base lg:text-lg'>
                     <RichText content={project.description} />
                  </div>
               </div>
            </article>

            {/* # Optional Gallery */}
            {project.gallery && (
               <Gallery
                  content={project.gallery}
                  className={galleryClassName}
                  detailRoute={detailRoute || project.detailRoute || '/opere'}
                  useZoomModal={useZoomModal}
               />
            )}
         </section>
      </>
   );
};