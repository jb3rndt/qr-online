"use client";

import { DEFAULT_DATA_STRING } from "@/lib/constants";
import { Platform } from "@/lib/types";
import { cn, getPlatform } from "@/lib/utils";
import { ChevronDownIcon, DownloadIcon } from "lucide-react";
import dynamic from "next/dynamic";
import QRCodeStyling, { FileExtension, Options } from "qr-code-styling";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { ButtonGroup, ButtonGroupSeparator } from "./ui/button-group";
import { Card, CardContent } from "./ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Kbd, KbdGroup } from "./ui/kbd";

const PlatformRenderer = dynamic(() => import("./PlatformRenderer"), {
  ssr: false,
});

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
  const [extension, setExtension] = useState<FileExtension>("svg");
  const extensionOptions: FileExtension[] = ["svg", "png", "jpeg", "webp"];
  const [platform, setPlatform] = useState<Platform>();
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

  if (typeof navigator !== "undefined" && !platform) {
    setPlatform(getPlatform(navigator.userAgent));
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

  const downloadQrCodeDefault = useCallback(() => {
    downloadQrCode(extension);
  }, [extension, downloadQrCode]);

  useEffect(() => {
    if (ref.current) {
      qrCode?.append(ref.current);
    }
  }, [qrCode, ref]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        downloadQrCodeDefault();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [downloadQrCodeDefault]);

  return (
    <Card className={className}>
      <CardContent className="space-y-6">
        <div className="p-4 bg-accent inset-shadow-sm rounded-md">
          <div className="aspect-square flex items-center justify-center w-[300px] h-[300px]">
            <div
              ref={ref}
              className={cn(
                !options.data && "[&_svg]:opacity-50",
                "[&_svg]:h-full [&_canvas]:w-full [&_svg]:max-w-[300px] child-checkered-background"
              )}
            />
          </div>
        </div>
        <ButtonGroup className="w-full">
          <Button
            onClick={downloadQrCodeDefault}
            disabled={!options.data}
            className="grow"
          >
            <PlatformRenderer>
              {({ platform }) => platform === "mobile" && <DownloadIcon />}
            </PlatformRenderer>
            Download
            <PlatformRenderer>
              {({ platform }) =>
                platform !== "mobile" && (
                  <KbdGroup>
                    <Kbd className="bg-muted-foreground/50 text-foreground-primary">
                      {platform === "macos" ? "⌘" : "Ctrl"}
                    </Kbd>
                    <Kbd className="bg-muted-foreground/50 text-foreground-primary text-sm">
                      ⏎
                    </Kbd>
                  </KbdGroup>
                )
              }
            </PlatformRenderer>
          </Button>
          <ButtonGroupSeparator />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button disabled={!options.data}>
                {extension.toUpperCase()} <ChevronDownIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="[--radius:1rem]">
              <DropdownMenuLabel>Download as</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {extensionOptions.map((ext) => (
                <DropdownMenuCheckboxItem
                  key={ext}
                  checked={ext === extension}
                  onCheckedChange={() => {
                    if (extensionOptions.includes(ext)) {
                      setExtension(ext);
                      downloadQrCode(ext);
                    }
                  }}
                >
                  {ext.toUpperCase()}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </ButtonGroup>
      </CardContent>
    </Card>
  );
}
