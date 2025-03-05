import api from "@/services/api"; // Use the centralized Axios instance
import { Performance } from "@/types/performance";

export async function fetchPerformances({
  page = 1,
  filters,
  searchTerm,
  location,
}: {
  page?: number;
  filters?: Record<string, any>;
  searchTerm?: string;
  location?: { lat: number; lon: number };
}) {
  console.log(`searchTerm=${searchTerm}`);
  console.log(`page=${page}`);
  const baseUrl = "/performances"; // Adjust based on your API

  return api
    .post(baseUrl, { page, filters, searchTerm, location })
    .then((res) => res.data);
}

/**
 * Sends a request to like/unlike a performance.
 * @param performanceId - The ID of the performance to like/unlike.
 * @returns The updated performance data.
 */
export async function likePerformance(performanceId: string) {
  return api
    .post(`/performances/${performanceId}/like`)
    .then((res) => res.data);
}

const performanceDetailDummyData = {
  id: "id",
  title: "햄릿",
  date: "2025-03-15 ~ 2025-04-15",
  venue: "세종문화회관",
  time: "평일 19:30, 주말 14:00, 18:00",
  price: "VIP 150,000원, R 120,000원, S 90,000원, A 60,000원",
  description:
    "셰익스피어의 4대 비극 중 하나인 '햄릿'은 덴마크의 왕자 햄릿이 아버지의 죽음에 대한 복수를 하는 과정을 그린 작품입니다. 인간의 본성, 도덕성, 정의에 대한 깊이 있는 탐구로 유명한 이 작품은 현대적인 해석과 함께 새롭게 선보입니다.",
  image: "/placeholder.svg?height=400&width=600",
  mapUrl:
    "https://maps.google.com/maps?q=세종문화회관&t=&z=13&ie=UTF8&iwloc=&output=embed",
  liked: true,
  categories: "theater",
  comments: [
    {
      id: "1",
      text: "이 공연 정말 기대돼요!",
      likes: 10,
      liked: false,

      replies: [
        {
          id: "101",
          text: "저도 너무 기대됩니다!",
          likes: 3,
          liked: false,
        },
        {
          id: "102",
          text: "이번 연출이 특히 기대된다고 하더라고요.",
          likes: 5,
          liked: false,
        },
      ],
    },
    {
      id: "2",
      text: "햄릿 공연은 항상 명작이죠.",
      likes: 8,
      liked: false,

      replies: [
        {
          id: "201",
          text: "맞아요, 이번 캐스팅도 훌륭하다고 들었습니다.",
          likes: 4,
          liked: false,
        },
      ],
    },
    {
      id: "3",
      text: "세종문화회관에서 하는 햄릿이라니 기대됩니다!",
      likes: 6,
      replies: [],
      liked: false,
    },
  ],
};

export const fetchPerformanceDetails = async (
  id: string
): Promise<Performance> => {
  const { data } = await api.get(`/performances/${id}`);
  return data;
};

export const postComment = async ({
  performanceId,
  text,
}: {
  performanceId: string;
  text: string;
}) => {
  const { data } = await api.post(`/performances/${performanceId}/comments`, {
    text,
  });
  return data;
};

interface AddReplyParams {
  performanceId: string;
  commentId: string;
  content: string;
}

// 대댓글 추가 요청 함수
export const addReply = async ({
  commentId,
  content,
  performanceId,
}: AddReplyParams) => {
  console.log("add Reply 호출!");
  const response = await api.post(`/performances/${performanceId}/replies`, {
    commentId,
    content,
  });
  return response.data;
};

export const toggleLikeComment = async ({
  commentId,
}: {
  commentId: string;
}) => {
  const response = await api.patch(`/comments/${commentId}/like`);
  return response.data; // 새로운 좋아요 개수를 반환한다고 가정
};

export const toggleLikeReply = async ({ replyId }: { replyId: string }) => {
  const response = await api.patch(`/likes/replies/${replyId}`);
  return response.data; // 새로운 좋아요 개수를 반환한다고 가정
};
