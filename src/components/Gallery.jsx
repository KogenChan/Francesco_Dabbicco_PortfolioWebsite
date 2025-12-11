import { useNavigate } from 'react-router';
import PhotoAlbum from "react-photo-album";
import "react-photo-album/styles.css";

export default function Gallery({
   content,
   className,
   detailRoute = '/opere'
}) {
   const navigate = useNavigate();

   const handlePhotoClick = (photo) => {
      // If the photo has a mainWork reference, navigate to that instead
      const targetSlug = photo.mainWorkSlug || photo.slug;
      navigate(`${detailRoute}/${targetSlug}`);
   };

   let images = [];

   if (!content) {
      return null;
   } else {
      images = content.images
   }

   // Transform to PhotoAlbum format
   const processedPhotos = images.map(item => {
      if (item.src && item.width && item.height) {
         return item;
      }

      if (item.image) {
         const thumbnailUrl = item.image.sizes?.card?.url || item.image.url;
         
         const formatFilename = (filename) => {
            if (!filename) return null;
            return filename.replace(/\.[^/.]+$/, '').replace(/\s+/g, '_');
         };

         return {
            src: `${thumbnailUrl}`,
            alt: item.alt || item.image.alt || "",
            width: item.image.sizes?.card?.width || item.image.width || 800,
            height: item.image.sizes?.card?.height || item.image.height || 600,
            key: item.image.id,
            slug: formatFilename(item.image.filename),
            mainWorkSlug: item.image.mainWork?.filename ? formatFilename(item.image.mainWork.filename) : null,
            fullImageUrl: `${item.image.url}`,
         };
      }

      // Fallback: return as is
      return item;
   });

   if (processedPhotos.length === 0) {
      return null;
   }

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
               onClick={({ photo }) => handlePhotoClick(photo)}
               renderPhoto={({ photo, wrapperStyle }) => (
                  <div style={wrapperStyle}>
                     <img
                        src={photo.src}
                        alt={photo.alt || ""}
                        className="react-photo-album--image"
                        loading="lazy"
                     />
                  </div>
               )}
            />
         </div>
      </article>
   );
};