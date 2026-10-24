import { describe, expect, it } from 'vitest';
import { normalizePath } from './router';

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
});
