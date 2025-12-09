import { useParams } from 'react-router';
import useMediaItem from '../hooks/useMediaItem.min.js';
import RichText from '../components/RichText.jsx';

export default function WorkDetail() {
   const { itemName } = useParams();
   const { media, error } = useMediaItem(itemName);

   if (error) {
      return (
         <div className="flex justify-center items-center h-screen">
            <div>Error loading image</div>
         </div>
      );
   }

   if (!media) {
      return (
         <div className="flex justify-center items-center h-screen">
            <div>Work not found</div>
         </div>
      );
   }

   const additionalImages = Array.isArray(media.additionalImages)
      ? media.additionalImages
      : [];

   return (
      <main className="w-full flex justify-center items-center py-20">
         <div className='px-4 lg:px-0 max-w-4xl w-full'>
            <div className="flex justify-center mb-2">
               <img
                  src={media.url}
                  alt={media.alt || `Work ${media.filename}`}
                  className="w-full h-auto object-contain"
               />
            </div>

            {media.caption && (
               <div className="text-base-content italic text-sm mb-12 text-end">
                  <RichText content={media.caption} />
               </div>
            )}

            {additionalImages.length > 0 && (
               <div className="space-y-6 mt-8">
                  {additionalImages.map((image, index) => (
                     <div key={image.id || index} className="flex justify-center">
                        <img
                           src={image.url}
                           alt={image.alt || `Additional view ${index + 1}`}
                           className="w-full h-auto object-contain"
                        />
                     </div>
                  ))}
               </div>
            )}
         </div>
      </main>
   );
};