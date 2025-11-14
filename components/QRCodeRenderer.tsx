"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import QRCodeStyling, { FileExtension, Options } from "qr-code-styling";
import { Button } from "./ui/button";
import { ChevronDownIcon, DownloadIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ButtonGroup, ButtonGroupSeparator } from "./ui/button-group";
import { Kbd, KbdGroup } from "./ui/kbd";
import Image from "next/image";
import QRCodePlaceholder from "@/public/qr-code-placeholder.svg";
import { cn, getPlatform } from "@/lib/utils";
import { Platform } from "@/lib/types";
import dynamic from "next/dynamic";
import { toast } from "sonner";

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

  if (typeof window !== "undefined" && !qrCode) {
    setQrCode(new QRCodeStyling(options));
  }

  if (typeof navigator !== "undefined" && !platform) {
    setPlatform(getPlatform(navigator.userAgent));
  }

  if (prevOptions !== options) {
    setPrevOptions(options);
    qrCode?.update(options);
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
      console.log("Key down event:", e.key, e.metaKey, e.ctrlKey);
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
    <div className={cn("flex flex-col items-center gap-2 p-6", className)}>
      <div>
        {!options.data && (
          <Image
            src={QRCodePlaceholder}
            alt="QR Code Placeholder"
            className="w-[150px] h-[150px]"
          />
        )}
        <div ref={ref} />
      </div>
      <ButtonGroup>
        <Button onClick={downloadQrCodeDefault} disabled={!options.data}>
          <PlatformRenderer>
            {({ platform }) => platform === "mobile" && <DownloadIcon />}
          </PlatformRenderer>
          Download
          <PlatformRenderer>
            {({ platform }) =>
              platform !== "mobile" && (
                <KbdGroup>
                  <Kbd>{platform === "macos" ? "⌘" : "Ctrl"}</Kbd>
                  <Kbd>⏎</Kbd>
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
            <DropdownMenuLabel>File Type</DropdownMenuLabel>
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
    </div>
  );
}
