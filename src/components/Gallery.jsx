import { useNavigate } from 'react-router';
import PhotoAlbum from "react-photo-album";
import "react-photo-album/styles.css";
import useImageZoom from '../hooks/useImageZoom';

export default function Gallery({
   content,
   className,
   detailRoute = '/opere',
   useZoomModal = false
}) {
   const navigate = useNavigate();
   const { handleImageClick, ZoomModal } = useImageZoom();

   let images = [];

   if (!content) {
      return null;
   } else {
      images = content.images;
   }

   // Transform to PhotoAlbum format
   const processedPhotos = images.map(item => {
      if (item.src && item.width && item.height) {
         return item;
      }

      if (item.image) {
         const thumbnailUrl = item.image.sizes?.card?.url || item.image.url;
         const fullUrl = item.image.sizes?.full?.url &&
                        !item.image.sizes.full.url.endsWith('/null')
                        ? item.image.sizes.full.url
                        : item.image.url;
         ;

         const formatFilename = (filename) => {
            if (!filename) return null;
            return filename.replace(/\.[^/.]+$/, '').replace(/\s+/g, '_');
         };

         return {
            src: thumbnailUrl,
            fullSrc: fullUrl,
            alt: item.alt || item.image.alt || "",
            width: item.image.sizes?.card?.width || item.image.width || 800,
            height: item.image.sizes?.card?.height || item.image.height || 600,
            key: item.image.id,
            slug: formatFilename(item.image.filename),
            mainWorkSlug: item.image.mainWork?.filename ? formatFilename(item.image.mainWork.filename) : null,
            test: item,
         };
      }

      // Fallback: return as is
      return item;
   });

   if (processedPhotos.length === 0) {
      return null;
   }

   const handlePhotoClick = (photo, event, index) => {
      if (useZoomModal) {
         // Create a synthetic event with the full src from photo data
         const syntheticEvent = {
            preventDefault: () => { },
            stopPropagation: () => { },
            target: {
               ...event.target,
               src: photo.src,
               dataset: {
                  fullSrc: photo.fullSrc
               },
               getBoundingClientRect: () => event.target.getBoundingClientRect()
            }
         };
         // Pass all processed photos for carousel navigation
         handleImageClick(syntheticEvent, processedPhotos, index);
      } else {
         // For works: navigate to detail page
         const targetSlug = photo.mainWorkSlug || photo.slug;
         navigate(`${detailRoute}/${targetSlug}`);
      }
   };



   return (
      <article className="flex justify-center">
         <style>{`
            .react-photo-album--image {
               cursor: pointer !important;
               transition: opacity 300ms ease-in-out !important;
            }
            .react-photo-album--image:hover {
               opacity: 0.8 !important;
            }
         `}</style>
         <div className={`container w-full my-5 lg:my-16 ${className}`}>
            <PhotoAlbum
               layout="rows"
               photos={processedPhotos}
               spacing={16}
               padding={0}
               targetRowHeight={300}
               breakpoints={[300, 600, 1100]}
               onClick={({ photo, event, index }) => handlePhotoClick(photo, event, index)}
               renderPhoto={({ photo, wrapperStyle }) => (
                  <div style={wrapperStyle}>
                     <img
                        src={photo.src}
                        data-full-src={photo.fullSrc || photo.src}
                        alt={photo.alt || ""}
                        className="react-photo-album--image"
                        loading="lazy"
                     />
                  </div>
               )}
            />
         </div>

         {useZoomModal && <ZoomModal />}
      </article>
   );
};