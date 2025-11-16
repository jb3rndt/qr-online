import { cn } from "@/lib/utils";
import Link from "next/link";
import { GitHubLogo } from "./svg/GitHubLogo";

export function Header({ className }: { className?: string }) {
  return (
    <header className={cn("backdrop-blur-md bg-background/80", className)}>
      <div className="flex container mx-auto h-full items-center justify-between">
        <h2 className="font-bold text-lg">QRCode Generator</h2>
        <div>
          <Link
            href="https://github.com/jb3rndt/qr-online"
            target="_blank"
            className="flex items-center gap-2 hover:underline"
          >
            <GitHubLogo className="h-4 w-4" /> Github
          </Link>
        </div>
      </div>
    </header>
  );
}
