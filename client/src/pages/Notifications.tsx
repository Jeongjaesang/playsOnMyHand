"use client";

import { useState, useEffect } from "react";
import { Bell, ThumbsUp, MessageSquare, Calendar, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// 임시 데이터
const notifications = [
  {
    id: 1,
    type: "welcome",
    message: "환영합니다! Performing Arts Hub에 오신 것을 환영합니다.",
    date: "2025-02-01",
  },
  {
    id: 2,
    type: "comment",
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
  {
    id: 4,
    type: "booking",
    message: '찜한 공연 "Swan Lake"의 예매가 3일 후 시작됩니다!',
    date: "2025-02-15",
    performanceId: 2,
  },
];

export default function NotificationsPage() {
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

  const handleDismiss = (id: number) => {
    setNotificationsList(
      notificationsList.filter((notification) => notification.id !== id)
    );
  };

  const handleNotificationClick = (notification: any) => {
    // 실제 구현에서는 해당 댓글이나 공연 페이지로 이동해야 합니다
    console.log(`Navigating to notification: ${notification.id}`);
  };

  return (
    <div className="min-h-screen font-sans bg-white">
      <main className="container p-4 mx-auto">
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

          <TabsContent value="all">
            <Card>
              <CardHeader>
                <CardTitle>모든 알림</CardTitle>
                <CardDescription>최근 알림들을 확인하세요.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notificationsList.map((notification) => (
                    <Card
                      key={notification.id}
                      className="flex items-start justify-between p-4"
                    >
                      <div
                        className="flex-grow cursor-pointer"
                        onClick={() => handleNotificationClick(notification)}
                      >
                        <CardTitle className="mb-2 text-lg">
                          {notification.type === "comment" && (
                            <ThumbsUp className="inline-block w-5 h-5 mr-2 text-blue-500" />
                          )}
                          {notification.type === "reply" && (
                            <MessageSquare className="inline-block w-5 h-5 mr-2 text-green-500" />
                          )}
                          {notification.type === "booking" && (
                            <Calendar className="inline-block w-5 h-5 mr-2 text-red-500" />
                          )}
                          {notification.message}
                        </CardTitle>
                        <CardDescription>{notification.date}</CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDismiss(notification.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="comments">
            <Card>
              <CardHeader>
                <CardTitle>댓글 알림</CardTitle>
                <CardDescription>
                  내 댓글에 대한 반응을 확인하세요.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notificationsList
                    .filter((n) => n.type === "comment" || n.type === "reply")
                    .map((notification) => (
                      <Card
                        key={notification.id}
                        className="flex items-start justify-between p-4"
                      >
                        <div
                          className="flex-grow cursor-pointer"
                          onClick={() => handleNotificationClick(notification)}
                        >
                          <CardTitle className="mb-2 text-lg">
                            {notification.type === "comment" && (
                              <ThumbsUp className="inline-block w-5 h-5 mr-2 text-blue-500" />
                            )}
                            {notification.type === "reply" && (
                              <MessageSquare className="inline-block w-5 h-5 mr-2 text-green-500" />
                            )}
                            {notification.message}
                          </CardTitle>
                          <CardDescription>{notification.date}</CardDescription>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDismiss(notification.id)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </Card>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>예매 알림</CardTitle>
                <CardDescription>
                  찜한 공연의 예매 일정을 확인하세요.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notificationsList
                    .filter((n) => n.type === "booking")
                    .map((notification) => (
                      <Card
                        key={notification.id}
                        className="flex items-start justify-between p-4"
                      >
                        <div
                          className="flex-grow cursor-pointer"
                          onClick={() => handleNotificationClick(notification)}
                        >
                          <CardTitle className="mb-2 text-lg">
                            <Calendar className="inline-block w-5 h-5 mr-2 text-red-500" />
                            {notification.message}
                          </CardTitle>
                          <CardDescription>{notification.date}</CardDescription>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDismiss(notification.id)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </Card>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
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
              <Select
                value={bookingReminder}
                onValueChange={setBookingReminder}
              >
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
      </main>
    </div>
  );
}
