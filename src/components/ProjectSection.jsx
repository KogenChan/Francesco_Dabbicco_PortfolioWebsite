import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
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

   // In landscape on mobile/tablet, behave like lg breakpoint
   const isEffectiveLg = (isLandscape && window.innerWidth < 1024) || window.innerWidth >= 1024;

   // Process className props to apply lg: classes in landscape mode
   const processClassName = (classStr) => {
      if (!classStr) return classStr;
      if (!isLandscape || window.innerWidth >= 1024) return classStr;

      // In landscape mobile/tablet, remove lg: prefix and filter out conflicting mobile classes
      const classes = classStr.split(' ');
      const processedClasses = [];
      const lgClasses = new Set();

      // First pass: collect all lg: classes (without prefix)
      classes.forEach(cls => {
         if (cls.startsWith('lg:')) {
            const withoutPrefix = cls.substring(3);
            lgClasses.add(withoutPrefix);
            processedClasses.push(withoutPrefix);
         }
      });

      // Second pass: add non-lg classes only if they don't conflict with lg classes
      classes.forEach(cls => {
         if (!cls.startsWith('lg:')) {
            // Check if this class conflicts with an lg: class
            // Extract the property name (e.g., 'pe' from 'pe-0' or 'pe-8')
            const property = cls.split('-')[0];
            const hasConflict = Array.from(lgClasses).some(lgCls => lgCls.split('-')[0] === property);

            if (!hasConflict) {
               processedClasses.push(cls);
            }
         }
      });

      const processed = processedClasses.join(' ');

      console.log('Processing classes:', {
         original: classStr,
         processed: processed,
         isLandscape,
         width: window.innerWidth
      });

      return processed;
   };

   const processedClassName = processClassName(className);
   const processedTextClassName = processClassName(textClassName);
   const processedGalleryClassName = processClassName(galleryClassName);

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
            <article className={`bg-none container mx-auto flex flex-col items-stretch ${isEffectiveLg ? 'py-16' : ''
               } lg:py-16 ${isEffectiveLg
                  ? (reverse ? 'grid grid-cols-2 flex-col-reverse' : 'grid grid-cols-2')
                  : ''
               } ${processedClassName}`}>

               {/* # Title for mobile */}
               <div className={isEffectiveLg ? 'hidden' : 'pt-10 pb-6'}>
                  <h2 className="text-4xl">{project.title}</h2>
                  {project.subtitle && <p className="text-xl text-gray-600 mt-2">{project.subtitle}</p>}
               </div>

               {/* # Image */}
               <figure className={`flex items-center overflow-hidden grow ${isEffectiveLg ? 'h-auto mx-0' : ''
                  } lg:h-auto lg:mx-0 ${isEffectiveLg ? (reverse ? 'justify-end order-2' : 'justify-start order-1') : (reverse ? 'justify-end lg:order-2' : 'justify-start lg:order-1')
                  }`}>
                  {imageElement}
               </figure>

               {/* # Text content */}
               <div className={`flex flex-col ${isEffectiveLg ? 'justify-center pt-0 pb-8' : 'justify-end pt-6 pb-10'
                  } lg:justify-center lg:pt-0 lg:pb-8 ${isEffectiveLg ? '' : 'px-0'
                  } ${isEffectiveLg ? (reverse ? 'order-1' : 'order-2') : (reverse ? 'lg:order-1' : 'lg:order-2')
                  } ${processedTextClassName}`}>
                  <div className={isEffectiveLg ? 'block pb-6' : 'hidden lg:block pb-6'}>
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
                  className={processedGalleryClassName}
                  detailRoute={detailRoute || project.detailRoute || '/opere'}
                  useZoomModal={useZoomModal}
               />
            )}
         </section>
      </>
   );
};