export { emptyBlocks } from './examples/empty';
export {
  circoloPopolareBlocks,
  circoloPopolareContext,
  circoloPopolareCta,
  circoloPopolareFooter,
  circoloPopolareGallery,
  circoloPopolareHero,
  circoloPopolareInfo,
  circoloPopolareLocation,
  circoloPopolareReviews,
  circoloPopolareServices,
} from './examples/circolo-popolare';
export { claudeStyles, buildRootStyles } from './styles';
export { slugify, slugifyInput } from './core/utils';
export { renderTemplate, renderServicePage } from './render';
export { renderSitemap, renderRobots } from './seo';
export { buildSiteFiles, type SiteFile } from './files';
export { migrateBlocks } from './migrations';
export { HomepageBody } from './homepage-body';
export {
  type TemplateData,
  blocksSchema,
  stylesSchema,
  BUSINESS_TYPES,
  WEEKDAYS,
  type Address,
  type Geo,
  type OpeningHours,
  type Weekday,
  type Blocks,
  type Homepage,
  type ServicePage,
  type Styles,
  type HeroBlock,
  type StatsBlock,
  type InfoBlock,
  type CtaBlock,
  type GalleryBlock,
  type ReviewsBlock,
  type ServicesBlock,
  type LocationBlock,
  type FooterBlock,
} from './types';
