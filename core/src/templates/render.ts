import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { ServicePageTemplate, Template } from './template';
import type { ServicePage, TemplateData } from './types';

export function renderTemplate(data: TemplateData): string {
  return '<!DOCTYPE html>' + renderToStaticMarkup(createElement(Template, { data }));
}

export function renderServicePage(data: TemplateData, page: ServicePage): string {
  return '<!DOCTYPE html>' + renderToStaticMarkup(createElement(ServicePageTemplate, { data, page }));
}
