"use client";

import { useState } from "react";
import {
  Calendar,
  Clock,
  Trash2,
  Edit2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

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
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [likedPerformancesList, setLikedPerformancesList] =
    useState(likedPerformances);
  const [commentsList, setCommentsList] = useState(userComments);

  const handleSort = () => {
    const sorted = [...likedPerformancesList].sort((a, b) => {
      if (sortOrder === "asc") {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      } else {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });
    setLikedPerformancesList(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleRemoveLiked = (id: number) => {
    setLikedPerformancesList(
      likedPerformancesList.filter((performance) => performance.id !== id)
    );
  };

  const handleRemoveComment = (id: number) => {
    setCommentsList(commentsList.filter((comment) => comment.id !== id));
  };

  return (
    <div className="min-h-screen font-sans bg-white">
      <main className="container p-2 mx-auto sm:p-4">
        <h1 className="mb-6 text-3xl font-bold text-gray-900">My Page</h1>

        <Tabs defaultValue="liked" className="mb-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="liked">찜한 공연</TabsTrigger>
            <TabsTrigger value="comments">내 댓글</TabsTrigger>
          </TabsList>

          <TabsContent value="liked">
            <Card className="p-2 sm:p-6">
              <CardHeader>
                <CardTitle>찜한 공연 목록</CardTitle>
                <CardDescription>
                  관심있는 공연들을 한눈에 확인하세요.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-start justify-between mb-4 space-y-2 sm:flex-row sm:items-center sm:space-y-0">
                  <Select
                    onValueChange={(value) =>
                      setSortOrder(value as "asc" | "desc")
                    }
                  >
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="정렬 방식" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="asc">예매 임박순</SelectItem>
                      <SelectItem value="desc">최신순</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    onClick={handleSort}
                    variant="outline"
                    size="sm"
                    className="w-full sm:w-auto"
                  >
                    {sortOrder === "asc" ? (
                      <ChevronUp className="w-4 h-4 mr-2" />
                    ) : (
                      <ChevronDown className="w-4 h-4 mr-2" />
                    )}
                    {sortOrder === "asc" ? "오름차순" : "내림차순"}
                  </Button>
                </div>
                <div className="space-y-4">
                  {likedPerformancesList.map((performance) => (
                    <Card key={performance.id} className="p-3 sm:p-6">
                      <CardHeader className="p-0 sm:p-6">
                        <CardTitle className="text-lg sm:text-xl">
                          {performance.title}
                        </CardTitle>
                        <CardDescription className="text-sm">
                          {performance.venue}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-0 pt-4 sm:p-6">
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          <span>{performance.date}</span>
                        </div>
                        <Badge className="mt-2">{performance.category}</Badge>
                        {performance.isUrgent && (
                          <Alert className="mt-2">
                            <Clock className="w-4 h-4" />
                            <AlertTitle>예매 임박</AlertTitle>
                            <AlertDescription>
                              이 공연의 예매 기간이 곧 마감됩니다.
                            </AlertDescription>
                          </Alert>
                        )}
                      </CardContent>
                      <CardFooter className="p-0 pt-4 sm:p-6">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRemoveLiked(performance.id)}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          삭제
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="comments">
            <Card className="p-2 sm:p-6">
              <CardHeader>
                <CardTitle>내가 작성한 댓글</CardTitle>
                <CardDescription>작성한 댓글들을 관리하세요.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {commentsList.map((comment) => (
                    <Card key={comment.id} className="p-3 sm:p-6">
                      <CardHeader className="p-0 sm:p-6">
                        <CardTitle className="text-md sm:text-lg">
                          {comment.performanceTitle}
                        </CardTitle>
                        <CardDescription className="text-xs sm:text-sm">
                          {comment.date}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-0 pt-4 sm:p-6">
                        <p className="text-sm text-gray-600">
                          {comment.comment}
                        </p>
                      </CardContent>
                      <CardFooter className="flex flex-col p-0 pt-4 space-y-2 sm:p-6 sm:flex-row sm:space-y-0 sm:space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full sm:w-auto"
                        >
                          <Edit2 className="w-4 h-4 mr-2" />
                          수정
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRemoveComment(comment.id)}
                          className="w-full sm:w-auto"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          삭제
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
