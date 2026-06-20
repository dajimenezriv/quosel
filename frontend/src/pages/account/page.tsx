import { useCheckout } from '@/api/billing/use-checkout';
import { usePortal } from '@/api/billing/use-portal';
import { BaseLayout } from '@/components/layouts/base-layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useAuth } from '@/old/auth';
import { isSubscribed } from '@/old/billing';
import { Check, User } from 'lucide-react';
import { useState } from 'react';

const plansData = [
  {
    id: 'free',
    name: 'Free',
    description: 'Everything you need to build and publish one site',
    price: '€0',
    frequency: '/month',
    features: ['1 website', 'Visual editor', 'Client preview links', 'One-click publishing', 'Image uploads', 'AI text generation'],
  },
  {
    id: 'freelancer',
    name: 'Freelancer',
    description: 'For freelancers managing multiple client sites',
    price: '€19.99',
    frequency: '/month',
    features: ['Everything in Free', 'Up to 10 websites', 'Custom domain (In progress)', 'Export to HTML'],
    popular: true,
  },
] as const;

type Plan = (typeof plansData)[number];

export default function Page() {
  const { user } = useAuth();
  const checkout = useCheckout();
  const portal = usePortal();

  const currentPlanId = isSubscribed(user?.subscriptionStatus ?? null) ? 'freelancer' : 'free';
  const busy = checkout.isPending || portal.isPending;

  return (
    <BaseLayout title="Account">
      <div className="flex flex-1 flex-col items-center gap-10 p-6">
        <UserHeader picture={user?.picture ?? null} email={user?.email} name={user?.name ?? null} />

        <div className="flex flex-row flex-wrap justify-center gap-6">
          {plansData.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              current={plan.id === currentPlanId}
              onUpgrade={() => checkout.mutate()}
              onManage={() => portal.mutate()}
              busy={busy}
            />
          ))}
        </div>
      </div>
    </BaseLayout>
  );
}

function UserHeader({ picture, email, name }: { picture: string | null; email?: string; name: string | null }) {
  const [error, setError] = useState(false);

  return (
    <div className="flex flex-col items-center gap-2">
      {picture && !error ? (
        <img src={picture} alt="User" className="size-24 rounded-full" onError={() => setError(true)} />
      ) : (
        <div className="bg-muted flex size-24 items-center justify-center rounded-full">
          <User className="size-10" />
        </div>
      )}
      <span className="text-muted-foreground text-sm">{email}</span>
      <span className="text-lg font-semibold">{name}</span>
    </div>
  );
}

interface PlanCardProps {
  plan: Plan;
  current: boolean;
  onUpgrade: () => void;
  onManage: () => void;
  busy: boolean;
}

function PlanCard({ plan, current, onUpgrade, onManage, busy }: PlanCardProps) {
  function getButton() {
    if (plan.id === 'freelancer') {
      if (current) {
        return (
          <Button variant="outline" className="w-full cursor-pointer" onClick={onManage} disabled={busy}>
            Manage billing
          </Button>
        );
      } else {
        return (
          <Button className="w-full cursor-pointer" onClick={onUpgrade} disabled={busy}>
            Upgrade
          </Button>
        );
      }
    } else {
      if (current) return null;

      return (
        <Button variant="outline" className="w-full cursor-pointer" onClick={onManage} disabled={busy}>
          Downgrade
        </Button>
      );
    }
  }

  const button = getButton();

  return (
    <Card className={cn('flex w-72 flex-col', { 'border-primary': current })}>
      <CardHeader className="flex flex-col items-center gap-2 text-center">
        <CardTitle className="text-xl">{plan.name}</CardTitle>
        {current && <Badge variant="secondary">Current plan</Badge>}
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold">{plan.price}</span>
          <span className="text-muted-foreground text-sm">{plan.frequency}</span>
        </div>
        <p className="text-muted-foreground text-sm">{plan.description}</p>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-2">
        {plan.features.map((feature) => (
          <div key={feature} className="flex items-center gap-2">
            <Check className="text-primary size-4" />
            <span className="text-sm">{feature}</span>
          </div>
        ))}
      </CardContent>
      {button && <CardFooter>{button}</CardFooter>}
    </Card>
  );
}
