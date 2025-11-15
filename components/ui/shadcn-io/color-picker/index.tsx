"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import Color from "color";
import { PipetteIcon } from "lucide-react";
import { Slider } from "radix-ui";
import {
  type ComponentProps,
  createContext,
  type HTMLAttributes,
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

interface ColorPickerContextValue {
  color: HSLAColor;
  mode: string;
  setColor: (color: HSLAColor) => void;
  setMode: (mode: string) => void;
}

const ColorPickerContext = createContext<ColorPickerContextValue | undefined>(
  undefined
);

export const useColorPicker = () => {
  const context = useContext(ColorPickerContext);

  if (!context) {
    throw new Error("useColorPicker must be used within a ColorPickerProvider");
  }

  return context;
};

export type ColorPickerProps = HTMLAttributes<HTMLDivElement> & {
  value?: Parameters<typeof Color>[0];
  onValueChange?: (value: Parameters<typeof Color.rgb>[0]) => void;
};

export type HSLAColor = {
  h: number;
  s: number;
  l: number;
  a: number;
};

export const ColorPicker = ({
  value,
  onValueChange,
  className,
  ...props
}: ColorPickerProps) => {
  const selectedColor = value ? Color(value) : null;
  const onValueChangeRef = useRef(onValueChange);
  const notifyParentRef = useRef<(data: HSLAColor) => void | null>(null);

  // Keep ref updated to avoid re-creating effects
  if (onValueChange !== onValueChangeRef.current) {
    onValueChangeRef.current = onValueChange;
  }
  const [color, setColor] = useState<HSLAColor>({
    h: selectedColor?.hue() ?? 0,
    s: selectedColor?.saturationl() ?? 100,
    l: selectedColor?.lightness() ?? 100,
    a: (selectedColor?.alpha() ?? 1) * 100,
  });
  const [mode, setMode] = useState("hex");

  if (
    selectedColor &&
    selectedColor?.hexa() !==
      Color.hsl(color.h, color.s, color.l)
        .alpha(color.a / 100)
        .hexa()
  ) {
    setColor({
      h: selectedColor.hue(),
      s: selectedColor.saturationl(),
      l: selectedColor.lightness(),
      a: selectedColor.alpha() * 100,
    });
  }

  notifyParentRef.current = ({ h, s, l, a }: HSLAColor) => {
    if (onValueChangeRef.current) {
      const color = Color.hsl(h, s, l).alpha(a / 100);
      const rgba = color.rgb().array();

      onValueChangeRef.current([rgba[0], rgba[1], rgba[2], a / 100]);
    }
  };

  const updateColor = useCallback((newColor: HSLAColor) => {
    setColor(newColor);
    notifyParentRef.current?.(newColor);
  }, []);

  return (
    <ColorPickerContext.Provider
      value={{
        color,
        mode,
        setMode,
        setColor: updateColor,
      }}
    >
      <div
        className={cn("flex size-full flex-col gap-4", className)}
        {...props}
      />
    </ColorPickerContext.Provider>
  );
};

export type ColorPickerSelectionProps = HTMLAttributes<HTMLDivElement>;

export const ColorPickerSelection = memo(
  ({ className, ...props }: ColorPickerSelectionProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const pointerMoveRef = useRef<((event: PointerEvent) => void) | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const { color, setColor } = useColorPicker();
    const colorInstance = Color.hsl(color.h, color.s, color.l);
    const [positionX, setPositionX] = useState(
      colorInstance.saturationv() / 100
    );
    const [positionY, setPositionY] = useState(1 - colorInstance.value() / 100);

    if (
      Color.hsv(color.h, positionX * 100, (1 - positionY) * 100).hexa() !==
      colorInstance.hexa()
    ) {
      setPositionX(colorInstance.saturationv() / 100);
      setPositionY(1 - colorInstance.value() / 100);
    }

    const backgroundGradient = useMemo(() => {
      return `linear-gradient(0deg, rgba(0,0,0,1), rgba(0,0,0,0)),
            linear-gradient(90deg, rgba(255,255,255,1), rgba(255,255,255,0)),
            hsl(${color.h}, 100%, 50%)`;
    }, [color.h]);

    useEffect(() => {
      pointerMoveRef.current = (event: PointerEvent) => {
        if (!containerRef.current) {
          return;
        }
        const rect = containerRef.current.getBoundingClientRect();
        const x = Math.max(
          0,
          Math.min(1, (event.clientX - rect.left) / rect.width)
        );
        const y = Math.max(
          0,
          Math.min(1, (event.clientY - rect.top) / rect.height)
        );
        const newColor = Color.hsv(color.h, x * 100, (1 - y) * 100);
        setPositionX(x);
        setPositionY(y);
        setColor({
          h: color.h,
          s: newColor.saturationl(),
          l: newColor.lightness(),
          a: color.a,
        });
      };
    }, [color.h, color.a, setColor, setPositionX, setPositionY]);

    useEffect(() => {
      const handlePointerUp = () => setIsDragging(false);
      const handlePointerMove = (event: PointerEvent) => {
        if (isDragging && pointerMoveRef.current) {
          pointerMoveRef.current(event);
        }
      };

      if (isDragging) {
        window.addEventListener("pointermove", handlePointerMove);
        window.addEventListener("pointerup", handlePointerUp);
      }

      return () => {
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("pointerup", handlePointerUp);
      };
    }, [isDragging]);

    return (
      <div
        className={cn("relative size-full cursor-crosshair rounded", className)}
        onPointerDown={(e) => {
          setIsDragging(true);
          pointerMoveRef.current?.(e.nativeEvent);
        }}
        ref={containerRef}
        style={{
          background: backgroundGradient,
        }}
        {...props}
      >
        <div
          className="-translate-x-1/2 -translate-y-1/2 pointer-events-none absolute h-4 w-4 rounded-full border-2 border-white"
          style={{
            left: `${positionX * 100}%`,
            top: `${positionY * 100}%`,
            boxShadow: "0 0 0 1px rgba(0,0,0,0.5)",
          }}
        />
      </div>
    );
  }
);

ColorPickerSelection.displayName = "ColorPickerSelection";

export type ColorPickerHueProps = ComponentProps<typeof Slider.Root>;

export const ColorPickerHue = ({
  className,
  ...props
}: ColorPickerHueProps) => {
  const { color, setColor } = useColorPicker();

  return (
    <Slider.Root
      className={cn("relative flex h-4 w-full touch-none", className)}
      max={360}
      onValueChange={([hue]) => setColor({ ...color, h: hue })}
      step={1}
      value={[color.h]}
      {...props}
    >
      <Slider.Track className="relative my-0.5 h-3 w-full grow rounded-full bg-[linear-gradient(90deg,#FF0000,#FFFF00,#00FF00,#00FFFF,#0000FF,#FF00FF,#FF0000)]">
        <Slider.Range className="absolute h-full" />
      </Slider.Track>
      <Slider.Thumb className="block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
    </Slider.Root>
  );
};

export type ColorPickerAlphaProps = ComponentProps<typeof Slider.Root>;

export const ColorPickerAlpha = ({
  className,
  ...props
}: ColorPickerAlphaProps) => {
  const { color, setColor } = useColorPicker();

  return (
    <Slider.Root
      className={cn("relative flex h-4 w-full touch-none", className)}
      max={100}
      onValueChange={([alpha]) => setColor({ ...color, a: alpha })}
      step={1}
      value={[color.a]}
      {...props}
    >
      <Slider.Track
        className="relative my-0.5 h-3 w-full grow rounded-full"
        style={{
          background:
            'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uCTZhw1gGGYhAGBZIA/nYDCgBDAm9BGDWAAJyRCgLaBCAAgXwixzAS0pgAAAABJRU5ErkJggg==") left center',
        }}
      >
        <div className="absolute inset-0 rounded-full bg-linear-to-r from-transparent to-black/50" />
        <Slider.Range className="absolute h-full rounded-full bg-transparent" />
      </Slider.Track>
      <Slider.Thumb className="block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
    </Slider.Root>
  );
};

export type ColorPickerEyeDropperProps = ComponentProps<typeof Button>;

export const ColorPickerEyeDropper = ({
  className,
  ...props
}: ColorPickerEyeDropperProps) => {
  const { setColor } = useColorPicker();

  const handleEyeDropper = async () => {
    try {
      // @ts-expect-error - EyeDropper API is experimental
      const eyeDropper = new EyeDropper();
      const result = await eyeDropper.open();
      const color = Color(result.sRGBHex);
      const [h, s, l] = color.hsl().array();

      setColor({ h, s, l, a: 100 });
    } catch (error) {
      console.error("EyeDropper failed:", error);
    }
  };

  return (
    <Button
      className={cn("shrink-0 text-muted-foreground", className)}
      onClick={handleEyeDropper}
      size="icon"
      variant="outline"
      type="button"
      {...props}
    >
      <PipetteIcon size={16} />
    </Button>
  );
};

export type ColorPickerOutputProps = ComponentProps<typeof SelectTrigger>;

const formats = ["hex", "rgb", "css", "hsl"];

export const ColorPickerOutput = ({
  className,
  ...props
}: ColorPickerOutputProps) => {
  const { mode, setMode } = useColorPicker();

  return (
    <Select onValueChange={setMode} value={mode}>
      <SelectTrigger
        className={cn("h-8 w-20 shrink-0 text-xs", className)}
        {...props}
      >
        <SelectValue placeholder="Mode" />
      </SelectTrigger>
      <SelectContent>
        {formats.map((format) => (
          <SelectItem className="text-xs" key={format} value={format}>
            {format.toUpperCase()}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

type PercentageInputProps = Omit<
  ComponentProps<typeof Input>,
  "value" | "onChange"
>;

const PercentageInput = ({ className, ...props }: PercentageInputProps) => {
  const { color, setColor } = useColorPicker();

  return (
    <div className="relative">
      <Input
        type="text"
        {...props}
        onChange={(event) => {
          const value =
            !event.target.value || isNaN(parseInt(event.target.value, 10))
              ? 0
              : parseInt(event.target.value, 10);
          setColor({ ...color, a: value });
        }}
        value={Math.round(color.a)}
        className={cn("w-13 rounded-l-none px-2 shadow-none", className)}
      />
      <span className="-translate-y-1/2 absolute top-1/2 right-2 text-muted-foreground text-xs">
        %
      </span>
    </div>
  );
};

export type ColorPickerFormatProps = HTMLAttributes<HTMLDivElement>;

export const ColorPickerFormat = ({
  className,
  ...props
}: ColorPickerFormatProps) => {
  const { color, mode, setColor } = useColorPicker();
  const colorInstance = Color.hsl(color.h, color.s, color.l, color.a / 100);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [hexInput, setHexInput] = useState(colorInstance.hex());
  if (colorInstance.hex() !== hexInput && !isInputFocused) {
    setHexInput(colorInstance.hex());
  }

  if (mode === "hex") {
    return (
      <div
        className={cn(
          "-space-x-px relative flex w-full items-center rounded-md shadow-xs",
          className
        )}
        {...props}
      >
        <Input
          className="rounded-r-none shadow-none"
          type="text"
          value={hexInput}
          onFocus={() => {
            setIsInputFocused(true);
          }}
          onBlur={() => {
            setIsInputFocused(false);
          }}
          onChange={(event) => {
            try {
              setHexInput(event.target.value);
              const colorInstance = Color(event.target.value).hsl();
              setColor({
                h: colorInstance.hue(),
                s: colorInstance.saturationl(),
                l: colorInstance.lightness(),
                a: color.a,
              });
            } catch {}
          }}
        />
        <PercentageInput />
      </div>
    );
  }

  if (mode === "rgb") {
    const rgb = colorInstance
      .rgb()
      .array()
      .map((value) => Math.round(value));

    return (
      <div
        className={cn(
          "-space-x-px flex items-center rounded-md shadow-xs",
          className
        )}
        {...props}
      >
        {rgb.map((value, index) => (
          <Input
            className={cn(
              "rounded-r-none px-2 shadow-none",
              index && "rounded-l-none",
              className
            )}
            key={index}
            onChange={(event) => {
              const value =
                !event.target.value || isNaN(parseInt(event.target.value, 10))
                  ? 0
                  : parseInt(event.target.value, 10);
              const newRgb = [...rgb];
              newRgb[index] = value;
              const colorInstance = Color.rgb(newRgb).hsl();
              setColor({
                h: colorInstance.hue(),
                s: colorInstance.saturationl(),
                l: colorInstance.lightness(),
                a: color.a,
              });
            }}
            type="text"
            value={value}
          />
        ))}
        <PercentageInput />
      </div>
    );
  }

  if (mode === "css") {
    const rgb = colorInstance
      .rgb()
      .array()
      .map((value) => Math.round(value));

    return (
      <div className={cn("w-full rounded-md shadow-xs", className)} {...props}>
        <Input
          className="w-full bg-secondary px-2 text-xs shadow-none"
          readOnly
          type="text"
          value={`rgba(${rgb.join(", ")}, ${color.a}%)`}
          {...props}
        />
      </div>
    );
  }

  if (mode === "hsl") {
    const hsl = colorInstance
      .hsl()
      .array()
      .splice(0, 3)
      .map((value) => Math.round(value));
    const updateFunctions = [
      (h: number) => setColor({ ...color, h }),
      (s: number) => setColor({ ...color, s }),
      (l: number) => setColor({ ...color, l }),
    ];

    return (
      <div
        className={cn(
          "-space-x-px flex items-center rounded-md shadow-xs",
          className
        )}
        {...props}
      >
        {hsl.map((value, index) => (
          <Input
            className={cn(
              "rounded-r-none px-2 shadow-none",
              index && "rounded-l-none",
              className
            )}
            key={index}
            onChange={(event) => {
              const value =
                !event.target.value || isNaN(parseInt(event.target.value, 10))
                  ? 0
                  : parseInt(event.target.value, 10);
              updateFunctions[index](value);
            }}
            type="text"
            value={value}
          />
        ))}
        <PercentageInput />
      </div>
    );
  }

  return null;
};
