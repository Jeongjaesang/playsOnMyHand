import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { Button } from "@/components/shadcn/button";

interface Performance {
  id: number;
  title: string;
  venue: string;
  date: string;
  category: string;
  liked: boolean;
}

interface PerformanceCardProps {
  performance: Performance;
}

export function PerformanceCard({ performance }: PerformanceCardProps) {
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
            {performance.category}
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-600 hover:text-blue-600"
          >
            <Heart className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </Link>
  );
}
