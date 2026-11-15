import { ViewTransition, type ReactNode } from "react";

const directional = {
  "nav-forward": "nav-forward",
  "nav-back": "nav-back",
  default: "none",
};

export function navTransition(href: string) {
  return href.startsWith("/hire-me") ? ["nav-forward"] : ["nav-back"];
}

export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter={directional} exit={directional} default="none">
      {children}
    </ViewTransition>
  );
}
