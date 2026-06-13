import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Template } from './template';
import type { TemplateData } from './types';

export function renderTemplate(data: TemplateData): string {
  return '<!DOCTYPE html>' + renderToStaticMarkup(createElement(Template, { data }));
}
