async function fetchHeroImageUrl(apiUrl) {
   const res = await fetch(`${apiUrl}/api/homepage-hero?limit=1&depth=1`);
   const data = await res.json();
   const image = data?.docs?.[0]?.image;
   return typeof image === 'object' ? image?.url : image;
}

export default function heroSchemaPlugin() {
   return {
      name: 'hero-schema-inject',
      apply: 'build',
      async transformIndexHtml(html) {
         const apiUrl = process.env.VITE_PAYLOAD_API_URL;
         const imageUrl = await fetchHeroImageUrl(apiUrl);

         if (!imageUrl) return html;

         return html.replace(
            /"image":\s*"https:\/\/r2images\.narunaga\.workers\.dev\/[^"]*"/,
            `"image": "${imageUrl}"`
         );
      }
   };
}