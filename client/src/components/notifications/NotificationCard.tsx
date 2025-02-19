import { Card, CardTitle, CardDescription } from "@/components/shadcn/card";
import { Button } from "@/components/shadcn/button";
import { X } from "lucide-react";
import { getIcon } from "@/utils/getIcon";
import {
  NotificationCardType,
  NotificationTabType,
} from "@/types/notification";
import { mapNotificationTypeToTab } from "@/lib/utils";

interface NotificationCardProps {
  notification: {
    id: number;
    type: NotificationCardType; // booking, comment, reply
    message: string;
    date: string;
    performanceId?: number;
  };
  onDismiss: (type: NotificationTabType, id: number) => void;
  onClick: (notification: NotificationCardProps["notification"]) => void;
}

export function NotificationCard({
  notification,
  onDismiss,
  onClick,
}: NotificationCardProps) {
  const handleDismiss = () => {
    const tabType = mapNotificationTypeToTab(notification.type);
    onDismiss(tabType, notification.id);
  };

  return (
    <Card className="flex items-start justify-between p-4">
      <div
        className="flex-grow cursor-pointer"
        onClick={() => onClick(notification)}
      >
        <CardTitle className="mb-2 text-lg">
          {getIcon(notification.type)}
          {notification.message}
        </CardTitle>
        <CardDescription>{notification.date}</CardDescription>
      </div>
      <Button variant="ghost" size="sm" onClick={handleDismiss}>
        <X className="w-4 h-4" />
      </Button>
    </Card>
  );
}
