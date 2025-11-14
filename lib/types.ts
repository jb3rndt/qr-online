export type Platform = "macos" | "windows" | "linux" | "mobile" | "other";

export enum QRCodeDataType {
  URL = "url",
  TEXT = "text",
  EMAIL = "email",
  PHONE = "phone",
  SMS = "sms",
  WIFI = "wifi",
}

export interface URLData {
  url: string;
}

export interface TextData {
  text: string;
}

export interface SMSData {
  phone: string;
  message: string;
}

export interface EmailData {
  email: string;
  subject: string;
  body: string;
}

export interface PhoneData {
  phone: string;
}

export interface WiFiData {
  ssid: string;
  password: string;
  encryption: "WPA" | "WEP" | "nopass";
}
