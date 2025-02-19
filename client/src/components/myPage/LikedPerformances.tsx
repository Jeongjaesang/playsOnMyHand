import { useState } from "react";
import { Calendar, Clock, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/shadcn/button";
import { Badge } from "@/components/shadcn/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/shadcn/alert";
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
  CardDescription,
  CardFooter,
} from "@/components/shadcn/card";

interface Performance {
  id: number;
  title: string;
  venue: string;
  date: string;
  category: string;
  isUrgent: boolean;
}

interface LikedPerformancesProps {
  performances: Performance[];
  onRemove: (id: number) => void;
}

export function LikedPerformances({
  performances,
  onRemove,
}: LikedPerformancesProps) {
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
      <div className="space-y-4">
        {sortedPerformances.map((performance) => (
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
                onClick={() => onRemove(performance.id)}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                삭제
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
