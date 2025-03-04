import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { NotificationDataType } from "@/types/notification"; // ✅ 타입 정의 가져오기

// ✅ 서버에서 알림 목록 가져오는 API 함수
const fetchNotifications = async (): Promise<NotificationDataType> => {
  const { data } = await axios.get("/api/notifications");
  return data;
};

// ✅ React Query 훅 (v5 문법 적용)
export const useNotifications = () => {
  return useQuery({
    queryKey: ["notifications"], // ✅ 쿼리 키 지정
    queryFn: fetchNotifications, // ✅ 데이터 가져오는 함수
    staleTime: 1000 * 60 * 5, // ✅ 5분 동안 캐싱 유지
  });
};

// const initialNotifications: NotificationDataType = {
//   comment: [
//     {
//       id: 2,
//       type: "like",
//       message: "당신의 댓글에 좋아요가 달렸습니다!",
//       date: "2025-02-10",
//       performanceId: 1,
//     },
//     {
//       id: 3,
//       type: "reply",
//       message: "당신의 댓글에 답글이 달렸습니다!",
//       date: "2025-02-12",
//       performanceId: 1,
//     },
//   ],
//   booking: [
//     {
//       id: 4,
//       type: "bookingAlert",
//       message: '찜한 공연 "Swan Lake"의 예매가 3일 후 시작됩니다!',
//       date: "2025-02-15",
//       performanceId: 2,
//     },
//   ],
// };
