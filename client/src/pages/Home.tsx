import { useState, useEffect, useRef } from "react";
import { Search, Sliders, MapPin } from "lucide-react";
import { Button } from "@/components/shadcn/button";
import { Input } from "@/components/shadcn/input";
import { useFilter } from "@/hooks/useFilter";
import { Filter } from "@/components/home/Filter";
import { PerformanceCard } from "@/components/home/PerformanceCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPerformances } from "@/services/performance";
import { useLikePerformance } from "@/hooks/useLikePerformance";
import { Performance } from "@/types/performance";

// 리팩토링 할 내용:
// fetchPerformance를 어텋게 정의?
// filter 내용과 search 내용을 받아서 서버로부터 가져오게끔 하되,
// filter 내용과 서버 내용이 필수 매개변수가 아니게끔 정의함

// ✅ 공연 정보 가져오는 API 호출
export default function Home() {
  const { isFilterOpen, setIsFilterOpen } = useFilter();
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(
    null
  );

  const { handleLike } = useLikePerformance();

  // const observer = useRef<IntersectionObserver | null>(null);
  // const lastElementRef = useRef<HTMLDivElement | null>(null);

  // // 🎯 무한 스크롤 + 필터링 포함된 공연 정보 가져오기
  // const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
  //   useInfiniteQuery({
  //     queryKey: ["performances", searchTerm],
  //     queryFn: ({ pageParam = 1 }) =>
  //       fetchPerformances({ page: pageParam, searchTerm }),
  //     getNextPageParam: (lastPage) => lastPage.nextPage ?? false,
  //     initialPageParam: 1,
  //   });

  // // 🎯 Intersection Observer로 무한 스크롤 감지
  // useEffect(() => {
  //   if (!lastElementRef.current || !hasNextPage) return;
  //   observer.current = new IntersectionObserver(
  //     (entries) => {
  //       if (entries[0].isIntersecting) {
  //         fetchNextPage();
  //       }
  //     },
  //     { threshold: 1 }
  //   );
  //   observer.current.observe(lastElementRef.current);
  //   return () => observer.current?.disconnect();
  // }, [hasNextPage]);

  // 🎯 Near Me 클릭 시 위치 정보 가져오기
  const handleGetLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({ lat: pos.coords.latitude, lon: pos.coords.longitude });
      },
      (err) => {
        console.error("위치 정보를 가져올 수 없습니다:", err);
      }
    );
  };

  return (
    <div>
      {/* 검색 & 필터 버튼 */}
      <div className="flex flex-col items-center justify-between mb-4 space-y-4 sm:flex-row sm:mb-8 sm:space-y-0">
        <div className="relative w-full sm:w-1/2">
          <Search className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
          <Input
            type="text"
            placeholder="Search performances or venues"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-2 pl-10 pr-4 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="flex w-full space-x-2 sm:w-auto sm:space-x-4">
          <Button
            onClick={() => setIsFilterOpen(true)}
            variant="outline"
            className="flex-1 text-gray-600 border-gray-300 sm:flex-initial"
          >
            <Sliders className="w-4 h-4 mr-2" /> Filters
          </Button>
          <Button
            onClick={handleGetLocation}
            variant="outline"
            className="flex-1 text-gray-600 border-gray-300 sm:flex-initial"
          >
            <MapPin className="w-4 h-4 mr-2" /> Near Me
          </Button>
        </div>
      </div>

      {/* 필터 모달 */}
      {isFilterOpen && (
        <Filter isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />
      )}

      {/* 공연 리스트 */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* {data?.pages.flatMap((page) =>
          page.performances.map((performance: Performance) => (
            <PerformanceCard
              key={performance.id}
              performance={performance}
              onLike={handleLike}
            />
          ))
        )} */}
      </div>

      {/* 무한 스크롤 감지 */}
      {/* <div ref={lastElementRef} className="h-1"></div>

      {isFetchingNextPage && (
        <p className="text-center text-gray-500">
          Loading more performances...
        </p>
      )} */}
    </div>
  );
}
