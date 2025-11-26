import { Slash } from "lucide-react";
import { CornerDotType, CornerSquareType, DotType } from "qr-code-styling";
import { ClassyDots } from "../svg/ClassyDots";
import { ClassyRoundedDots } from "../svg/ClassyRoundedDots";
import { DotCorner } from "../svg/DotCorner";
import { DotCornerDot } from "../svg/DotCornerDot";
import { Dots } from "../svg/Dots";
import { ExtraRoundedCorner } from "../svg/ExtraRoundedCorner";
import { ExtraRoundedDots } from "../svg/ExtraRoundedDots";
import { RoundedDots } from "../svg/RoundedDots";
import { SquareCorner } from "../svg/SquareCorner";
import { SquareCornerDot } from "../svg/SquareCornerDot";
import { SquareDots } from "../svg/SquareDots";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";

export const DOT_TYPES = [
  { type: "square", svg: <SquareDots className="size-7" /> },
  { type: "dots", svg: <Dots className="size-7" /> },
  { type: "rounded", svg: <RoundedDots className="size-7" /> },
  { type: "extra-rounded", svg: <ExtraRoundedDots className="size-7" /> },
  { type: "classy", svg: <ClassyDots className="size-7" /> },
  { type: "classy-rounded", svg: <ClassyRoundedDots className="size-7" /> },
];

export const CORNER_SQUARE_TYPES = [
  { type: "square", svg: <SquareCorner className="size-7" /> },
  { type: "extra-rounded", svg: <ExtraRoundedCorner className="size-7" /> },
  { type: "dot", svg: <DotCorner className="size-7" /> },
];

export const CORNER_DOT_TYPES = [
  { type: "square", svg: <SquareCornerDot className="size-7" /> },
  { type: "dot", svg: <DotCornerDot className="size-7" /> },
];

export function DotTypeSelect({
  value,
  onChange,
}: {
  value: DotType;
  onChange: (value: DotType) => void;
}) {
  return (
    <ToggleGroup
      type="single"
      variant="outline"
      spacing={2}
      value={value}
      onValueChange={(value) =>
        value ? onChange(value as DotType) : undefined
      }
      className="flex-wrap"
    >
      {DOT_TYPES.map((option) => (
        <ToggleGroupItem
          key={option.type}
          value={option.type}
          className="w-12 h-12 px-1.5 data-[state=off]:opacity-50 data-[state=off]:hover:opacity-65"
        >
          {option.svg}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}

export function CornerSquareTypeSelect({
  value,
  onChange,
}: {
  value: CornerSquareType | "none";
  onChange: (value: CornerSquareType | "none") => void;
}) {
  return (
    <ToggleGroup
      type="single"
      variant="outline"
      spacing={2}
      size="default"
      value={value}
      onValueChange={(value) =>
        value ? onChange(value as CornerSquareType | "none") : undefined
      }
    >
      <ToggleGroupItem
        value="none"
        className="w-12 h-12 px-1.5 data-[state=off]:opacity-50 data-[state=off]:hover:opacity-65"
      >
        <Slash />
      </ToggleGroupItem>
      {CORNER_SQUARE_TYPES.map((option) => (
        <ToggleGroupItem
          key={option.type}
          value={option.type}
          className="w-12 h-12 px-1.5 data-[state=off]:opacity-50 data-[state=off]:hover:opacity-65"
        >
          {option.svg}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}

export function CornerDotTypeSelect({
  value,
  onChange,
}: {
  value: CornerDotType | "none";
  onChange: (value: CornerDotType | "none") => void;
}) {
  return (
    <ToggleGroup
      type="single"
      variant="outline"
      spacing={2}
      size="default"
      value={value}
      onValueChange={(value) =>
        value ? onChange(value as CornerDotType | "none") : undefined
      }
    >
      <ToggleGroupItem
        value="none"
        className="w-12 h-12 px-1.5 data-[state=off]:opacity-50 data-[state=off]:hover:opacity-65"
      >
        <Slash />
      </ToggleGroupItem>
      {CORNER_DOT_TYPES.map((option) => (
        <ToggleGroupItem
          key={option.type}
          value={option.type}
          className="w-12 h-12 px-1.5 data-[state=off]:opacity-50 data-[state=off]:hover:opacity-65"
        >
          {option.svg}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
