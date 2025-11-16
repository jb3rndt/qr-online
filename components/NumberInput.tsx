import { cn } from "@/lib/utils";
import { MinusIcon, PlusIcon } from "lucide-react";
import { Button } from "./ui/button";
import { ButtonGroup } from "./ui/button-group";
import { InputGroup, InputGroupInput } from "./ui/input-group";

export function NumberInput({
  placeholder,
  min,
  max,
  step,
  onChange,
  value,
  className,
  ...props
}: Omit<
  React.ComponentProps<"input">,
  "type" | "onChange" | "value" | "step" | "min" | "max"
> & {
  onChange?: (value: number | undefined) => void;
  value?: number;
  step?: number;
  min?: number;
  max?: number;
}) {
  const handleIncrement = () => {
    const currentValue = value ?? 0;
    onChange?.(
      max !== undefined
        ? Math.min(currentValue + (step ?? 1), max)
        : currentValue + (step ?? 1)
    );
  };

  const handleDecrement = () => {
    const currentValue = value ?? 0;
    onChange?.(
      min !== undefined
        ? Math.max(currentValue - (step ?? 1), min)
        : currentValue - (step ?? 1)
    );
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    onChange?.(isNaN(value) ? undefined : value);
  };

  return (
    <ButtonGroup>
      <Button
        variant="outline"
        className="aspect-square"
        onClick={handleDecrement}
        disabled={min !== undefined && value !== undefined && value <= min}
      >
        <MinusIcon className="size-4" />
        <span className="sr-only">Decrement</span>
      </Button>
      <InputGroup>
        <InputGroupInput
          type="number"
          value={value ?? ""}
          onChange={handleChange}
          max={max}
          min={min}
          step={step}
          placeholder={placeholder}
          className={cn(
            "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
            className
          )}
          {...props}
        />
      </InputGroup>
      <Button
        variant="outline"
        className="aspect-square"
        onClick={handleIncrement}
        disabled={max !== undefined && value !== undefined && value >= max}
      >
        <PlusIcon className="size-4" />
        <span className="sr-only">Increment</span>
      </Button>
    </ButtonGroup>
  );
}
