import { useNavigate } from 'react-router';
import PhotoAlbum from "react-photo-album";
import "react-photo-album/styles.css";

export default function Gallery({ 
   content, 
   className, 
   baseUrl = 'http://localhost:3000',
   detailRoute = '/opere'
}) {
   const navigate = useNavigate();

   const handlePhotoClick = (photo) => {
      navigate(`${detailRoute}/${photo.key}`);
   };

   let images = [];

   if (!content) {
      return null;
   }

   // If content is a gallery object with images array (from CMS relationship)
   if (content.images && Array.isArray(content.images)) {
      images = content.images;
   }
   // If content is already an array (legacy format or direct array)
   else if (Array.isArray(content)) {
      images = content;
   }

   // Transform to PhotoAlbum format
   const processedPhotos = images.map(item => {
      // If it's already in the correct format (has src, width, height)
      if (item.src && item.width && item.height) {
         return item;
      }

      // If it's coming from CMS (has image object)
      if (item.image) {
         return {
            src: `${baseUrl}${item.image.url}`,
            alt: item.alt || item.image.alt || "",
            width: item.image.width || 800,
            height: item.image.height || 600,
            key: item.image.id, // Use media ID instead of numeric key
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
                     />
                  </div>
               )}
            />
         </div>
      </article>
   );
};