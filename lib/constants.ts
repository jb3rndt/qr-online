import { Options } from "qr-code-styling";

export const DEFAULT_QR_CODE_OPTIONS: Partial<Options> = {
  width: 150,
  height: 150,
  type: "svg",
  dotsOptions: {
    color: "#000000",
    type: "square",
  },
  backgroundOptions: {
    color: "#FFFFFF00",
  },
};
