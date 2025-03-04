// import { create } from "zustand";

// // 📌 알림 상태 타입 정의
// interface Notification {
//   id: number;
//   type: "like" | "reply" | "bookingAlert";
//   message: string;
//   date: string;
//   performanceId: number;
// }

// interface NotificationState {
//   notificationsList: Notification[];
//   addNotification: (notification: Notification) => void;
//   removeNotification: (id: number) => void;
//   clearNotifications: () => void; // ✅ 로그아웃 시 초기화 함수
// }

// // 📌 Zustand Store 생성
// export const useNotificationStore = create<NotificationState>((set) => ({
//   notificationsList: [],

//   addNotification: (newNotification) =>
//     set((state) => ({
//       notificationsList: [...state.notificationsList, newNotification],
//     })),

//   removeNotification: (id) =>
//     set((state) => ({
//       notificationsList: state.notificationsList.filter((n) => n.id !== id),
//     })),

//   clearNotifications: () => set({ notificationsList: [] }), // ✅ 상태 초기화 함수 추가
// }));
