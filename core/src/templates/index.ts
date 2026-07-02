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
export { renderTemplate } from './render';
export { migrateBlocks, CURRENT_SCHEMA_VERSION } from './migrations';
export { TemplateBody } from './template';
export {
  type TemplateData,
  blocksSchema,
  stylesSchema,
  type Blocks,
  type Homepage,
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
