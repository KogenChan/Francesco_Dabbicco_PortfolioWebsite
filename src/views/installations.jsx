import ProjectSection from '../components/ProjectSection.jsx';
import useProjectSection from '../hooks/useProjectSection.min.js';

export default function Installations() {
   const { project: project1, error: error1 } = useProjectSection('nuces');
   const { project: project2, error: error2 } = useProjectSection('test-1');

   if (error1 || error2) {
      return (
         <div className="flex justify-center my-20">
            <div>Error loading content</div>
         </div>
      );
   }

   return (
      <main>
         {project1 && (
            <ProjectSection
               title={project1.title}
               subtitle={project1.subtitle}
               description={project1.description}
               imageSrc={`http://localhost:3000${project1.image?.url}`}
               imageAlt={project1.image?.alt || ""}
               galleryPhotos={project1.gallery}
               reverse={true}
               className='lg:pb-0 pt-10 lg:pt-16'
               galleryClassName='lg:mt-8'
               bg='primary'
               detailRoute="/installazioni"
            />
         )}
         
         {project2 && (
            <ProjectSection
               title={project2.title}
               subtitle={project2.subtitle}
               description={project2.description}
               imageSrc={`http://localhost:3000${project2.image?.url}`}
               imageAlt={project2.image?.alt || ""}
               galleryPhotos={project2.gallery}
               reverse={false}
               className='lg:pb-0'
               galleryClassName='lg:mt-8 lg:mb-8'
               bg='secondary'
               detailRoute="/installazioni"
            />
         )}
      </main>
   );
};