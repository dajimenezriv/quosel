import { useEffect, useState } from "react";
import posthog from "posthog-js";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import { useAuth } from "./lib/auth";
import { startCheckout, openPortal, isSubscribed } from "./lib/billing";

function useBillingReturn(onReturn: () => void) {
  const [banner, setBanner] = useState<"success" | "cancel" | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const billing = params.get("billing");
    if (billing === "success" || billing === "cancel") {
      setBanner(billing);
      window.history.replaceState({}, "", window.location.pathname);
      posthog.capture(
        billing === "success" ? "checkout_completed" : "checkout_canceled",
      );
      if (billing === "success") onReturn();
    }
  }, [onReturn]);

  return { banner, dismiss: () => setBanner(null) };
}

function App() {
  const { user, loading, login, logout, refresh } = useAuth();
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
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started2</h1>
          {banner === "success" && (
            <p style={{ color: "green" }}>
              Subscription active. <button onClick={dismiss}>×</button>
            </p>
          )}
          {banner === "cancel" && (
            <p style={{ color: "orange" }}>
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
                    {user.currentPeriodEnd && (
                      <>
                        {" "}
                        · renews{" "}
                        {new Date(user.currentPeriodEnd).toLocaleDateString()}
                      </>
                    )}
                  </p>
                  <button
                    type="button"
                    className="counter"
                    onClick={handlePortal}
                    disabled={billingLoading}
                  >
                    Manage subscription
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  className="counter"
                  onClick={handleSubscribe}
                  disabled={billingLoading}
                >
                  Subscribe €5/mo · 7-day trial
                </button>
              )}
              <button type="button" className="counter" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <button type="button" className="counter" onClick={login}>
              Login with Google
            </button>
          )}
        </div>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  );
}

export default App;
