import { ColorPicker } from "../ColorPicker";

export function ColorInputForm({
  foregroundColor,
  backgroundColor,
  onForegroundColorChange,
  onBackgroundColorChange,
}: {
  foregroundColor: string;
  backgroundColor: string;
  onForegroundColorChange?: (color: string) => void;
  onBackgroundColorChange?: (color: string) => void;
}) {
  return (
    <div className="space-y-2">
      <ColorPicker
        label="Foreground Color"
        value={foregroundColor}
        onChange={(color) => onForegroundColorChange?.(color)}
      />
      <ColorPicker
        label="Background Color"
        value={backgroundColor}
        onChange={(color) => onBackgroundColorChange?.(color)}
      />
    </div>
  );
}
