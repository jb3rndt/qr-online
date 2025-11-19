"use client";

import { cn } from "@/lib/utils";
import { Options } from "qr-code-styling";
import { useState } from "react";
import { ColorInputForm } from "./input/ColorInputForm";
import {
  CornerDotTypeSelect,
  CornerSquareTypeSelect,
  DotTypeSelect,
} from "./input/DotTypeSelect";
import { ImageInputForm } from "./input/ImageInputForm";
import { NumberInput } from "./NumberInput";
import { QRCodeDataInputCard } from "./QRCodeDataInputCard";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";

export function QRCodeConfigurator({
  config,
  onConfigChange,
  className,
}: {
  config: Partial<Options>;
  onConfigChange: (config: Partial<Options>) => void;
  className?: string;
}) {
  const [warnNoData, setWarnNoData] = useState(false);

  const handleImageUpload = (image: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      onConfigChange({ ...config, image: e.target?.result as string });
    };
    reader.readAsDataURL(image);
  };

  function handleConfigChange(updatedConfig: Partial<Options>) {
    const newConfig = {
      ...config,
      ...updatedConfig,
    };
    setWarnNoData(!newConfig.data);
    onConfigChange(newConfig);
  }

  return (
    <div className={cn("flex flex-col gap-8", className)}>
      <QRCodeDataInputCard
        onDataChange={(data) =>
          handleConfigChange({
            data: data,
          })
        }
        warn={warnNoData}
      />

      <Card>
        <CardHeader>
          <CardTitle>Color</CardTitle>
        </CardHeader>
        <CardContent>
          <ColorInputForm
            foregroundColor={config.dotsOptions?.color ?? "#000000FF"}
            backgroundColor={config.backgroundOptions?.color ?? "#FFFFFF00"}
            onForegroundColorChange={(color) =>
              handleConfigChange({
                dotsOptions: { ...config.dotsOptions, color },
              })
            }
            onBackgroundColorChange={(color) =>
              handleConfigChange({
                backgroundOptions: { ...config.backgroundOptions, color },
              })
            }
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Size and Margin</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid w-full items-center gap-3">
            <Label htmlFor="margin">Margin</Label>
            <NumberInput
              id="margin"
              className="w-20"
              value={config.margin}
              onChange={(value) => {
                handleConfigChange({ margin: value });
              }}
              min={0}
              step={1}
            />
          </div>
          <div className="flex gap-4 flex-wrap">
            <div className="grid items-center gap-3">
              <Label htmlFor="width">Width</Label>
              <NumberInput
                id="width"
                className="w-20"
                value={config.width}
                onChange={(value) => {
                  handleConfigChange({ width: value });
                }}
                min={0}
                step={1}
              />
            </div>
            <div className="grid items-center gap-3">
              <Label htmlFor="height">Height</Label>
              <NumberInput
                id="height"
                className="w-20"
                value={config.height}
                onChange={(value) => {
                  handleConfigChange({ height: value });
                }}
                min={0}
                step={1}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Shape</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium">Dot Type</label>
            <DotTypeSelect
              value={config.dotsOptions?.type ?? "square"}
              onChange={(type) =>
                handleConfigChange({
                  dotsOptions: { ...config.dotsOptions, type },
                })
              }
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium">Corner Square Type</label>
            <CornerSquareTypeSelect
              value={config.cornersSquareOptions?.type ?? "none"}
              onChange={(type) =>
                handleConfigChange({
                  cornersSquareOptions: {
                    ...config.cornersSquareOptions,
                    type: type === "none" ? undefined : type,
                  },
                })
              }
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium">Corner Dot Type</label>
            <CornerDotTypeSelect
              value={config.cornersDotOptions?.type ?? "none"}
              onChange={(type) =>
                handleConfigChange({
                  cornersDotOptions: {
                    ...config.cornersDotOptions,
                    type: type === "none" ? undefined : type,
                  },
                })
              }
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Center Image</CardTitle>
        </CardHeader>
        <CardContent>
          <ImageInputForm
            image={config.image}
            imageSize={config.imageOptions?.imageSize ?? 0.4}
            hideBackgroundDots={config.imageOptions?.hideBackgroundDots ?? true}
            margin={config.imageOptions?.margin}
            onImageUpload={handleImageUpload}
            onImageRemove={() => handleConfigChange({ image: undefined })}
            onImageSizeChange={(size) =>
              handleConfigChange({
                imageOptions: { ...config.imageOptions, imageSize: size },
              })
            }
            onHideBackgroundDotsChange={(hide) =>
              handleConfigChange({
                imageOptions: {
                  ...config.imageOptions,
                  hideBackgroundDots: hide,
                },
              })
            }
            onMarginChange={(margin) =>
              handleConfigChange({
                imageOptions: { ...config.imageOptions, margin },
              })
            }
          />
        </CardContent>
      </Card>
    </div>
  );
}
