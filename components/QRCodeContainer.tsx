"use client";

import { DEFAULT_QR_CODE_OPTIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";
import { QRCodeConfigurator } from "./QRCodeConfigurator";
import { QRCodeRenderer } from "./QRCodeRenderer";

const NAV_HEIGHT = 64;
const SWITCH_THRESHOLD = 114;

export function QRCodeContainer() {
  const [options, setOptions] = useState(DEFAULT_QR_CODE_OPTIONS);
  const [shrinkRenderer, setShrinkRenderer] = useState(false);
  const qrCodeCardRef = useRef<HTMLDivElement>(null);
  const qrCodePlaceholderRef = useRef<HTMLDivElement>(null);

  const onScroll = useCallback(() => {
    if (qrCodePlaceholderRef.current && window.innerWidth > 1024) {
      setShrinkRenderer(false);
      return;
    }
    if (qrCodePlaceholderRef.current) {
      // Calculate distance to viewport top
      const rect = qrCodePlaceholderRef.current.getBoundingClientRect();

      const remaining = rect.bottom - NAV_HEIGHT;
      if (remaining <= SWITCH_THRESHOLD && !shrinkRenderer)
        setShrinkRenderer(true);
      else if (remaining > SWITCH_THRESHOLD && shrinkRenderer)
        setShrinkRenderer(false);
    }
  }, [shrinkRenderer]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    onScroll();
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [onScroll]);

  const onResize = useCallback(() => {
    if (qrCodeCardRef.current && !shrinkRenderer) {
      document.body.style.setProperty(
        "--qr-height",
        `${qrCodeCardRef.current.offsetHeight}px`
      );
    }
  }, [shrinkRenderer]);

  useEffect(() => {
    onResize();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [onResize]);

  return (
    <div className="flex flex-col max-lg:flex-col-reverse lg:flex-row gap-10 max-lg:items-center lg:items-start justify-center xs:py-10 py-6 relative">
      <QRCodeConfigurator
        config={options}
        onConfigChange={setOptions}
        className="px-4"
      />
      <div
        className={cn(
          "sticky flex flex-col justify-end lg:top-[calc(var(--nav-height)+2.5rem)] top-[calc(var(--nav-height)-var(--qr-height)+var(--switch-threshold))] h-(--qr-height)",
          shrinkRenderer && "w-full"
        )}
        ref={qrCodePlaceholderRef}
        style={
          {
            "--switch-threshold": `${SWITCH_THRESHOLD}px`,
          } as React.CSSProperties
        }
      >
        <QRCodeRenderer
          ref={qrCodeCardRef}
          options={options}
          shrinked={shrinkRenderer}
        />
      </div>
    </div>
  );
}
