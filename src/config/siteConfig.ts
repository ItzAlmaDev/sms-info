/**
 * Safety Management Solutions (SMS)
 * Central Configuration
 * 
 * Replace placeholders below with your production API keys.
 */

export const siteConfig = {
  // [PLACEHOLDER: Replace with your Web3Forms access key or Formspree endpoint]
  // Web3Forms: Sign up free at https://web3forms.com and paste your Access Key here or set VITE_WEB3FORMS_ACCESS_KEY in .env
  // Formspree: Create a form at https://formspree.io and paste your Form ID / URL.
  web3FormsAccessKey: (import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string) || 'YOUR_WEB3FORMS_ACCESS_KEY_HERE',
  
  // Endpoint URL for contact form submissions:
  formEndpoint: 'https://api.web3forms.com/submit',

  // [PLACEHOLDER: Google Analytics 4 Measurement ID (e.g. 'G-XXXXXXXXXX')]
  // Leave empty if analytics are not active.
  googleAnalyticsId: '',

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
