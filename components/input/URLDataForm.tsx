import { URLData } from "@/lib/types";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export function URLDataForm({
  data,
  onDataChange,
}: {
  data?: URLData;
  onDataChange: (data: URLData) => void;
}) {
  const handleInputChange = (newData: URLData) => {
    onDataChange(newData);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="url">URL</Label>
        <Input
          id="url"
          type="url"
          value={data?.url ?? ""}
          onChange={(e) =>
            handleInputChange({
              url: e.target.value,
            })
          }
          placeholder="https://example.com"
        />
      </div>
    </div>
  );
}
