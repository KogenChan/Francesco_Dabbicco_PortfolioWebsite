import { useNavigate } from 'react-router';
import PhotoAlbum from "react-photo-album";
import "react-photo-album/styles.css";

export default function Gallery({ content, className }) {
   const navigate = useNavigate();

   const handlePhotoClick = (photo) => {
      navigate(`/opere/${photo.key}`);
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
         <div className={`container w-full my-16 ${className}`}>
            {content.length > 0 && (
               <PhotoAlbum 
                  layout="rows"
                  photos={content}
                  spacing={16}
                  padding={0}
                  targetRowHeight={300}
                  breakpoints={[300, 600, 1100]}
                  onClick={({ photo }) => handlePhotoClick(photo)}
                  renderPhoto={({ photo, wrapperStyle }) => (
                     <div style={wrapperStyle}>
                        <img
                           src={photo.src}
                           alt=""
                           style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                           }}
                           className="react-photo-album--image"
                        />
                     </div>
                  )}
               />
            )}
         </div>
      </article>
   );
};