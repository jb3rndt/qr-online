"use client";

import { DEFAULT_DATA_STRING } from "@/lib/constants";
import { cn } from "@/lib/utils";
import QRCodeStyling, { FileExtension, Options } from "qr-code-styling";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { QRCodeDownloadButton } from "./QRCodeDownloadButton";
import { Card, CardContent } from "./ui/card";

export function QRCodeRenderer({
  options,
  className,
}: {
  options: Partial<Options>;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [qrCode, setQrCode] = useState<QRCodeStyling>();
  const [prevOptions, setPrevOptions] = useState<Partial<Options>>(options);
  const optionsWithDefaults: Options = {
    ...options,
    data: options.data || DEFAULT_DATA_STRING,
    imageOptions: {
      ...options.imageOptions,
      margin: options.imageOptions?.margin ?? 0,
    },
  };

  if (typeof window !== "undefined" && !qrCode) {
    setQrCode(new QRCodeStyling(optionsWithDefaults));
  }

  if (prevOptions !== options) {
    setPrevOptions(options);
    qrCode?.update(optionsWithDefaults);
  }

  const downloadQrCode = useCallback(
    (ext: FileExtension) => {
      if (!qrCode?._qr) {
        toast.warning(
          "Please enter data to generate the QR code before downloading."
        );
        return;
      }
      qrCode?.download({ extension: ext });
    },
    [qrCode]
  );

  useEffect(() => {
    if (ref.current) {
      qrCode?.append(ref.current);
    }
  }, [qrCode, ref]);

  return (
    <Card className={cn("max-md:p-2 max-md:w-full", className)}>
      <CardContent className="md:gap-6 gap-2 flex md:flex-col items-center max-md:p-0 max-md:justify-between">
        <div className="p-4 bg-accent inset-shadow-sm rounded-md">
          <div className="aspect-square flex items-center justify-center md:size-[300px] size-20">
            <div
              ref={ref}
              className={cn(
                !options.data && "[&_svg]:opacity-50",
                "[&_svg]:h-full md:[&_svg]:max-w-[300px] [&_svg]:max-w-20 child-checkered-background"
              )}
            />
          </div>
        </div>
        <QRCodeDownloadButton
          className="max-xs:w-full md:w-full"
          orientation="responsive-xs"
          onDownload={downloadQrCode}
          disabled={!options.data}
        />
      </CardContent>
    </Card>
  );
}
