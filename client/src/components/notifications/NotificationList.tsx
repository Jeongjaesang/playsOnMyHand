import NotificationCategory from "./NotificationCategory";
import { NotificationDataType } from "@/types/notification";

interface NotificationListProps {
  notificationsList: NotificationDataType;
}

export default function NotificationList({
  notificationsList,
}: NotificationListProps) {
  return (
    <>
      <NotificationCategory
        value="all"
        title="모든 알림"
        description="최근 알림들을 확인하세요."
        notifications={[
          ...notificationsList.comment,
          ...notificationsList.booking,
        ]}
      />
      <NotificationCategory
        value="comments"
        title="댓글 알림"
        description="내 댓글에 대한 반응을 확인하세요."
        notifications={notificationsList.comment}
      />
      <NotificationCategory
        value="bookings"
        title="예매 알림"
        description="찜한 공연의 예매 일정을 확인하세요."
        notifications={notificationsList.booking}
      />
    </>
  );
}
