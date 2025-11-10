"use client";

import { useEffect, useRef, useState } from "react";
import QRCodeStyling, { FileExtension, Options } from "qr-code-styling";
import Image from "next/image";
import { Button } from "./ui/button";
import { ChevronDownIcon, DownloadIcon } from "lucide-react";
import { ButtonGroup, ButtonGroupSeparator } from "./ui/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function QRCodeRenderer({ options }: { options: Partial<Options> }) {
  const ref = useRef<HTMLDivElement>(null);
  const [qrCode, setQrCode] = useState<QRCodeStyling>();
  const [prevOptions, setPrevOptions] = useState<Partial<Options>>(options);
  const [extension, setExtension] = useState<FileExtension>("svg");
  const extensionOptions: FileExtension[] = ["svg", "png", "jpeg", "webp"];

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

  return (
    <div className="flex flex-col items-center gap-2">
      <div>
        {!options.data && (
          <Image
            src="/qr-code-placeholder.svg"
            alt="QR Code Placeholder"
            width={150}
            height={150}
          />
        )}
        <div ref={ref} />
      </div>
      <ButtonGroup>
        <Button
          onClick={() => {
            qrCode?.download({ extension });
          }}
          disabled={!options.data}
        >
          <DownloadIcon /> Download
        </Button>
        <ButtonGroupSeparator />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button disabled={!options.data}>
              .{extension} <ChevronDownIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="[--radius:1rem]">
            <DropdownMenuLabel>File Type</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={extension}
              onValueChange={(ext) => {
                if (extensionOptions.includes(ext as FileExtension)) {
                  setExtension(ext as FileExtension);
                  qrCode?.download({ extension: ext as FileExtension });
                }
              }}
            >
              {extensionOptions.map((ext) => (
                <DropdownMenuRadioItem key={ext} value={ext}>
                  {ext.toUpperCase()}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </ButtonGroup>
    </div>
  );
}
