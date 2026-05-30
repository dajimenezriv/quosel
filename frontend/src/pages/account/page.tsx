import { BaseLayout } from '@/components/layouts/base-layout';
import { PricingPlans } from '@/components/pricing-plans';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BillingHistoryCard } from './components/billing-history-card';
import { CurrentPlanCard } from './components/current-plan-card';
import billingHistoryData from './data/billing-history.json';
import currentPlanData from './data/current-plan.json';

export default function Page() {
  const handlePlanSelect = (planId: string) => {
    console.log('Plan selected:', planId);
    // Handle plan selection logic here
  };

  return (
    <BaseLayout title="Account Settings">
      <div className="space-y-6 px-4 lg:px-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <CurrentPlanCard plan={currentPlanData} />
          <BillingHistoryCard history={billingHistoryData} />
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Available Plans</CardTitle>
              <CardDescription>Choose a plan that works best for you.</CardDescription>
            </CardHeader>
            <CardContent>
              <PricingPlans mode="billing" currentPlanId="professional" onPlanSelect={handlePlanSelect} />
            </CardContent>
          </Card>
        </div>
      </div>
    </BaseLayout>
  );
}
