import { io, Socket } from "socket.io-client";
import { useAuthStore } from "../store/auth";

interface CustomSocket extends Socket {
  auth: {
    token?: string;
  } & Record<string, any>; // 기존 타입과 호환되도록 설정
}

let socket: CustomSocket | null = null;

// ✅ WebSocket 연결
export const connectSocket = () => {
  const { accessToken } = useAuthStore.getState();
  // 전역에서 acccessToken을 가져옴

  if (!accessToken) return;
  // accessToken이 없으면 연결하지 않음 => 로그인 상태에서만 연결

  socket = io("wss://your-socket-server.com", {
    auth: { token: accessToken }, // ✅ 초기 연결 시 accessToken 포함
  }); // 반환되는 값은 Socket 객체

  socket.on("connect", () => console.log("✅ WebSocket 연결 성공"));
  // socket이 연결되었을 때,

  socket.on("disconnect", () => console.log("❌ WebSocket 연결 해제됨"));
  // socket이 연결이 해제되었을 때,
};

// ✅ WebSocket 연결 해제
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

// ✅ accessToken이 변경되면 WebSocket 업데이트
export const updateSocketToken = (newAccessToken: string) => {
  if (socket) {
    socket.auth.token = newAccessToken; // ✅ 갱신된 accessToken 반영
    socket.disconnect().connect(); // ✅ WebSocket 재연결
  }
};
