"use client";

import Color from "color";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  ColorPicker,
  ColorPickerAlpha,
  ColorPickerFormat,
  ColorPickerHue,
  ColorPickerOutput,
  ColorPickerSelection,
} from "./ui/shadcn-io/color-picker";

export function ColorPickerInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <Label>{label}</Label>
      <div className="flex items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="h-12 w-12 checkered-background p-0"
            >
              <div
                className="h-12 w-12 -m-0.5 rounded-md"
                style={{ backgroundColor: value }}
              ></div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-96 p-0">
            <ColorPicker
              className="rounded-md bg-background p-4"
              value={value}
              onValueChange={(value) => {
                onChange(Color.rgb(value).hexa());
              }}
            >
              <ColorPickerSelection className="aspect-square" />
              <div className="flex items-center gap-4">
                <div
                  className="h-10 w-10 border rounded-md shrink-0 checkered-background"
                  style={{ backgroundColor: value }}
                >
                  <div
                    className="h-10 w-10 -m-0.5 rounded-md"
                    style={{ backgroundColor: value }}
                  ></div>
                </div>
                <div className="grid w-full gap-1">
                  <ColorPickerHue />
                  <ColorPickerAlpha />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ColorPickerOutput />
                <ColorPickerFormat />
              </div>
            </ColorPicker>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
