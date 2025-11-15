import {
  FileTextIcon,
  LinkIcon,
  MailIcon,
  MessageSquareIcon,
  PhoneIcon,
  TriangleAlert,
  WifiIcon,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  EmailData,
  PhoneData,
  QRCodeDataType,
  SMSData,
  TextData,
  URLData,
  WiFiData,
} from "@/lib/types";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { EmailDataForm } from "./input/EmailDataForm";
import { PhoneDataForm } from "./input/PhoneDataForm";
import { SMSDataForm } from "./input/SMSDataForm";
import { TextDataForm } from "./input/TextDataForm";
import { URLDataForm } from "./input/URLDataForm";
import { WiFiDataForm } from "./input/WiFiDataForm";

export function QRCodeDataInputCard({
  onDataChange,
  className,
  warn,
}: {
  onDataChange: (data: string) => void;
  className?: string;
  warn?: boolean;
}) {
  const [urlData, setURLData] = useState<URLData>();
  const [textData, setTextData] = useState<TextData>();
  const [emailData, setEmailData] = useState<EmailData>();
  const [phoneData, setPhoneData] = useState<PhoneData>();
  const [smsData, setSMSData] = useState<SMSData>();
  const [wifiData, setWiFiData] = useState<WiFiData>();
  function updateUrlData(newData: URLData) {
    setURLData(newData);
    onDataChange(newData.url);
  }
  function updateTextData(newData: TextData) {
    setTextData(newData);
    onDataChange(newData.text);
  }
  function updateEmailData(newData: EmailData) {
    setEmailData(newData);
    onDataChange(
      `mailto:${newData.email ?? ""}?subject=${newData.subject ?? ""}&body=${
        newData.body ?? ""
      }`
    );
  }
  function updatePhoneData(newData: PhoneData) {
    setPhoneData(newData);
    onDataChange(`tel:${newData.phone}`);
  }
  function updateSMSData(newData: SMSData) {
    setSMSData(newData);
    onDataChange(`smsto:${newData.phone}:${newData.message}`);
  }
  function updateWiFiData(newData: WiFiData) {
    setWiFiData(newData);
    onDataChange(
      `WIFI:T:${newData.encryption};S:${newData.ssid};P:${newData.password};;`
    );
  }

  function onTabChange(dataType: string) {
    switch (dataType) {
      case QRCodeDataType.URL:
        if (urlData) {
          updateUrlData(urlData);
        } else {
          onDataChange("");
        }
        break;
      case QRCodeDataType.TEXT:
        if (textData) {
          updateTextData(textData);
        } else {
          onDataChange("");
        }
        break;
      case QRCodeDataType.EMAIL:
        if (emailData) {
          updateEmailData(emailData);
        } else {
          onDataChange("");
        }
        break;
      case QRCodeDataType.PHONE:
        if (phoneData) {
          updatePhoneData(phoneData);
        } else {
          onDataChange("");
        }
        break;
      case QRCodeDataType.SMS:
        if (smsData) {
          updateSMSData(smsData);
        } else {
          onDataChange("");
        }
        break;
      case QRCodeDataType.WIFI:
        if (wifiData) {
          updateWiFiData(wifiData);
        } else {
          onDataChange("");
        }
        break;
      default:
        onDataChange("");
    }
  }

  const DATA_TYPES = {
    [QRCodeDataType.URL]: {
      label: "URL",
      icon: <LinkIcon />,
      InputForm: (
        <URLDataForm
          data={urlData}
          onDataChange={(data) => {
            setURLData(data);
            onDataChange(data.url);
          }}
        />
      ),
    },
    [QRCodeDataType.TEXT]: {
      label: "Text",
      icon: <FileTextIcon />,
      InputForm: (
        <TextDataForm
          key="text-data"
          data={textData}
          onDataChange={(data) => {
            setTextData(data);
            onDataChange(data.text);
          }}
        />
      ),
    },
    [QRCodeDataType.EMAIL]: {
      label: "Email",
      icon: <MailIcon />,
      InputForm: (
        <EmailDataForm
          data={emailData}
          onDataChange={(data) => {
            setEmailData(data);
            onDataChange(
              `mailto:${data.email ?? ""}?subject=${data.subject ?? ""}&body=${
                data.body ?? ""
              }`
            );
          }}
        />
      ),
    },
    [QRCodeDataType.PHONE]: {
      label: "Phone",
      icon: <PhoneIcon />,
      InputForm: (
        <PhoneDataForm
          data={phoneData}
          onDataChange={(data) => {
            setPhoneData(data);
            onDataChange(`tel:${data.phone}`);
          }}
        />
      ),
    },
    [QRCodeDataType.SMS]: {
      label: "SMS",
      icon: <MessageSquareIcon />,
      InputForm: (
        <SMSDataForm
          data={smsData}
          onDataChange={(data) => {
            setSMSData(data);
            onDataChange(`smsto:${data.phone}:${data.message}`);
          }}
        />
      ),
    },
    [QRCodeDataType.WIFI]: {
      label: "WiFi",
      icon: <WifiIcon />,
      InputForm: (
        <WiFiDataForm
          data={wifiData}
          onDataChange={(data) => {
            setWiFiData(data);
            onDataChange(
              `WIFI:T:${data.encryption};S:${data.ssid};P:${data.password};;`
            );
          }}
        />
      ),
    },
  };

  return (
    <Tabs
      defaultValue={QRCodeDataType.URL}
      onValueChange={onTabChange}
      className={className}
    >
      <TabsList>
        {Object.entries(DATA_TYPES).map(([key, type]) => (
          <TabsTrigger key={key} value={key}>
            {type.icon} {type.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {Object.entries(DATA_TYPES).map(([key, type]) => (
        <TabsContent value={key} key={key}>
          <Card className={cn(warn && "border-amber-300")}>
            <CardContent className="grid gap-6">
              {type.InputForm}
              {warn && (
                <div className="flex items-center text-amber-400 text-sm gap-2">
                  <TriangleAlert size={16} /> Enter your own data here
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  );
}
