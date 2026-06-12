import posthog from 'posthog-js';
import { useEffect, useState } from 'react';
import { loginWithGoogle, useAuth } from './auth';
import { isSubscribed, openPortal, startCheckout } from './billing';

function getBillingReturn(): 'success' | 'cancel' | null {
  const billing = new URLSearchParams(window.location.search).get('billing');
  return billing === 'success' || billing === 'cancel' ? billing : null;
}

function useBillingReturn(onReturn: () => void) {
  const [banner, setBanner] = useState(getBillingReturn);

  useEffect(() => {
    const billing = getBillingReturn();
    if (!billing) return;

    window.history.replaceState({}, '', window.location.pathname);
    posthog.capture(billing === 'success' ? 'checkout_completed' : 'checkout_canceled');
    if (billing === 'success') onReturn();
  }, [onReturn]);

  return { banner, dismiss: () => setBanner(null) };
}

export function Login() {
  const { user, loading, logout, refresh } = useAuth();
  const { banner, dismiss } = useBillingReturn(refresh);
  const [billingLoading, setBillingLoading] = useState(false);

  const handleSubscribe = async () => {
    setBillingLoading(true);
    try {
      await startCheckout();
    } catch (err) {
      console.error(err);
      setBillingLoading(false);
    }
  };

  const handlePortal = async () => {
    setBillingLoading(true);
    try {
      await openPortal();
    } catch (err) {
      console.error(err);
      setBillingLoading(false);
    }
  };

  return (
    <div>
      {banner === 'success' && (
        <p style={{ color: 'green' }}>
          Subscription active. <button onClick={dismiss}>×</button>
        </p>
      )}
      {banner === 'cancel' && (
        <p style={{ color: 'orange' }}>
          Checkout canceled. <button onClick={dismiss}>×</button>
        </p>
      )}
      {loading ? (
        <p>Loading…</p>
      ) : user ? (
        <>
          <p>
            Signed in as <strong>{user.email}</strong>
          </p>
          {isSubscribed(user.subscriptionStatus) ? (
            <>
              <p>
                Plan: <strong>{user.subscriptionStatus}</strong>
                {user.currentPeriodEnd && <> · renews {new Date(user.currentPeriodEnd).toLocaleDateString()}</>}
              </p>
              <button type="button" className="counter" onClick={handlePortal} disabled={billingLoading}>
                Manage subscription
              </button>
            </>
          ) : (
            <button type="button" className="counter" onClick={handleSubscribe} disabled={billingLoading}>
              Subscribe €5/mo · 7-day trial
            </button>
          )}
          <button type="button" className="counter" onClick={logout}>
            Logout
          </button>
        </>
      ) : (
        <button type="button" className="counter" onClick={loginWithGoogle}>
          Login with Google
        </button>
      )}
    </div>
  );
}
