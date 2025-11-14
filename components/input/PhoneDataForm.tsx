import { PhoneData } from "@/lib/types";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

export function PhoneDataForm({
  data,
  onDataChange,
}: {
  data?: PhoneData;
  onDataChange: (newData: PhoneData) => void;
}) {
  const handleInputChange = (newData: PhoneData) => {
    onDataChange(newData);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="phone">Phone Number</Label>
      <Input
        id="phone"
        type="tel"
        value={data?.phone ?? ""}
        onChange={(e) => handleInputChange({ phone: e.target.value })}
        placeholder="tel:+123456789"
      />
    </div>
  );
}
