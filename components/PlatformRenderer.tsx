"use client";

import { Platform } from "@/lib/types";
import { getPlatform } from "@/lib/utils";

export default function PlatformRenderer({
  children,
}: {
  children:
    | React.ReactNode
    | React.ReactNode[]
    | (({
        platform,
      }: {
        platform: Platform;
      }) => React.ReactNode | React.ReactNode[]);
}) {
  const platform = getPlatform(navigator.userAgent);

  if (typeof children === "function") {
    return children({ platform });
  }

  return children;
}
