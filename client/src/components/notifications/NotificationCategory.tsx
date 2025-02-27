import { Notification } from "@/types/notification";
import { NotificationTabContent } from "@/components/notifications/NotificationTabContent";
import { NotificationCard } from "@/components/notifications/NotificationCard";
import { useNotifications } from "@/hooks/useNotifications";

interface NotificationCategoryProps {
  value: string;
  title: string;
  description: string;
  notifications: Notification[];
}

export default function NotificationCategory({
  value,
  title,
  description,
  notifications,
}: NotificationCategoryProps) {
  const { handleDismiss, handleNotificationClick } = useNotifications();

  return (
    <NotificationTabContent
      value={value}
      title={title}
      description={description}
    >
      <div className="space-y-4">
        {notifications.map((notification) => (
          <NotificationCard
            key={notification.id}
            notification={notification}
            onDismiss={handleDismiss}
            onClick={handleNotificationClick}
          />
        ))}
      </div>
    </NotificationTabContent>
  );
}
