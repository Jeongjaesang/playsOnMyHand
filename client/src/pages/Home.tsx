import { useState, useEffect, useRef } from "react";
import { Sliders, MapPin, Search } from "lucide-react";
import { Button } from "@/components/shadcn/button";
import { useFilter } from "@/hooks/useFilter";
import { Filter, Filters } from "@/components/home/Filter";
import { PerformanceCard } from "@/components/home/PerformanceCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPerformances } from "@/services/performance";
import { useLikePerformance } from "@/hooks/useLikePerformance";
import { Performance } from "@/types/performance";
import { Input } from "@/components/shadcn/input";
import { useDebounce } from "@/hooks/useDebounce";
import { twMerge } from "tailwind-merge";

// ✅ 공연 정보 가져오는 API 호출
type Location = { lat: number; lon: number };

function isActiveColor(obj: Filters | Location | null): string {
  if (!obj) return "text-gray-600 bg-white border-gray-300";

  if ("lat" in obj && "lon" in obj) return "bg-gray-600 text-white";

  if (Array.isArray(obj.categories) && obj.categories.length === 0) {
    return "text-gray-600 bg-white border-gray-300";
  }

  if (obj.dateRange && Object.keys(obj.dateRange).length === 0) {
    return "text-gray-600 bg-white border-gray-300";
  }

  const hasValidValue = Object.values(obj).some((value) => {
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === "object" && value !== null) {
      return Object.keys(value).length > 0;
    }
    return value !== undefined && value !== false;
  });

  return hasValidValue
    ? "bg-gray-600 text-white"
    : "text-gray-600 bg-white border-gray-300";
}

export default function Home() {
  const { isFilterOpen, setIsFilterOpen, filters, handleFilter } = useFilter();
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [location, setLocation] = useState<Location | null>(null);
  const { handleLike } = useLikePerformance();

  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useRef<HTMLDivElement | null>(null);

  // ✅ fetchPerformances를 명확히 정의
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["performances", location, debouncedSearchTerm, filters],
      queryFn: ({ pageParam = 1 }) =>
        fetchPerformances({
          page: pageParam,
          searchTerm: debouncedSearchTerm || undefined,
          filters: Object.keys(filters).length > 0 ? filters : undefined,
          location: location || undefined,
        }),
      getNextPageParam: (lastPage) => lastPage.nextPage ?? false,
      initialPageParam: 1,
    });

  // ✅ Intersection Observer 최적화
  useEffect(() => {
    if (!lastElementRef.current || !hasNextPage) return;

    if (!observer.current) {
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) fetchNextPage();
        },
        { threshold: 1 }
      );
    }

    observer.current.observe(lastElementRef.current);
    return () => observer.current?.disconnect();
  }, [hasNextPage, fetchNextPage]);

  // ✅ Near Me 클릭 시 위치 정보 가져오기
  const handleGetLocation = async () => {
    if (location) {
      setLocation(null);
      return;
    }

    try {
      const permission = await navigator.permissions.query({
        name: "geolocation",
      });

      if (permission.state === "denied") {
        alert("위치 접근을 허용해야 합니다.");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (pos) =>
          setLocation({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
        (err) => alert("위치 정보를 가져올 수 없습니다.")
      );
    } catch (error) {
      console.error("위치 권한 확인 중 오류 발생:", error);
    }
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
            className={twMerge(
              "flex-1 sm:flex-initial",
              isActiveColor(filters)
            )}
          >
            <Sliders className="w-4 h-4 mr-2" /> Filters
          </Button>
          <Button
            onClick={handleGetLocation}
            variant="outline"
            className={twMerge(
              "flex-1 sm:flex-initial",
              isActiveColor(location)
            )}
          >
            <MapPin className="w-4 h-4 mr-2 " /> Near Me
          </Button>
        </div>
      </div>

      {/* 필터 모달 */}
      {isFilterOpen && (
        <Filter
          filters={filters}
          handleFilter={handleFilter}
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
        />
      )}

      {/* 공연 리스트 */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data?.pages.map((page) =>
          page.performances.map((performance: Performance) => (
            <PerformanceCard
              key={performance.id}
              performance={performance}
              onLike={handleLike}
            />
          ))
        )}
      </div>

      {/* 무한 스크롤 감지 */}
      <div ref={lastElementRef} className="h-1"></div>

      {isFetchingNextPage && (
        <p className="text-center text-gray-500">
          Loading more performances...
        </p>
      )}
    </div>
  );
}
