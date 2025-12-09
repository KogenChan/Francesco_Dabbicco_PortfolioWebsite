import { useParams } from 'react-router';
import useMediaItem from '../hooks/useMediaItem.min.js';
import RichText from '../components/RichText.jsx';

export default function InstallationDetail() {
   const { itemName } = useParams();
   const { media, error } = useMediaItem(itemName);

   if (error) {
      return (
         <div className="flex justify-center my-20">
            <div>Error loading image</div>
         </div>
      );
   }

   if (!media) {
      return (
         <div className="flex justify-center my-20">
            <div>Installation not found</div>
         </div>
      );
   }

   return (
      <div className="flex justify-center">
         <main className="container w-full my-20">
            <div className="max-w-4xl mx-auto">
               <img
                  src={media.url}
                  alt={media.alt || `Installation ${media.filename}`}
                  className="w-full h-auto mb-2"
               />
               {media.caption && (
                  <div className='text-end'>
                     <RichText content={media.caption} />
                  </div>
               )}
            </div>
         </main>
      </div>
   );
};