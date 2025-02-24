import { useState } from "react";
import {
  Calendar,
  Trash2,
  ChevronDown,
  ChevronUp,
  MapPin,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/shadcn/button";
import { Badge } from "@/components/shadcn/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/shadcn/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../shadcn/tooltip";
import LikedPerformanceItem from "./LikedPerformanceItem";

interface Performance {
  id: number;
  title: string;
  date: string;
  venue: string;
  type: string;
  ticketDeadline: string;
}

interface LikedPerformancesProps {
  performances: Performance[];
  onRemove: (id: number) => void;
}

const isDateApproaching = (date: string, days = 7) => {
  const now = new Date();
  const targetDate = new Date(date);
  const timeDiff = targetDate.getTime() - now.getTime();
  const dayDiff = timeDiff / (1000 * 3600 * 24);
  return dayDiff <= days && dayDiff > 0;
};

export function LikedPerformances({
  performances,
  onRemove,
}: LikedPerformancesProps) {
  // performances 정보를 해당 컴포넌트에서 가져오는게 더 나으려나?

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortedPerformances, setSortedPerformances] = useState(performances);

  const handleSort = () => {
    const sorted = [...sortedPerformances].sort((a, b) => {
      if (sortOrder === "asc") {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      } else {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });
    setSortedPerformances(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <>
      <div className="flex flex-col items-start justify-between mb-4 space-y-2 sm:flex-row sm:items-center sm:space-y-0">
        <Select
          onValueChange={(value) => setSortOrder(value as "asc" | "desc")}
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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sortedPerformances.map((performance) => (
          <LikedPerformanceItem
            key={performance.id}
            performance={performance}
            onRemove={onRemove}
          />
        ))}
      </div>
    </>
  );
}
