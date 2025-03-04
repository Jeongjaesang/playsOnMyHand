// import { useNotificationStore } from "@/store/notifications";
import { io, Socket } from "socket.io-client";

interface CustomSocket extends Socket {
  auth: {
    token?: string;
  } & Record<string, any>; // 기존 타입과 호환되도록 설정
}

let socket: CustomSocket | null = null;

// ✅ 기존 WebSocket을 반환하는 함수
export const getExistingSocket = () => {
  return socket;
};

// ✅ WebSocket 연결  -- 로그인시 ,zustand에서 connectSocket, 로그아웃시 disconnectSocket,
// 새로고침이나 accessToken 만료시 updateSocketToken
export const connectSocket = (accessToken: string) => {
  if (!accessToken) return;
  // accessToken이 없으면 연결하지 않음 => 로그인 상태에서만 연결

  socket = io("wss://your-socket-server.com", {
    auth: { token: accessToken }, // ✅ 초기 연결 시 accessToken 포함
  }); // 반환되는 값은 Socket 객체

  socket.on("connect", () => console.log("✅ WebSocket 연결 성공"));
  // socket이 연결되었을 때,

  socket.on("disconnect", () => console.log("❌ WebSocket 연결 해제됨"));
  // socket이 연결이 해제되었을 때,

  // ✅ WebSocket에서 알림 이벤트 수신
  // socket.on("notification", (notification) => {
  //   console.log("🔔 새로운 알림 수신:", notification);
  //   // 서버로부터 수신할 때 마다 상태값에 추가하도록 함
  //   // useNotificationStore.getState().addNotification(notification);
  // });
};

// ✅ WebSocket 연결 해제
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

// ✅ accessToken이 변경되면 WebSocket 업데이트
// accessToken 이 변경될 때? : accessToken이 만료되서 다시 가져오거나, 새로고침 할 때.
export const updateSocketToken = (newAccessToken: string) => {
  if (socket) {
    socket.auth.token = newAccessToken; // ✅ 갱신된 accessToken 반영
    socket.disconnect().connect(); // ✅ WebSocket 재연결
  }
};
