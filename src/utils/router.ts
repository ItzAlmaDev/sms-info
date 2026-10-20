/**
 * Route path definitions and helper utilities for SMS
 */

export type AppRoute = 
  | '/'
  | '/services/'
  | '/evacuation-planning/'
  | '/safety-equipment/'
  | '/awareness-events/'
  | '/about/'
  | '/contact/'
  | '/privacy/'
  | '/terms/'
  | '/404/';

export interface RouteMeta {
  path: AppRoute;
  title: string;
  description: string;
  canonical: string;
}

export const routesMeta: Record<string, RouteMeta> = {
  '/': {
    path: '/',
    title: 'Safety Management Solutions (SMS) | Workplace & Community Safety in Ranchi',
    description: 'Practical workplace and community safety in Ranchi, Jharkhand: emergency evacuation planning, safety awareness posters, equipment management, and site walkthroughs.',
    canonical: 'https://safetymanagementsolutions.in/',
  },
  '/services/': {
    path: '/services/',
    title: 'Safety Consulting & Services | Safety Management Solutions Ranchi',
    description: 'Explore practical safety services by SMS in Ranchi: safety awareness programs, floor-plan evacuation mapping, basic safety equipment supply, and risk walkthroughs.',
    canonical: 'https://safetymanagementsolutions.in/services/',
  },
  '/evacuation-planning/': {
    path: '/evacuation-planning/',
    title: 'Emergency Escape Route Planning & Evacuation Maps | SMS Ranchi',
    description: 'Floor-plan based evacuation diagrams, emergency exit signage layouts, assembly point designation, and practical drill guidance for buildings in Jharkhand.',
    canonical: 'https://safetymanagementsolutions.in/evacuation-planning/',
  },
  '/safety-equipment/': {
    path: '/safety-equipment/',
    title: 'Safety Equipment Supply & Ongoing Upkeep | SMS Ranchi',
    description: 'Fire extinguishers (ABC & CO2), industrial first-aid stations, PPE gear, glow-in-the-dark signage, and emergency lighting supply and inspection in Ranchi.',
    canonical: 'https://safetymanagementsolutions.in/safety-equipment/',
  },
  '/awareness-events/': {
    path: '/awareness-events/',
    title: 'Safety Awareness Posters & Training Workshops | SMS Ranchi',
    description: 'High-contrast bilingual safety posters (Hindi & English), emergency workshops, hands-on extinguisher demos, and school disaster readiness drills.',
    canonical: 'https://safetymanagementsolutions.in/awareness-events/',
  },
  '/about/': {
    path: '/about/',
    title: 'About SMS | Safety Management Solutions, Walking Street, Ranchi',
    description: 'Learn about Safety Management Solutions, Director Sabir Hussain, our mission to advance everyday safety in Eastern India, and the meaning of the SMS logo.',
    canonical: 'https://safetymanagementsolutions.in/about/',
  },
  '/contact/': {
    path: '/contact/',
    title: 'Contact SMS | Request a Consultation or Quote | Ranchi, Jharkhand',
    description: 'Contact Safety Management Solutions at Main Road, Walking Street, Ranchi. Call +91 9334701135 or message on WhatsApp for rapid safety consultation.',
    canonical: 'https://safetymanagementsolutions.in/contact/',
  },
  '/privacy/': {
    path: '/privacy/',
    title: 'Privacy Policy (Draft) | Safety Management Solutions',
    description: 'Privacy Policy draft for Safety Management Solutions. How we handle client inquiries and safeguard communication data.',
    canonical: 'https://safetymanagementsolutions.in/privacy/',
  },
  '/terms/': {
    path: '/terms/',
    title: 'Terms of Service (Draft) | Safety Management Solutions',
    description: 'Terms of Service draft for Safety Management Solutions workplace safety advisory and equipment supply services in India.',
    canonical: 'https://safetymanagementsolutions.in/terms/',
  },
  '/404/': {
    path: '/404/',
    title: '404 - Page Not Found | Safety Management Solutions',
    description: 'The requested safety page could not be located.',
    canonical: 'https://safetymanagementsolutions.in/404/',
  },
};

/**
 * Normalizes browser pathnames (e.g. '/services' -> '/services/')
 */
export function normalizePath(path: string): AppRoute {
  let cleaned = path;
  if (typeof window !== 'undefined' && window.location.search.startsWith('?/')) {
    const redirectPath = '/' + window.location.search.slice(2).split('&')[0].replace(/~and~/g, '&');
    cleaned = redirectPath;
    if (window.history && window.history.replaceState) {
      window.history.replaceState(null, '', redirectPath);
    }
  } else {
    cleaned = path.split('?')[0].split('#')[0];
  }
  if (!cleaned.endsWith('/')) {
    cleaned = cleaned + '/';
  }
  if (routesMeta[cleaned]) {
    return cleaned as AppRoute;
  }
  // Check if root
  if (cleaned === '//' || cleaned === '') return '/';
  // Route not recognized: return 404 route so NotFoundPage is rendered
  return '/404/';
}
