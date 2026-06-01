import { slugify } from './utils.ts';

describe('utils', () => {
  describe('slugify', () => {
    it('lowercases the text', () => {
      expect(slugify('Hello World')).toBe('hello-world');
    });

    it('replaces spaces with hyphens', () => {
      expect(slugify('the golden spoon')).toBe('the-golden-spoon');
    });

    it('strips diacritics', () => {
      expect(slugify('Café René')).toBe('cafe-rene');
    });

    it('collapses multiple non-alphanumeric characters into a single hyphen', () => {
      expect(slugify('hello   world')).toBe('hello-world');
    });

    it('trims leading and trailing hyphens', () => {
      expect(slugify('  hello  ')).toBe('hello');
    });

    it('removes special characters', () => {
      expect(slugify("Bob's Diner & Grill!")).toBe('bob-s-diner-grill');
    });
  });
});
