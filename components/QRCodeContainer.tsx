"use client";

import { DEFAULT_QR_CODE_OPTIONS } from "@/lib/constants";
import { useState } from "react";
import { QRCodeConfigurator } from "./QRCodeConfigurator";
import { QRCodeRenderer } from "./QRCodeRenderer";

export function QRCodeContainer() {
  const [options, setOptions] = useState(DEFAULT_QR_CODE_OPTIONS);

  return (
    <div className="flex flex-col max-md:flex-col-reverse md:flex-row gap-10 items-start justify-center p-4 md:p-10">
      <QRCodeConfigurator config={options} onConfigChange={setOptions} />
      <QRCodeRenderer
        options={options}
        className="sticky md:top-[calc(var(--nav-height)+2.5rem)] top-[calc(var(--nav-height))]"
      />
    </div>
  );
}
