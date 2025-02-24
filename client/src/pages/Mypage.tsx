import { useState } from "react";

import { TabLayout } from "@/components/common/TabLayout";
import { LikedPerformances } from "@/components/myPage/LikedPerformances";
import { UserComments } from "@/components/myPage/UserComments";

// 현재 날짜를 기준으로 더미 데이터 생성 함수
const generateDummyData = () => {
  const today = new Date();
  const addDays = (date: Date, days: number) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result.toISOString().split("T")[0];
  };

  return [
    {
      id: 1,
      title: "Hamlet",
      date: addDays(today, 30),
      venue: "Seoul Arts Center",
      type: "Theater",
      ticketDeadline: addDays(today, 25),
    },
    {
      id: 2,
      title: "Swan Lake",
      date: addDays(today, 5),
      venue: "National Theater of Korea",
      type: "Ballet",
      ticketDeadline: addDays(today, 2),
    },
    {
      id: 3,
      title: "The Phantom of the Opera",
      date: addDays(today, 15),
      venue: "Blue Square",
      type: "Musical",
      ticketDeadline: addDays(today, 10),
    },
    {
      id: 4,
      title: "Les Misérables",
      date: addDays(today, 3),
      venue: "Charlotte Theater",
      type: "Musical",
      ticketDeadline: addDays(today, 1),
    },
    {
      id: 5,
      title: "Madama Butterfly",
      date: addDays(today, 45),
      venue: "Seoul Opera House",
      type: "Opera",
      ticketDeadline: addDays(today, 40),
    },
  ];
};

const userComments = [
  {
    id: 1,
    performanceId: "1",
    performanceTitle: "Hamlet",
    comment: "An amazing performance! The lead actor was phenomenal.",
    date: "2025-01-15",
  },
  {
    id: 2,
    performanceId: "2",
    performanceTitle: "Swan Lake",
    comment: "The choreography was breathtaking. A must-see for ballet lovers.",
    date: "2025-01-20",
  },
  {
    id: 3,
    performanceId: "3",
    performanceTitle: "The Phantom of the Opera",
    comment: "The music and set design were incredible. Highly recommended!",
    date: "2025-01-25",
  },
];

export default function MyPage() {
  // 상탯값 - 현재 선택된 탭으로 추가하기
  // const [selectedTab, setSelectedTab] = useState("liked");

  const [likedPerformancesList, setLikedPerformancesList] = useState(
    generateDummyData()
  );
  const [commentsList, setCommentsList] = useState(userComments);

  const handleRemoveLiked = (id: number) => {
    setLikedPerformancesList(
      likedPerformancesList.filter((performance) => performance.id !== id)
    );
  };

  const handleRemoveComment = (id: number) => {
    setCommentsList(commentsList.filter((comment) => comment.id !== id));
  };

  const handleEditComment = (id: number) => {
    // 댓글 수정 로직 구현
    console.log("Edit comment:", id);
  };

  const tabItems = [
    {
      value: "liked",
      label: "찜한 공연",
      content: (
        <LikedPerformances
          performances={likedPerformancesList}
          onRemove={handleRemoveLiked}
        />
      ),
    },
    {
      value: "comments",
      label: "내 댓글",
      content: (
        <UserComments
          comments={commentsList}
          onRemove={handleRemoveComment}
          onEdit={handleEditComment}
        />
      ),
    },
  ];

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold text-gray-900">My Page</h1>
      <TabLayout
        items={tabItems}
        defaultValue="liked"
        title="찜한 공연 목록"
        description="관심있는 공연들을 한눈에 확인하세요."
      />
    </div>
  );
}
