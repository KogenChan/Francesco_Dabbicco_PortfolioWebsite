import { useState } from 'react';
import { FaInstagram } from 'react-icons/fa';
import { MdOutlineAlternateEmail } from 'react-icons/md';

export default function ContactForm() {
   const [result, setResult] = useState("");

   const onSubmit = async (event) => {
      event.preventDefault();
      setResult("Invio in corso...");
      const formData = new FormData(event.target);
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
         setResult("Error");
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
                  {/* <a
                     className="text-base-content m-0 mx-1.5"
                     target="_blank"
                     href="https://www.linkedin.com/in/luca--simone/"
                     rel="noopener noreferrer"
                  >
                     <FaLinkedin className="text-2xl pt-1 text-base-content hover:text-accent transition-colors duration-100" />
                  </a> */}
               </div>
            </div>
            <form onSubmit={onSubmit}>
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
                        className="mt-1 mb-3 p-2 w-full border-2 border-accent focus:outline-none focus:rounded-0 focus:border-accent-content"
                        required
                     />
                  </div>
                  <div className="w-1/2">
                     <label htmlFor="surname" className="text-base-content block">
                        <small>Cognome</small>
                     </label>
                     <input
                        id="surname"
                        type="text"
                        name="surname"
                        className="mt-1 mb-3 p-2 w-full border-2 border-accent focus:outline-none focus:rounded-0 focus:border-accent-content"
                        required
                     />
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
                     className="mt-1 mb-3 p-2 w-full border-2 border-accent focus:outline-none focus:rounded-0 focus:border-accent-content"
                     required
                  />
               </div>

               <div>
                  <label htmlFor="message" className="text-base-content block">
                     <small>Il tuo messaggio</small>
                  </label>
                  <textarea
                     id="message"
                     name="message"
                     className="mt-1 mb-3 p-2 w-full border-2 border-accent focus:outline-none focus:rounded-0 focus:border-accent-content"
                     rows="4"
                     required
                  />
               </div>
               <div className="flex justify-between">
                  {result && <span className="block mt-2 text-base-content">{result}</span>}
                  <div />
                  <button type="submit" className="bg-accent py-1.5 px-5 rounded-full text-white hover:opacity-80 transition-opacity duration-100 cursor-pointer">Invia</button>
               </div>
            </form>
         </div>
      </div>
   );
};