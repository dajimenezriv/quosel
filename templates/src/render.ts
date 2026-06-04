import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Template } from "./template";
import type { WebsiteData } from "./types";

export function renderTemplate(data: WebsiteData): string {
  return (
    "<!DOCTYPE html>" + renderToStaticMarkup(createElement(Template, { data }))
  );
}
