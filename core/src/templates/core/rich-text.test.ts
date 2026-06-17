import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { RichText } from './rich-text';

function render(text: string): string {
  return renderToStaticMarkup(createElement(RichText, { text }));
}

describe('rich-text', () => {
  it('renders plain text unchanged', () => {
    expect(render('hello world')).toBe('hello world');
  });

  it('renders *...* as bold', () => {
    expect(render('a *bold* b')).toBe('a <strong class="font-bold">bold</strong> b');
  });

  it('renders _..._ as italic', () => {
    expect(render('a _italic_ b')).toBe('a <em class="italic">italic</em> b');
  });

  it('renders ~...~ as primary-colored text', () => {
    expect(render('a ~highlight~ b')).toBe('a <span class="text-primary">highlight</span> b');
  });

  it('renders multiple marks in one line', () => {
    expect(render('*x* _y_ ~z~')).toBe(
      '<strong class="font-bold">x</strong> <em class="italic">y</em> <span class="text-primary">z</span>',
    );
  });

  it('renders nested marks', () => {
    expect(render('*_bold italic_*')).toBe('<strong class="font-bold"><em class="italic">bold italic</em></strong>');
  });

  it('treats an unmatched mark character as plain text', () => {
    expect(render('a * b')).toBe('a * b');
  });

  it('splits newlines into <br/> separated lines', () => {
    expect(render('first\nsecond')).toBe('first<br/>second');
  });

  it('does not prepend <br/> before the first line', () => {
    expect(render('only')).toBe('only');
  });

  it('applies marks within individual lines', () => {
    expect(render('*a*\n_b_')).toBe('<strong class="font-bold">a</strong><br/><em class="italic">b</em>');
  });

  it('lets a mark span a newline, keeping nested marks inside', () => {
    expect(render('_Detail is\n~everything~_')).toBe('<em class="italic">Detail is<br/><span class="text-primary">everything</span></em>');
  });
});
