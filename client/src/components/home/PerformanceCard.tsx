import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { Button } from "@/components/shadcn/button";
import { Performance } from "@/types/performance";

type PerformanceCard = Pick<
  Performance,
  "id" | "title" | "venue" | "date" | "categories" | "liked"
>;

interface PerformanceCardProps {
  performance: PerformanceCard;
  onLike: (performanceId: string) => void; // ✅ Accept onLike as a prop
}

export function PerformanceCard({ performance, onLike }: PerformanceCardProps) {
  return (
    <Link
      to={`/performance/${performance.id}`}
      className="block overflow-hidden transition-shadow duration-300 bg-white border border-gray-200 rounded-lg hover:shadow-md"
    >
      <div className="h-48 bg-gray-100"></div>
      <div className="p-4">
        <h2 className="mb-2 text-xl font-semibold text-gray-900">
          {performance.title}
        </h2>
        <p className="mb-2 text-gray-600">{performance.venue}</p>
        <p className="mb-2 text-gray-500">{performance.date}</p>
        <div className="flex items-center justify-between">
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
            {performance.categories}
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-600 hover:text-blue-600"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onLike(performance.id);
              // 찜하기 API 호출
            }}
          >
            <Heart className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </Link>
  );
}
