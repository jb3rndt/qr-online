import { Options } from "qr-code-styling";

export const DEFAULT_QR_CODE_OPTIONS: Partial<Options> = {
  width: 300,
  height: 300,
  type: "svg",
  dotsOptions: {
    color: "#000000FF",
    type: "square",
  },
  backgroundOptions: {
    color: "#FFFFFF00",
  },
};

export const DEFAULT_DATA_STRING =
  "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
