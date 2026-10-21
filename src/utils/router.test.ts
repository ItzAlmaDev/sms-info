import { describe, expect, it } from 'vitest';
import { normalizePath, routesMeta } from './router';

describe('normalizePath', () => {
  it('adds a trailing slash to known routes', () => {
    expect(normalizePath('/services')).toBe('/services/');
  });

  it('ignores query strings and hashes when resolving a route', () => {
    expect(normalizePath('/contact?from=home#form')).toBe('/contact/');
  });

  it('maps unknown paths to the not-found route', () => {
    expect(normalizePath('/does-not-exist')).toBe('/404/');
  });

  it('resolves an empty path to the home route', () => {
    expect(normalizePath('')).toBe('/');
  });

  it('normalises known routes that already end with a slash', () => {
    expect(normalizePath('/awareness-events/')).toBe('/awareness-events/');
  });

  it('declares metadata and a canonical URL for every route', () => {
    for (const [path, meta] of Object.entries(routesMeta)) {
      expect(path.endsWith('/')).toBe(true);
      expect(meta.title.length).toBeGreaterThan(0);
      expect(meta.description.length).toBeGreaterThan(0);
      expect(meta.canonical.startsWith('https://safetymanagementsolutions.in/')).toBe(true);
    }
  });
});
