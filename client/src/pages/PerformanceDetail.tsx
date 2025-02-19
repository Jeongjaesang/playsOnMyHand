import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { PerformanceHeader } from "@/components/performance/PerformanceHeader";
import { PerformanceInfo } from "@/components/performance/PerformanceInfo";
import { PerformanceDescription } from "@/components/performance/PerformanceDescription";
import { PerformanceLocation } from "@/components/performance/PerformanceLocation";
import { PerformanceShare } from "@/components/performance/PerformanceShare";
import { PerformanceComments } from "@/components/performance/PerformanceComments";
import { BookingSection } from "@/components/performance/BookingSection";
import { Performance } from "@/types/performance";

// 이 부분은 실제 API 호출로 대체되어야 합니다
const fetchPerformanceDetails = async (id: string) => {
  // 임시 데이터
  return {
    id,
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
  };
};

export default function PerformanceDetail() {
  const { id } = useParams();
  const [performance, setPerformance] = useState<Performance | null>(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<any[]>([]);

  console.log(`id=${id}`);
  console.log(performance);

  useEffect(() => {
    const loadPerformance = async () => {
      const data = await fetchPerformanceDetails(id as string);
      setPerformance(data);
    };
    loadPerformance();
  }, [id]);

  const handleCommentSubmit = (comment: string) => {
    if (comment.trim()) {
      setComments([
        ...comments,
        { id: Date.now(), text: comment, likes: 0, replies: [] },
      ]);
      setComment("");
    }
  };

  const handleShare = (platform: string) => {
    // 실제 구현에서는 각 플랫폼의 공유 API를 사용해야 합니다
    console.log(`Sharing on ${platform}`);
  };

  if (!performance) return <div>Loading...</div>;

  return (
    <div className="grid gap-4 md:grid-cols-3 md:gap-8">
      <div className="md:col-span-2">
        <PerformanceHeader
          title={performance.title}
          image={performance.image}
        />
        <PerformanceInfo {...performance} />
        <PerformanceDescription description={performance.description} />
        <PerformanceLocation mapUrl={performance.mapUrl} />
        <PerformanceShare onShare={handleShare} />
        <PerformanceComments
          comments={comments}
          onSubmit={handleCommentSubmit}
        />
      </div>
      <div>
        <BookingSection />
      </div>
    </div>
  );
}
