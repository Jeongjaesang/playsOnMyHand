export type NotificationCardType = "reply" | "like" | "bookingAlert";

export type NotificationTabType = "comment" | "booking";

// 하나의 카드에 나타낼 수 있는 알림 타입
// 댓글 대댓 - reply
// 댓글 좋아요 - like
// 예매 임박 - booking

export interface Notification {
  id: number;
  type: NotificationCardType;
  message: string;
  date: string;
  performanceId?: number;
}

export interface NotificationDataType {
  comment: Notification[];
  booking: Notification[];
}
