"use client";

import { Monitor, Moon, Sun } from "lucide-react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const THEME_OPTIONS = [
  { value: "light", icon: <Sun />, label: "Light" },
  { value: "dark", icon: <Moon />, label: "Dark" },
  { value: "system", icon: <Monitor />, label: "System" },
] as const;

export function ThemeSwitcher() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="xs:hidden">
            {mounted &&
              THEME_OPTIONS.find((option) => option.value === theme)?.icon}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {THEME_OPTIONS.map(({ value, icon, label }) => (
            <DropdownMenuItem key={value} onClick={() => setTheme(value)}>
              {icon}
              {label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <ToggleGroup
        type="single"
        variant="outline"
        size="sm"
        value={mounted ? theme : ""}
        onValueChange={(value) => setTheme(value)}
        className="max-xs:hidden"
      >
        {THEME_OPTIONS.map(({ value, icon, label }) => (
          <ToggleGroupItem key={value} value={value} aria-label={label}>
            {icon}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </>
  );
}
