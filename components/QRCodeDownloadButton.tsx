import { Platform } from "@/lib/types";
import { cn, getPlatform } from "@/lib/utils";
import { ChevronDownIcon, DownloadIcon } from "lucide-react";
import dynamic from "next/dynamic";
import { FileExtension } from "qr-code-styling";
import { ComponentProps, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ButtonGroup, ButtonGroupSeparator } from "./ui/button-group";
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

export function QRCodeDownloadButton({
  className,
  orientation,
  onDownload,
  disabled,
  ...props
}: ComponentProps<typeof ButtonGroup> & {
  onDownload: (ext: FileExtension) => void;
  disabled?: boolean;
}) {
  const [extension, setExtension] = useState<FileExtension>("svg");
  const extensionOptions: FileExtension[] = ["svg", "png", "jpeg", "webp"];
  const [platform, setPlatform] = useState<Platform>();

  if (typeof navigator !== "undefined" && !platform) {
    setPlatform(getPlatform(navigator.userAgent));
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        onDownload(extension);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [extension, onDownload]);

  return (
    <ButtonGroup className={cn(className)} orientation={orientation} {...props}>
      <Button
        onClick={() => onDownload(extension)}
        disabled={disabled}
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
      <ButtonGroupSeparator orientation={orientation} />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button disabled={disabled}>
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
                  onDownload(ext);
                }
              }}
            >
              {ext.toUpperCase()}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  );
}
