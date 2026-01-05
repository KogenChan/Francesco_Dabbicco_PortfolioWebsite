const SITE_URL = "https://francescodabbiccoart.com";

const canonicalMap = {
   "/": `${SITE_URL}/`,
   "/about": `${SITE_URL}/about`,
   "/opere": `${SITE_URL}/opere`,
   "/opere/:itemName": `${SITE_URL}/opere/`,
   "/installazioni": `${SITE_URL}/installazioni`,
   "/installazioni/:itemName": `${SITE_URL}/installazioni/`,
   "/contatti": `${SITE_URL}/contatti`
};

export default canonicalMap;
