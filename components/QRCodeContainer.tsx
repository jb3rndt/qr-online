"use client";

import { useState } from "react";
import { QRCodeConfigurator } from "./QRCodeConfigurator";
import { QRCodeRenderer } from "./QRCodeRenderer";
import { Options } from "qr-code-styling";
import { DEFAULT_QR_CODE_OPTIONS } from "@/lib/constants";

export function QRCodeContainer() {
  const [options, setOptions] = useState<Partial<Options>>(
    DEFAULT_QR_CODE_OPTIONS
  );

  return (
    <div className="flex gap-4 items-center">
      <QRCodeConfigurator config={options} onConfigChange={setOptions} />
      <QRCodeRenderer options={options} />
    </div>
  );
}
