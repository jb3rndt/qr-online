import { EditIcon, Trash } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { NumberInput } from "../NumberInput";
import { SliderControl } from "../SliderControl";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "../ui/shadcn-io/dropzone";

export function ImageInputForm({
  image,
  imageSize,
  margin,
  hideBackgroundDots,
  onImageUpload,
  onImageRemove,
  onImageSizeChange,
  onMarginChange,
  onHideBackgroundDotsChange,
}: {
  image?: string;
  imageSize: number;
  margin?: number;
  hideBackgroundDots: boolean;
  onImageUpload?: (file: File) => void;
  onImageRemove?: () => void;
  onImageSizeChange?: (size: number) => void;
  onMarginChange?: (margin?: number) => void;
  onHideBackgroundDotsChange?: (hide: boolean) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <Label>Upload Image</Label>
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
      {image && (
        <SliderControl
          label="Image Size"
          value={imageSize}
          onChange={(value) => onImageSizeChange?.(value)}
          min={0.1}
          max={1}
          step={0.1}
        />
      )}
      {image && (
        <div className="flex items-center gap-3">
          <Checkbox
            id="hideBackgroundDots"
            checked={hideBackgroundDots}
            onCheckedChange={(checked) =>
              onHideBackgroundDotsChange?.(checked === true ? true : false)
            }
          />
          <Label htmlFor="hideBackgroundDots">Hide QR Dots behind Image</Label>
        </div>
      )}
      {image && (
        <div className="grid w-full items-center gap-3">
          <Label htmlFor="image-margin">Image Margin</Label>
          <NumberInput
            id={"image-margin"}
            className="w-20"
            value={margin}
            onChange={(value) => {
              onMarginChange?.(value);
            }}
            min={0}
            step={1}
          />
        </div>
      )}
    </div>
  );
}
