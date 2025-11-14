import { SMSData } from "@/lib/types";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export function SMSDataForm({
  data,
  onDataChange,
}: {
  data?: SMSData;
  onDataChange: (data: SMSData) => void;
}) {
  const handleInputChange = (newData: SMSData) => {
    onDataChange(newData);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="sms-phone">Phone Number</Label>
        <Input
          id="sms-phone"
          type="tel"
          value={data?.phone ?? ""}
          onChange={(e) =>
            handleInputChange({
              message: data?.message ?? "",
              phone: e.target.value,
            })
          }
          placeholder="+123456789"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="sms-message">Message</Label>
        <Input
          id="sms-message"
          value={data?.message ?? ""}
          onChange={(e) =>
            handleInputChange({
              message: e.target.value,
              phone: data?.phone ?? "",
            })
          }
          placeholder="SMS message"
        />
      </div>
    </div>
  );
}
