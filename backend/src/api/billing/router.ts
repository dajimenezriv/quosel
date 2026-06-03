import { createRouter } from '@/core/api/create-router';
import type { AuthVariables } from '@/core/api/middleware/auth';
import { checkout, checkoutRoute } from './checkout';
import { portal, portalRoute } from './portal';
import { webhooksStripe, webhooksStripeRoute } from './webhooks';

export const billingRouter = createRouter<{ Variables: AuthVariables }>();

billingRouter.openapi(portalRoute, portal);
billingRouter.openapi(checkoutRoute, checkout);
billingRouter.openapi(webhooksStripeRoute, webhooksStripe);
