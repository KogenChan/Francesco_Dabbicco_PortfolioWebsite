import Gallery from '../components/Gallery.jsx';
import ProjectSection from '../components/ProjectSection.jsx';
import useProjectSection from '../hooks/useProjectSection.min.js';
import useGallery from '../hooks/useGallery.min.js';

export default function Works() {
   const { gallery, error: galleryError } = useGallery('main');
   const { project: project1, error: project1Error } = useProjectSection('epica');
   const { project: project2, error: project2Error } = useProjectSection('torneo');
   const { project: project3, error: project3Error } = useProjectSection('copricapi');

   if (galleryError || project1Error || project2Error || project3Error) {
      return (
         <div className="flex justify-center my-20">
            <div>Error loading content</div>
         </div>
      );
   }

   return (
      <>
         <main className='pt-11 lg:pt-0 min-h-screen'>
            <Gallery content={gallery} detailRoute="/opere" />
         </main>
         {project1 && (
            <ProjectSection
               title={project1.title}
               subtitle={project1.subtitle}
               description={project1.description}
               imageSrc={project1.image?.url}
               imageAlt={project1.image?.alt || ""}
               galleryPhotos={project1.gallery}
               reverse={true}
               className='lg:pb-0'
               galleryClassName='lg:mt-8 lg:mb-8'
               textClassName='pe-0 lg:pe-8'
            />
         )}

         {project2 && (
            <ProjectSection
               title={project2.title}
               subtitle={project2.subtitle}
               description={project2.description}
               imageSrc={project2.image?.url}
               imageAlt={project2.image?.alt || ""}
               galleryPhotos={project2.gallery}
               reverse={false}
               className='lg:pb-0'
               galleryClassName='lg:mt-8 lg:mb-8'
               textClassName='ps-0 lg:ps-8'
            />
         )}

         {project3 && (
            <ProjectSection
               title={project3.title}
               subtitle={project3.subtitle}
               description={project3.description}
               imageSrc={project3.image?.url}
               imageAlt={project3.image?.alt || ""}
               galleryPhotos={project3.gallery}
               reverse={true}
               className='lg:pb-0'
               galleryClassName='lg:mt-8 lg:mb-8'
               textClassName='pe-0 lg:pe-8'
            />
         )}
      </>
   );
};