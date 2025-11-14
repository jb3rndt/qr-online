import { EmailData } from "@/lib/types";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export function EmailDataForm({
  data,
  onDataChange,
}: {
  data?: EmailData;
  onDataChange: (data: EmailData) => void;
}) {
  const handleInputChange = (newData: EmailData) => {
    onDataChange(newData);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={data?.email ?? ""}
          onChange={(e) =>
            handleInputChange({
              ...data,
              email: e.target.value,
              body: data?.body ?? "",
              subject: data?.subject ?? "",
            })
          }
          placeholder="mailto:user@example.com"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="subject">Subject</Label>
        <Input
          id="subject"
          value={data?.subject ?? ""}
          onChange={(e) =>
            handleInputChange({
              ...data,
              email: data?.email ?? "",
              body: data?.body ?? "",
              subject: e.target.value,
            })
          }
          placeholder="Email subject"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="body">Body</Label>
        <Input
          id="body"
          value={data?.body ?? ""}
          onChange={(e) =>
            handleInputChange({
              ...data,
              email: data?.email ?? "",
              body: e.target.value,
              subject: data?.subject ?? "",
            })
          }
          placeholder="Email body"
        />
      </div>
    </div>
  );
}
