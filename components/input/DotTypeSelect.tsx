import ClassyDotsPreview from "@/public/classy-dots.svg";
import ClassyRoundedDotsPreview from "@/public/classy-rounded-dots.svg";
import DotCornerDot from "@/public/dot-corner-dot.svg";
import DotCorner from "@/public/dot-corner.svg";
import DefaultDotsPreview from "@/public/dots.svg";
import ExtraRoundedCorner from "@/public/extra-rounded-corner.svg";
import ExtraRoundedDotsPreview from "@/public/extra-rounded-dots.svg";
import RoundedDotsPreview from "@/public/rounded-dots.svg";
import SquareCornerDot from "@/public/square-corner-dot.svg";
import SquareCorner from "@/public/square-corner.svg";
import SquareDotsPreview from "@/public/square-dots.svg";
import { Slash } from "lucide-react";
import Image from "next/image";
import { CornerDotType, CornerSquareType, DotType } from "qr-code-styling";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";

export const DOT_TYPES = [
  { type: "square", svg: SquareDotsPreview },
  { type: "dots", svg: DefaultDotsPreview },
  { type: "rounded", svg: RoundedDotsPreview },
  { type: "extra-rounded", svg: ExtraRoundedDotsPreview },
  { type: "classy", svg: ClassyDotsPreview },
  { type: "classy-rounded", svg: ClassyRoundedDotsPreview },
];

export const CORNER_SQUARE_TYPES = [
  { type: "square", svg: SquareCorner },
  { type: "extra-rounded", svg: ExtraRoundedCorner },
  { type: "dot", svg: DotCorner },
];

export const CORNER_DOT_TYPES = [
  { type: "square", svg: SquareCornerDot },
  { type: "dot", svg: DotCornerDot },
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
          <Image src={option.svg} alt={option.type} />
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
          <Image src={option.svg} alt={option.type} />
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
          <Image src={option.svg} alt={option.type} />
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
