import { useNavigate } from 'react-router';
import PhotoAlbum from "react-photo-album";
import "react-photo-album/styles.css";
import usePhotos from '../hooks/usePhotos';

export default function Works() {
   const { photos, loading, error } = usePhotos('/images.min.json');
   const navigate = useNavigate();

   const handlePhotoClick = (photo) => {
      navigate(`/opere/${photo.key}`);
   };

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
            <div>Error loading images</div>
         </div>
      );
   }

   return (
      <div className="flex justify-center">
         <style>{`
            .react-photo-album--image {
               cursor: pointer !important;
               transition: opacity 300ms ease-in-out !important;
            }
            .react-photo-album--image:hover {
               opacity: 0.8 !important;
            }
         `}</style>
         <main className="container w-full mt-16 mb-2 pt-4">
            {photos.length > 0 && (
               <PhotoAlbum 
                  layout="rows"
                  photos={photos}
                  spacing={16}
                  padding={0}
                  targetRowHeight={300}
                  breakpoints={[300, 600, 1100]}
                  onClick={({ photo }) => handlePhotoClick(photo)}
               />
            )}
         </main>
      </div>
   );
};