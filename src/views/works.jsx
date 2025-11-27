import Gallery from '../components/Gallery.jsx';
import ProjectSection from '../components/ProjectSection.jsx';
import useProjectSection from '../hooks/useProjectSection.min.js';
import useGallery from '../hooks/useGallery.min.js';

export default function Works() {
   const { gallery, error: galleryError } = useGallery('main');
   const { project, error: projectError } = useProjectSection('test-1');

   if (galleryError || projectError) {
      return (
         <div className="flex justify-center my-20">
            <div>Error loading content</div>
         </div>
      );
   }

   return (
      <>
         <main className='min-h-screen pt-6'>
            <Gallery content={gallery} detailRoute="/opere" />
         </main>
         {project && (
            <ProjectSection
               title={project.title}
               subtitle={project.subtitle}
               description={project.description}
               imageSrc={`http://localhost:3000${project.image?.url}`}
               imageAlt={project.image?.alt || ""}
               galleryPhotos={project.gallery}
               reverse={true}
               className='lg:pb-0'
               galleryClassName='lg:mt-8'
               bg='secondary'
            />
         )}
      </>
   );
};