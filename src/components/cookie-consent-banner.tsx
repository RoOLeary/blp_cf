'use client';

import React from "react";
import CookieConsent from "react-cookie-consent";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

interface CookieConsentBannerProps {
  onAccept?: () => void;
  onDecline?: () => void;
}

const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({
  onAccept,
  onDecline,
}) => {
  const t = useTranslations("cookies");

  const handleAccept = () => {
    // Add functionality when user accepts cookies
    console.log("Cookies accepted");
    onAccept?.();
  };

  const handleDecline = () => {
    // Add functionality when user declines cookies
    console.log("Cookies declined");
    onDecline?.();
  };

  return (
    <CookieConsent
      location="bottom"
      buttonText={t("accept")}
      declineButtonText={t("decline")}
      enableDeclineButton
      cookieName="BusyLittlePixelsEUCookieConsent"
      disableStyles
      containerClasses="fixed inset-x-0 bottom-0 z-50 flex flex-col gap-4 border-t-4 border-red-600 bg-black px-4 py-6 text-sm text-white md:flex-row md:items-center md:justify-between md:px-8 print:hidden"
      contentClasses="max-w-3xl text-white/85"
      buttonWrapperClasses="flex shrink-0 gap-3"
      buttonClasses="bg-red-600 px-5 py-2.5 text-xs font-bold tracking-widest uppercase transition-colors hover:bg-white hover:text-black"
      declineButtonClasses="border border-white/40 px-5 py-2.5 text-xs font-bold tracking-widest uppercase transition-colors hover:border-white"
      expires={365}
      onAccept={handleAccept}
      onDecline={handleDecline}
      flipButtons
    >
      {t.rich("message", {
        link: (chunks) => (
          <Link href="/privacy-policy" className="text-white underline underline-offset-4 hover:text-red-600">
            {chunks}
          </Link>
        ),
      })}
    </CookieConsent>
  );
};

export default CookieConsentBanner;