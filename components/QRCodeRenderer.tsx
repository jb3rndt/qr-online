"use client";

import { useEffect, useRef, useState } from "react";
import QRCodeStyling, { Options } from "qr-code-styling";

export function QRCodeRenderer({ options }: { options: Partial<Options> }) {
  const ref = useRef<HTMLDivElement>(null);
  const [qrCode, setQrCode] = useState<QRCodeStyling>();
  const [prevOptions, setPrevOptions] = useState<Partial<Options>>(options);

  if (typeof window !== "undefined" && !qrCode) {
    setQrCode(new QRCodeStyling(options));
  }

  if (prevOptions !== options) {
    setPrevOptions(options);
    qrCode?.update(options);
  }

  useEffect(() => {
    if (ref.current) {
      qrCode?.append(ref.current);
    }
  }, [qrCode, ref]);

  return <div ref={ref} />;
}
