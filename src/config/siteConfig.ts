/**
 * Safety Management Solutions (SMS)
 * Central Configuration
 * 
 * Replace placeholders below with production configuration values.
 */

export const siteConfig = {
  // This key is included in the client bundle; configure provider-side restrictions and abuse controls.
  // Set VITE_WEB3FORMS_ACCESS_KEY in the deployment environment or local .env file.
  web3FormsAccessKey: (import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string) || 'YOUR_WEB3FORMS_ACCESS_KEY_HERE',
  
  // Endpoint URL for contact form submissions:
  formEndpoint: 'https://api.web3forms.com/submit',

  // Company Contact Details (Master Reference)
  contact: {
    phone: '+91 9334701135',
    phoneRaw: '+919334701135',
    whatsAppUrl: 'https://wa.me/919334701135',
    email: 'Info@safetymanagementsolutions.in',
    website: 'safetymanagementsolutions.in',
    address: 'Main Road, opposite Capitol Hill, Walking Street, 4th Floor, Ranchi, Jharkhand 834001',
    director: 'Sabir Hussain',
    tagline: 'Safety starts with you.',
  },
};
