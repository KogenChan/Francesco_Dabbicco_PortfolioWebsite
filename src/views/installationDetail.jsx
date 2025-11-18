import { useParams } from 'react-router';
import usePhotos from '../hooks/usePhotos';

export default function InstallationDetail() {
   const { itemName } = useParams();
   const { photos, loading, error } = usePhotos('/installations.min.json'); // Different JSON file
   
   const photo = photos.find(p => p.key === Number(itemName));

   if (loading) {
      return (
         <div className="flex justify-center my-20">
            <div>Loading...</div>
         </div>
      );
   }

   if (error) {
      return (
         <div className="flex justify-center my-20">
            <div>Error loading image</div>
         </div>
      );
   }

   if (!photo) {
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
                  src={photo.src} 
                  alt={`Installation ${itemName}`}
                  className="w-full h-auto"
               />
               <div className="mt-6">
                  <h2 className="text-2xl font-semibold mb-4">{itemName}</h2>
                  <p className="text-base text-gray-700">
                     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. Installation-specific details here.
                  </p>
               </div>
            </div>
         </main>
      </div>
   );
}