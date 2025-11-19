import { Options } from "qr-code-styling";

export const DEFAULT_QR_CODE_OPTIONS: Partial<Options> = {
  width: 300,
  height: 300,
  margin: 0,
  type: "canvas",
  imageOptions: {
    imageSize: 0.4,
    margin: 7,
    hideBackgroundDots: true,
  },
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
