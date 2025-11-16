"use client";

import { DEFAULT_QR_CODE_OPTIONS } from "@/lib/constants";
import { Options } from "qr-code-styling";
import { useState } from "react";
import { QRCodeConfigurator } from "./QRCodeConfigurator";
import { QRCodeRenderer } from "./QRCodeRenderer";

export function QRCodeContainer() {
  const [options, setOptions] = useState<Partial<Options>>(
    DEFAULT_QR_CODE_OPTIONS
  );

  return (
    <div className="flex flex-col md:flex-row gap-10 items-start justify-center p-4 md:p-10">
      <QRCodeConfigurator config={options} onConfigChange={setOptions} />
      <QRCodeRenderer options={options} className="sticky top-10" />
    </div>
  );
}
