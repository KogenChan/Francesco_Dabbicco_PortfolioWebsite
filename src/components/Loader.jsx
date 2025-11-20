export default function Loader({ isVisible }) {
   return (
      <div className={`fixed h-screen w-screen flex justify-center items-center z-50 bg-primary/70 transition-opacity duration-100 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
         <div className="loader-mask">
            <div className="loader" />
         </div>
      </div>
   )
};