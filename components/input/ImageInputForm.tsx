import { EditIcon, Trash } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "../ui/shadcn-io/dropzone";

export function ImageInputForm({
  image,
  onImageUpload,
  onImageRemove,
}: {
  image?: string;
  onImageUpload?: (file: File) => void;
  onImageRemove?: () => void;
}) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between">
        <Label>Upload Logo</Label>
        {image && (
          <Button
            onClick={onImageRemove}
            variant={"secondary"}
            size={"sm"}
            className="ml-2 hover:bg-destructive hover:text-background"
          >
            <Trash size={14} />
            Remove
          </Button>
        )}
      </div>
      <Dropzone
        accept={{
          "image/*": [".jpeg", ".png", ".webp", ".svg"],
        }}
        onDrop={(acceptedFiles) => {
          if (acceptedFiles.length > 0) {
            onImageUpload?.(acceptedFiles[0]);
          }
        }}
        onError={() => {
          toast.warning("Error when uploading file");
        }}
        src={image ? [image] : undefined}
      >
        <DropzoneEmptyState />
        <DropzoneContent>
          {image && (
            <>
              <div className="w-full flex items-center justify-center -m-2 group-hover:opacity-50">
                <Image
                  alt="Preview"
                  className="object-contain h-20"
                  src={image}
                  height={80}
                  width={80}
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <div className="p-2 rounded-md bg-muted">
                  <EditIcon size={32}></EditIcon>
                </div>
              </div>
            </>
          )}
        </DropzoneContent>
      </Dropzone>
    </div>
  );
}
