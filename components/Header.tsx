import { cn } from "@/lib/utils";
import Link from "next/link";
import { GitHubLogo } from "./svg/GitHubLogo";
import { ThemeSwitcher } from "./ThemeSwitcher";

export function Header({ className }: { className?: string }) {
  return (
    <header className={cn("backdrop-blur-md bg-background/80", className)}>
      <div className="flex container mx-auto h-full items-center justify-between px-4">
        <h2 className="font-bold text-lg">QRCode Generator</h2>
        <div className="flex gap-4">
          <Link
            href="https://github.com/jb3rndt/qr-online"
            target="_blank"
            className="flex items-center gap-2 hover:underline hover:text-muted-foreground group"
          >
            <GitHubLogo className="size-4 group-hover:fill-muted-foreground" />{" "}
            Github
          </Link>
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}
