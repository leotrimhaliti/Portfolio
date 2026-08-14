"use client";

import { Button } from "@/components/ui/Button";
import { Cookie } from "lucide-react";
import Link from "next/link";
import { useSyncExternalStore } from "react";

const consentCookieName = "leotrim_cookie_consent";
const consentMaxAge = 60 * 60 * 24 * 180;
const consentEventName = "leotrim-cookie-consent";

function subscribeToConsentChange(onStoreChange: () => void) {
  window.addEventListener(consentEventName, onStoreChange);
  return () => window.removeEventListener(consentEventName, onStoreChange);
}

function getConsentCookie() {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${consentCookieName}=`));
}

function setConsentCookie(value: "accepted" | "essential") {
  document.cookie = `${consentCookieName}=${value}; Max-Age=${consentMaxAge}; Path=/; SameSite=Lax`;
}

export default function CookieConsent() {
  const hasConsent = useSyncExternalStore(
    subscribeToConsentChange,
    () => Boolean(getConsentCookie()),
    () => true,
  );

  const saveChoice = (value: "accepted" | "essential") => {
    setConsentCookie(value);
    window.dispatchEvent(new Event(consentEventName));
  };

  if (hasConsent) return null;

  return (
    <aside className="fixed inset-x-4 bottom-4 z-50 rounded-lg border bg-background/95 p-4 shadow-lg backdrop-blur sm:left-6 sm:right-auto sm:max-w-sm">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 rounded-md border bg-muted p-2">
          <Cookie className="size-4" />
        </div>
        <div className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-sm font-semibold">Cookie preferences</h2>
            <p className="text-xs leading-relaxed text-muted-foreground">
              I use essential cookies to remember your choice. No ad tracking or
              third-party marketing cookies.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button size="sm" onClick={() => saveChoice("accepted")}>
              Accept
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => saveChoice("essential")}
            >
              Essential only
            </Button>
            <Link href="/privacy" className="link text-xs font-medium">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
