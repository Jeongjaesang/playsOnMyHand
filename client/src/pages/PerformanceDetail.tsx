"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  Share2,
  ThumbsUp,
  Flag,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
  const [performance, setPerformance] = useState<any>(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<any[]>([]);

  useEffect(() => {
    const loadPerformance = async () => {
      const data = await fetchPerformanceDetails(id as string);
      setPerformance(data);
    };
    loadPerformance();
  }, [id]);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
    <div className="min-h-screen font-sans bg-white">
      <main className="container p-4 mx-auto">
        <div className="grid gap-4 md:grid-cols-3 md:gap-8">
          <div className="md:col-span-2">
            <h1 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl md:mb-4">
              {performance.title}
            </h1>
            <div className="relative h-[200px] md:h-[400px] mb-4 md:mb-6">
              <img
                src={performance.image || "/placeholder.svg"}
                alt={performance.title}
                className="object-cover w-full h-full rounded-lg"
              />
            </div>
            <div className="mb-6 space-y-4">
              <div className="flex items-center text-gray-600">
                <Calendar className="w-5 h-5 mr-2" />
                <span>{performance.date}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin className="w-5 h-5 mr-2" />
                <span>{performance.venue}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="w-5 h-5 mr-2" />
                <span>{performance.time}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <DollarSign className="w-5 h-5 mr-2" />
                <span>{performance.price}</span>
              </div>
            </div>
            <Accordion type="single" collapsible className="mb-6">
              <AccordionItem value="description">
                <AccordionTrigger>공연 상세 설명</AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-700">{performance.description}</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <div className="mb-6">
              <h2 className="mb-2 text-xl font-semibold text-gray-900">
                공연장 위치
              </h2>
              <iframe
                src={performance.mapUrl}
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="mb-6">
              <h2 className="mb-2 text-xl font-semibold text-gray-900">
                공유하기
              </h2>
              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={() => handleShare("kakaotalk")}
                  className="bg-[#FEE500] text-[#000000] hover:bg-[#F7D300]"
                >
                  <img
                    src="/kakao-logo.png"
                    width={20}
                    height={20}
                    alt="Kakao"
                    className="mr-2"
                  />
                  카카오톡
                </Button>
                <Button
                  onClick={() => handleShare("twitter")}
                  className="bg-[#1DA1F2] hover:bg-[#0C85D0] text-white"
                >
                  <svg
                    className="w-5 h-5 mr-2 fill-current"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                  Twitter
                </Button>
                <Button
                  onClick={() => handleShare("facebook")}
                  className="bg-[#1877F2] hover:bg-[#0C5FD0] text-white"
                >
                  <svg
                    className="w-5 h-5 mr-2 fill-current"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Facebook
                </Button>
                <Button
                  onClick={() =>
                    navigator.clipboard.writeText(window.location.href)
                  }
                  variant="outline"
                  className="text-gray-700 border-gray-300 hover:bg-gray-100"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  링크 복사
                </Button>
              </div>
            </div>
            <div>
              <h2 className="mb-2 text-lg font-semibold text-gray-900 md:text-xl md:mb-4">
                댓글
              </h2>
              <form onSubmit={handleCommentSubmit} className="mb-4 md:mb-6">
                <Textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="댓글을 입력하세요"
                  className="mb-2"
                />
                <Button type="submit">댓글 작성</Button>
              </form>
              <div className="space-y-3 md:space-y-4">
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="p-3 rounded-lg bg-gray-50 md:p-4"
                  >
                    <div className="flex items-start space-x-3">
                      <Avatar />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          사용자
                        </p>
                        <p className="text-sm text-gray-700">{comment.text}</p>
                        <div className="flex items-center mt-2 space-x-2">
                          <Button variant="ghost" size="sm">
                            <ThumbsUp className="w-4 h-4 mr-1" />
                            {comment.likes}
                          </Button>
                          <Button variant="ghost" size="sm">
                            답글
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Flag className="w-4 h-4 mr-1" />
                            신고
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <div className="sticky p-4 bg-white border border-gray-200 rounded-lg shadow-sm top-4">
              <h2 className="mb-4 text-xl font-semibold text-gray-900">
                예매하기
              </h2>
              <Button className="w-full mb-2">예매하기</Button>
              <Button variant="outline" className="w-full">
                <Heart className="w-4 h-4 mr-2" />
                관심 공연 등록
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
