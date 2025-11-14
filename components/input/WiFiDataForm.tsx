import { WiFiData } from "@/lib/types";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export function WiFiDataForm({
  data,
  onDataChange,
}: {
  data?: WiFiData;
  onDataChange: (newData: WiFiData) => void;
}) {
  const handleInputChange = (newData: WiFiData) => {
    onDataChange(newData);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="ssid">SSID</Label>
        <Input
          id="ssid"
          value={data?.ssid ?? ""}
          onChange={(e) =>
            handleInputChange({
              ssid: e.target.value,
              password: data?.password ?? "",
              encryption: data?.encryption ?? "WPA",
            })
          }
          placeholder="Network Name"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={data?.password ?? ""}
          onChange={(e) =>
            handleInputChange({
              ssid: data?.ssid ?? "",
              password: e.target.value,
              encryption: data?.encryption ?? "WPA",
            })
          }
          placeholder="Network Password"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="encryption">Encryption</Label>
        <Select
          value={data?.encryption ?? "WPA"}
          onValueChange={(value) =>
            handleInputChange({
              ssid: data?.ssid ?? "",
              password: data?.password ?? "",
              encryption: value as WiFiData["encryption"],
            })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select encryption" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="WPA">WPA/WPA2</SelectItem>
            <SelectItem value="WEP">WEP</SelectItem>
            <SelectItem value="nopass">No Password</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
