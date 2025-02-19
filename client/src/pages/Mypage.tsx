import { useState } from "react";

import { TabLayout } from "@/components/common/TabLayout";
import { LikedPerformances } from "@/components/myPage/LikedPerformances";
import { UserComments } from "@/components/myPage/UserComments";

// 임시 데이터
const likedPerformances = [
  {
    id: 1,
    title: "Hamlet",
    venue: "Seoul Arts Center",
    date: "2025-02-15",
    category: "Theater",
    isUrgent: true,
  },
  {
    id: 2,
    title: "Swan Lake",
    venue: "National Theater of Korea",
    date: "2025-02-20",
    category: "Ballet",
    isUrgent: false,
  },
  {
    id: 3,
    title: "The Phantom of the Opera",
    venue: "Blue Square",
    date: "2025-02-25",
    category: "Musical",
    isUrgent: false,
  },
];

const userComments = [
  {
    id: 1,
    performanceTitle: "Hamlet",
    comment: "An amazing performance! The lead actor was phenomenal.",
    date: "2025-01-15",
  },
  {
    id: 2,
    performanceTitle: "Swan Lake",
    comment: "The choreography was breathtaking. A must-see for ballet lovers.",
    date: "2025-01-20",
  },
  {
    id: 3,
    performanceTitle: "The Phantom of the Opera",
    comment: "The music and set design were incredible. Highly recommended!",
    date: "2025-01-25",
  },
];

export default function MyPage() {
  // 상탯값 - 현재 선택된 탭으로 추가하기
  // const [selectedTab, setSelectedTab] = useState("liked");

  const [likedPerformancesList, setLikedPerformancesList] =
    useState(likedPerformances);
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
