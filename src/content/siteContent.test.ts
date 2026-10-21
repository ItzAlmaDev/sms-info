import { describe, expect, it } from 'vitest';
import { siteContent } from './siteContent';

/**
 * These tests protect the editorial boundary documented at the top of
 * siteContent.ts. They are intentionally simple so they fail loudly when a
 * forbidden claim is reintroduced anywhere in the content model.
 */
describe('site content editorial rules', () => {
  const serialized = JSON.stringify(siteContent);

  const forbiddenClaims = [
    /refilling/i,
    /hydrostatic/i,
    /live fire/i,
    /safety engineers/i,
    /stretcher/i,
    /eyewash/i,
  ];

  it.each(forbiddenClaims)('does not contain %s', (pattern) => {
    expect(serialized).not.toMatch(pattern);
  });

  it('keeps the contact form service list aligned with the consolidated services', () => {
    const serviceTitles = siteContent.consolidatedServices.map((service) => service.title);
    const expected = [...serviceTitles, 'General Facility Consultation'];

    expect(new Set(siteContent.contactPage.servicesList)).toEqual(new Set(expected));
  });
});
