import { useState, useEffect } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import { Switch } from "@/components/shadcn/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/shadcn/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/shadcn/alert";
import { NotificationTabContent } from "@/components/notifications/NotificationTabContent";
import { NotificationCard } from "@/components/notifications/NotificationCard";
import { Bell } from "lucide-react";
import {
  Notification,
  NotificationDataType,
  NotificationTabType,
} from "@/types/notification";

const notifications: NotificationDataType = {
  comment: [
    {
      id: 2,
      type: "like",
      message:
        '당신의 댓글에 좋아요가 달렸습니다: "햄릿 공연이 정말 인상깊었어요!"',
      date: "2025-02-10",
      performanceId: 1,
    },
    {
      id: 3,
      type: "reply",
      message:
        '당신의 댓글에 답글이 달렸습니다: "저도 그 장면이 가장 인상깊었어요."',
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

export default function Notifications() {
  const [notificationsList, setNotificationsList] = useState(notifications);
  const [showWelcome, setShowWelcome] = useState(true);
  const [bookingReminder, setBookingReminder] = useState("3");

  useEffect(() => {
    // 실제 구현에서는 서버에서 사용자의 첫 로그인 여부를 확인해야 합니다
    const isFirstLogin = true;
    if (isFirstLogin) {
      setShowWelcome(true);
    }
  }, []);

  const handleDismiss = (type: NotificationTabType, id: number) => {
    // type : comment, booking
    const updatedList = { ...notificationsList };
    updatedList[type] = updatedList[type].filter(
      (notification) => notification.id !== id
    );

    setNotificationsList(updatedList);
  };

  const handleNotificationClick = (notification: Notification) => {
    // 실제 구현에서는 해당 댓글이나 공연 페이지로 이동해야 합니다
    console.log(`Navigating to notification: ${notification.id}`);
  };

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold text-gray-900">알림</h1>

      {showWelcome && (
        <Alert className="mb-6">
          <Bell className="w-4 h-4" />
          <AlertTitle>환영합니다!</AlertTitle>
          <AlertDescription>
            Performing Arts Hub에 오신 것을 환영합니다. 다양한 공연을
            즐겨보세요!
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="all" className="mb-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">전체</TabsTrigger>
          <TabsTrigger value="comments">댓글</TabsTrigger>
          <TabsTrigger value="bookings">예매</TabsTrigger>
        </TabsList>

        <NotificationTabContent
          value="all"
          title="모든 알림"
          description="최근 알림들을 확인하세요."
        >
          <div className="space-y-4">
            {notificationsList.comment
              .concat(notificationsList.booking)
              .map((notification) => (
                <NotificationCard
                  key={notification.id}
                  notification={notification}
                  onDismiss={handleDismiss}
                  onClick={handleNotificationClick}
                />
              ))}
          </div>
        </NotificationTabContent>
        <NotificationTabContent
          value="comments"
          title="댓글 알림"
          description="내 댓글에 대한 반응을 확인하세요."
        >
          <div className="space-y-4">
            {notificationsList.comment.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                onDismiss={handleDismiss}
                onClick={handleNotificationClick}
              />
            ))}
          </div>
        </NotificationTabContent>
        <NotificationTabContent
          value="bookings"
          title="예매 알림"
          description="찜한 공연의 예매 일정을 확인하세요."
        >
          <div className="space-y-4">
            {notificationsList.booking.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                onDismiss={handleDismiss}
                onClick={handleNotificationClick}
              />
            ))}
          </div>
        </NotificationTabContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>알림 설정</CardTitle>
          <CardDescription>알림 수신 방식을 설정하세요.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span>환영 알림 표시</span>
            <Switch checked={showWelcome} onCheckedChange={setShowWelcome} />
          </div>
          <div className="flex items-center justify-between">
            <span>예매 임박 알림</span>
            <Select value={bookingReminder} onValueChange={setBookingReminder}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="알림 시기 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1일 전</SelectItem>
                <SelectItem value="3">3일 전</SelectItem>
                <SelectItem value="7">7일 전</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
