import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  NotificationCardType,
  NotificationTabType,
} from "@/types/notification";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function mapNotificationTypeToTab(
  cardType: NotificationCardType
): NotificationTabType {
  const typeMap: Record<NotificationCardType, NotificationTabType> = {
    reply: "comment",
    like: "comment",
    bookingAlert: "booking",
  };

  return typeMap[cardType];
}
