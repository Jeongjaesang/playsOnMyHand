import { useState } from "react";
import {
  Notification,
  NotificationDataType,
  NotificationTabType,
} from "@/types/notification";

const initialNotifications: NotificationDataType = {
  comment: [
    {
      id: 2,
      type: "like",
      message: "당신의 댓글에 좋아요가 달렸습니다!",
      date: "2025-02-10",
      performanceId: 1,
    },
    {
      id: 3,
      type: "reply",
      message: "당신의 댓글에 답글이 달렸습니다!",
      date: "2025-02-12",
      performanceId: 1,
    },
  ],
  booking: [
    {
      id: 4,
      type: "bookingAlert",
      message: '찜한 공연 "Swan Lake"의 예매가 3일 후 시작됩니다!',
      date: "2025-02-15",
      performanceId: 2,
    },
  ],
};

export function useNotifications() {
  const [notificationsList, setNotificationsList] =
    useState(initialNotifications);
  const [showWelcome, setShowWelcome] = useState(true);

  const handleDismiss = (type: NotificationTabType, id: number) => {
    setNotificationsList((prev) => ({
      ...prev,
      [type]: prev[type].filter((notification) => notification.id !== id),
    }));
  };

  const handleNotificationClick = (notification: Notification) => {
    console.log(`Navigating to notification: ${notification.id}`);
  };

  return {
    notificationsList,
    showWelcome,
    setShowWelcome,
    handleDismiss,
    handleNotificationClick,
  };
}
