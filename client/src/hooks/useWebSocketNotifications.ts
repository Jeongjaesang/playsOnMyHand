import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getExistingSocket } from "@/socket/socket";
import { useAuthStore } from "@/store/auth";

// ✅ WebSocket을 사용하여 실시간 알림을 React Query 캐시에 반영
export const useWebSocketNotifications = () => {
  // 기능: websocket 서버로부터 "notification"이벤트를 구독
  // => 서버로부터 notification 이 올 때 마다, react query의 캐시값에 반영

  const queryClient = useQueryClient();
  const accessToken = useAuthStore((state) => state.accessToken); // ✅ Zustand에서 accessToken 가져오기

  useEffect(() => {
    const socket = getExistingSocket();

    if (!accessToken || !socket) return;
    // 로그인 안했으면 사용안됨

    const handleNewNotification = (newNotification: Notification) => {
      // 웹 소켓 서버로부터 받은 값을 캐시에 반영하는 함수
      console.log("🔔 새로운 알림 수신:", newNotification);

      // ✅ React Query 캐시 업데이트 (기존 알림 목록에 추가)
      queryClient.setQueryData(
        ["notifications"],
        (oldData: Notification[] | undefined) => {
          if (!oldData) return [newNotification];
          return [...oldData, newNotification];
        }
      );
    };

    socket.on("notification", handleNewNotification);
    // "notification" 이벤트 구독!

    return () => {
      socket.off("notification", handleNewNotification);
    };
  }, [queryClient, accessToken]); // ✅ accessToken이 변경될 때만 실행
};
