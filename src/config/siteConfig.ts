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
};
