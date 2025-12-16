import { useState } from 'react';
import { FaInstagram } from 'react-icons/fa';
import { MdOutlineAlternateEmail } from 'react-icons/md';

export default function ContactForm() {
   const [result, setResult] = useState("");
   const [errors, setErrors] = useState({});

   const validateForm = (formData) => {
      const newErrors = {};
      
      if (!formData.get('name')?.trim()) {
         newErrors.name = 'Il nome è obbligatorio';
      }
      
      if (!formData.get('surname')?.trim()) {
         newErrors.surname = 'Il cognome è obbligatorio';
      }
      
      const email = formData.get('email')?.trim();
      if (!email) {
         newErrors.email = "L'email è obbligatoria";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
         newErrors.email = "L'email non è valida";
      }
      
      if (!formData.get('message')?.trim()) {
         newErrors.message = 'Il messaggio è obbligatorio';
      }
      
      return newErrors;
   };

   const onSubmit = async (event) => {
      event.preventDefault();
      setErrors({});
      setResult("");
      
      const formData = new FormData(event.target);
      const validationErrors = validateForm(formData);
      
      if (Object.keys(validationErrors).length > 0) {
         setErrors(validationErrors);
         return;
      }
      
      setResult("Invio in corso...");
      formData.append("access_key", "3ed96716-a9c5-48ec-bfc8-e751a616231f");

      const response = await fetch("https://api.web3forms.com/submit", {
         method: "POST",
         body: formData
      });

      const data = await response.json();
      if (data.success) {
         setResult("Messaggio inviato con successo");
         event.target.reset();
      } else {
         setResult("Errore nell'invio del messaggio");
      }
   };

   return (
      <div className="container flex justify-center items-center">
         {/* Form */}
         <div className="sm:w-3/4 md:w-3/5 lg:w-1/2 xl:w-2/5">

            {/* Contact Info */}
            <div className="mb-4 w-full flex justify-between">
               <h2 className="text-accent-content text-3xl">
                  Contattami
               </h2>

               <div className="flex items-end">
                  <p className='pb-[1px] pe-1'>Email: </p>
                  <button
                     type="button"
                     className="cursor-pointer me-1 pb-[1px]"
                     onClick={() => {
                        navigator.clipboard.writeText('francescodabbicco.art@gmail.com');
                        alert('Email copied to clipboard!');
                     }}
                  >
                     <MdOutlineAlternateEmail className="text-2xl pt-1 text-base-content hover:text-accent transition-colors duration-100" />
                  </button>
                  <p className="text-2xl font-sans text-accent -mb-[1px] px-1">|</p>
                  <a
                     className="text-base-content m-0 mx-1.5 pb-[1px]"
                     target="_blank"
                     href="https://www.instagram.com/francescodabbiccoart/"
                     rel="noopener noreferrer"
                  >
                     <FaInstagram className="text-2xl pt-1 text-base-content hover:text-accent transition-colors duration-100" />
                  </a>
               </div>
            </div>
            <form onSubmit={onSubmit} noValidate>
               <input type="checkbox" name="botcheck" className="hidden" />

               <div className="flex gap-4">
                  <div className="w-1/2">
                     <label htmlFor="name" className="text-base-content block">
                        <small>Nome</small>
                     </label>
                     <input
                        id="name"
                        type="text"
                        name="name"
                        className={`mt-1 mb-1 p-2 w-full border-2 focus:outline-none focus:rounded-0 ${errors.name ? 'border-red-500' : 'border-accent focus:border-accent-content'}`}
                     />
                     {errors.name && (
                        <p className="text-red-500 text-sm mb-2">{errors.name}</p>
                     )}
                  </div>
                  <div className="w-1/2">
                     <label htmlFor="surname" className="text-base-content block">
                        <small>Cognome</small>
                     </label>
                     <input
                        id="surname"
                        type="text"
                        name="surname"
                        className={`mt-1 mb-1 p-2 w-full border-2 focus:outline-none focus:rounded-0 ${errors.surname ? 'border-red-500' : 'border-accent focus:border-accent-content'}`}
                     />
                     {errors.surname && (
                        <p className="text-red-500 text-sm mb-2">{errors.surname}</p>
                     )}
                  </div>
               </div>

               <div>
                  <label htmlFor="email" className="text-base-content block">
                     <small>Email</small>
                  </label>
                  <input
                     id="email"
                     type="email"
                     name="email"
                     className={`mt-1 mb-1 p-2 w-full border-2 focus:outline-none focus:rounded-0 ${errors.email ? 'border-red-500' : 'border-accent focus:border-accent-content'}`}
                  />
                  {errors.email && (
                     <p className="text-red-500 text-sm mb-2">{errors.email}</p>
                  )}
               </div>

               <div>
                  <label htmlFor="message" className="text-base-content block">
                     <small>Il tuo messaggio</small>
                  </label>
                  <textarea
                     id="message"
                     name="message"
                     className={`mt-1 mb-1 p-2 w-full border-2 focus:outline-none focus:rounded-0 ${errors.message ? 'border-red-500' : 'border-accent focus:border-accent-content'}`}
                     rows="4"
                  />
                  {errors.message && (
                     <p className="text-red-500 text-sm mb-2">{errors.message}</p>
                  )}
               </div>
               <div className="flex justify-between items-center">
                  {result && (
                     <span className={`block mt-2 ${result === "Messaggio inviato con successo" ? 'text-green-600' : result === "Invio in corso..." ? 'text-base-content' : 'text-red-500'}`}>
                        {result}
                     </span>
                  )}
                  <div />
                  <button type="submit" className="bg-accent py-1.5 px-5 rounded-full text-white hover:opacity-80 transition-opacity duration-100 cursor-pointer">Invia</button>
               </div>
            </form>
         </div>
      </div>
   );
}