import { Link, useParams } from 'react-router';
import useMediaItem from '../hooks/useMediaItem.min.js';
import RichText from '../components/RichText.jsx';
import routes from "../routing/routes.min";

export default function WorkDetail() {
   const { itemName } = useParams();
   const { media, loading, error } = useMediaItem(itemName);

   if (error) {
      return (
         <div className="flex justify-center items-center h-screen">
            <div>Error loading image</div>
         </div>
      );
   };

   if (loading) {
      return null;
   };

   if (!media) {
      return (
         <div className="flex justify-center items-center h-screen">
            <div>Work not found</div>
         </div>
      );
   };

   const additionalImages = Array.isArray(media.additionalImages)
      ? media.additionalImages
      : []
      ;

   return (
      <div>
         <main className="w-full flex justify-center items-center pt-16 lg:pt-20 pb-10 min-h-screen">
            <div className='px-4 lg:px-0 max-w-4xl w-full'>
               <div className="flex justify-center mb-12">
                  <div className="inline-grid grid-cols-[minmax(0,1fr)] lg:min-h-[90vh]">
                     <img
                        src={media.url}
                        alt={media.alt || `Work ${media.filename}`}
                        className="h-auto lg:h-[85vh] object-contain w-full"
                     />
                     {media.caption && (
                        <div className="text-base-content text-sm mt-2 text-right wrap-break-word">
                           <RichText content={media.caption} />
                        </div>
                     )}
                  </div>
               </div>

               {additionalImages.length > 0 && (
                  <div className="space-y-6">
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
         <div className="container m-auto flex justify-center pb-10">
            <Link to={routes.works} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
               <button type="submit" className="btn-main z-10">
                  <p className='z-20 relative'>Torna alla galleria</p>
               </button>
            </Link>
         </div>
      </div>
   );
};