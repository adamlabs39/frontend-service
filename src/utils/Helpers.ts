export function formatPrice(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(price);
}

export function formatDate(date: Date, reverse: boolean = false) {
  if (date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    if (reverse) return `${year}-${month}-${day}`;
    else return `${day}-${month}-${year}`;
  } else return "";
}

export function formatTime(date: Date) {
  if (date) {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  } else return "";
}

export function getDateNow(type = "-") {
  let date = formatDate(new Date());
  if (type != "-") {
    date = date.replaceAll("-", type);
  }
  return date;
}

// Helper function to format date to dd-mm-yyyy hh:mm:ss
export function formatDateTime(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
}

export function dateToEpoch(dateString: Date) {
  const date = new Date(dateString);
  return Math.floor(date.getTime() / 1000);
}

export function epochToDate(
  epochTime: number,
  format: "none" | "dateTime" | "date" | "time" = "none"
) {
  const date = new Date(epochTime * 1000);

  if (format === "dateTime") {
    return formatDateTime(date);
  } else if (format === "date") {
    return formatDate(date);
  } else if (format === "time") {
    return formatTime(date);
  }

  return date;
}

// Function to set the desired time for startDate and endDate
export function setTimeForDate(
  date: Date,
  hours: number,
  minutes: number,
  seconds: number
) {
  const newDate = new Date(date); // Clone the date to avoid mutation
  newDate.setHours(hours, minutes, seconds, 0);
  return newDate;
}

export function setTimeToDate(time: string) {
  let date = new Date();
  const [hours, minutes, seconds] = time.split(":").map(Number);

  date.setHours(hours);
  date.setMinutes(minutes);
  date.setSeconds(seconds);
  return date;
}

export function setDateToTime(date: Date) {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
}

export function countAge(date: Date) {
  const now = new Date();
  let tahun = now.getFullYear() - date.getFullYear();
  let bulan = now.getMonth() - date.getMonth();
  let hari = now.getDate() - date.getDate();

  // Jika bulan kurang dari 0, kurangi satu tahun
  if (bulan < 0) {
    tahun--;
    bulan += 12;
  }

  // Jika hari kurang dari 0, kurangi satu bulan
  if (hari < 0) {
    bulan--;
    // Ambil jumlah hari dari bulan sebelumnya
    const bulanSebelumnya = new Date(now.getFullYear(), now.getMonth(), 0);
    hari += bulanSebelumnya.getDate();
  }

  return { tahun, bulan, hari };
}

export async function convertImageToBase64(url: string) {
  const response = await fetch(url);
  const blob = await response.blob();

  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

import JsBarcode from "jsbarcode";
import QRCode from "qrcode";

export function generateBarcode(barcodeValue: string) {
  var canvas = document.createElement("canvas");

  JsBarcode(canvas, barcodeValue, {
    format: "CODE128",
    displayValue: false,
  });

  return canvas.toDataURL("image/png");
}

export async function generateQRCode(QRCodeValue: string) {
  try {
    const url = await QRCode.toDataURL(QRCodeValue);
    return url;
  } catch (err) {
    throw err;
  }
}

import type { Module, SubModule, Feature, Allow } from "@/utils/Interface";
export function checkPermission(
  module: string,
  subModule: string,
  feature: string | null = null,
  allows: string | null = null
): boolean {
  const permissionData = localStorage.getItem("permission");
  if (!permissionData) return false;
  let listPermission: Module[];
  try {
    listPermission = JSON.parse(permissionData);
  } catch {
    return false;
  }
  if (!Array.isArray(listPermission)) return false;
  // Get Module
  const targetModule = listPermission.find((mod) => mod.module === module);
  if (!targetModule) return false;
  // Get SubModule
  const targetSubModule = targetModule.subModules.find(
    (subMod) => subMod.name === subModule
  );
  if (!targetSubModule) return false;
  if (feature) {
    // Get Feature
    const targetFeature = targetSubModule.features.find(
      (feat) => feat.name === feature
    );
    if (!targetFeature) return false;
    // Get Allow pada Feature
    if (allows) {
      return targetFeature.allows.some((allow) => allow.name === allows);
    }
    return true;
  }
  if (allows) {
    // Check for the specific "allow" in the sub-module
    return targetSubModule.allows.some((allow) => allow.name === allows);
  }
  return true;
}
