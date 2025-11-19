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
  ref,
  shrinked,
}: {
  options: Partial<Options>;
  className?: string;
  ref?: React.RefObject<HTMLDivElement | null>;
  shrinked?: boolean;
}) {
  const qrCodeRef = useRef<HTMLDivElement>(null);
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
    if (qrCodeRef.current) {
      qrCode?.append(qrCodeRef.current);
    }
  }, [qrCode, qrCodeRef]);

  return (
    <Card
      className={cn(
        "data-[shrinked=true]:w-full data-[shrinked=true]:rounded-none group data-[shrinked=true]:backdrop-blur-md data-[shrinked=true]:bg-background/80",
        className
      )}
      ref={ref}
      data-shrinked={shrinked}
    >
      <CardContent
        className={cn(
          "gap-6 group-data-[shrinked=true]:gap-2 flex not-group-data-[shrinked=true]:flex-col items-center group-data-[shrinked=true]:justify-center"
        )}
      >
        <div className="p-4 bg-accent inset-shadow-sm rounded-md">
          <div className="aspect-square flex items-center justify-center xs:size-[300px] size-[200px] group-data-[shrinked=true]:size-20">
            <div
              ref={qrCodeRef}
              className={cn(
                !options.data && "[&_canvas]:opacity-50",
                "child-checkered-background flex items-center justify-center w-full h-full",
                "[&_canvas]:max-w-full [&_canvas]:max-h-full [&_canvas]:mx-auto"
              )}
            />
          </div>
        </div>
        <QRCodeDownloadButton
          className="max-xs:w-full group-not-data-shrinked:w-full"
          orientation="responsive-xs"
          onDownload={downloadQrCode}
          disabled={!options.data}
        />
      </CardContent>
    </Card>
  );
}
