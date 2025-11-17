"use client";

import * as SeparatorPrimitive from "@radix-ui/react-separator";
import * as React from "react";

import { cn } from "@/lib/utils";

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: Omit<React.ComponentProps<typeof SeparatorPrimitive.Root>, "orientation"> & {
  orientation?: "horizontal" | "vertical" | "responsive-xs" | null;
}) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation === "horizontal" ? "horizontal" : "vertical"}
      className={cn(
        "bg-border shrink-0",
        orientation === "responsive-xs"
          ? "xs:w-px xs:h-auto max-xs:h-px max-xs:w-full"
          : "data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px data-[orientation=vertical]:h-auto",
        className
      )}
      {...props}
    />
  );
}

export { Separator };
