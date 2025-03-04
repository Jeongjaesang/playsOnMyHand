import { Tabs, TabsList, TabsTrigger } from "@/components/shadcn/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/shadcn/alert";
import { Bell } from "lucide-react";
import { useNotifications } from "@/hooks/useNotifications";
import NotificationList from "@/components/notifications/NotificationList";
import NotificationSettings from "@/components/notifications/NotificationSettings";

export default function Notifications() {
  // ✅ React Query에서 알림 목록 가져오기
  const { data: notificationsList, isLoading } = useNotifications();

  // ✅ 데이터가 로드 중일 때 로딩 UI 표시
  if (isLoading) {
    return <p>🔄 알림 불러오는 중...</p>;
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold text-gray-900">알림</h1>

      <Alert className="mb-6">
        <Bell className="w-4 h-4" />
        <AlertTitle>환영합니다!</AlertTitle>
        <AlertDescription>
          Performing Arts Hub에 오신 것을 환영합니다. 다양한 공연을 즐겨보세요!
        </AlertDescription>
      </Alert>
      {/* 알림 목록 */}
      <Tabs defaultValue="all" className="mb-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">전체</TabsTrigger>
          <TabsTrigger value="comments">댓글</TabsTrigger>
          <TabsTrigger value="bookings">예매</TabsTrigger>
        </TabsList>
        <NotificationList
          notificationsList={notificationsList || { comment: [], booking: [] }}
        />
      </Tabs>
      {/* 알림 설정 */}
      <NotificationSettings />
    </div>
  );
}
