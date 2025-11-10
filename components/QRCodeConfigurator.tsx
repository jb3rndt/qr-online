import { Options } from "qr-code-styling";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export function QRCodeConfigurator({
  config,
  onConfigChange,
}: {
  config: Partial<Options>;
  onConfigChange: (config: Partial<Options>) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <Label htmlFor="input-data">Data</Label>
        <Input
          placeholder="Enter data to encode..."
          value={config.data ?? ""}
          onChange={(event) =>
            onConfigChange({ ...config, data: event.target.value })
          }
          className="w-[400px]"
          id="input-data"
        />
      </div>
      <div className="flex flex-col space-y-2">
        <Label htmlFor="input-foreground-color">Foreground Color</Label>
        <Input
          placeholder="Enter foreground color..."
          value={config.dotsOptions?.color ?? ""}
          onChange={(event) =>
            onConfigChange({
              ...config,
              dotsOptions: {
                ...config.dotsOptions,
                color: event.target.value,
              },
            })
          }
          className="w-[400px]"
          id="input-foreground-color"
        />
      </div>
      <div className="flex flex-col space-y-2">
        <Label htmlFor="input-background-color">Background Color</Label>
        <Input
          placeholder="Enter background color..."
          value={config.backgroundOptions?.color ?? ""}
          onChange={(event) =>
            onConfigChange({
              ...config,
              backgroundOptions: {
                ...config.backgroundOptions,
                color: event.target.value,
              },
            })
          }
          className="w-[400px]"
          id="input-background-color"
        />
      </div>
    </div>
  );
}
