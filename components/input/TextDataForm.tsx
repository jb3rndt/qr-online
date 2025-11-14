import { TextData } from "@/lib/types";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export function TextDataForm({
  data,
  onDataChange,
}: {
  data?: TextData;
  onDataChange: (data: TextData) => void;
}) {
  const handleInputChange = (newData: TextData) => {
    onDataChange(newData);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="text">Text</Label>
        <Input
          id="text"
          value={data?.text ?? ""}
          onChange={(e) =>
            handleInputChange({
              text: e.target.value,
            })
          }
          placeholder="Enter any text"
        />
      </div>
    </div>
  );
}
