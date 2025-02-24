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

interface Performance {
  id: number;
  title: string;
  date: string;
  venue: string;
  type: string;
  ticketDeadline: string;
}

const isDateApproaching = (date: string, days = 7) => {
  const now = new Date();
  const targetDate = new Date(date);
  const timeDiff = targetDate.getTime() - now.getTime();
  const dayDiff = timeDiff / (1000 * 3600 * 24);
  return dayDiff <= days && dayDiff > 0;
};

function LikedPerformanceItem({
  performance,
  onRemove,
}: {
  performance: Performance;
  onRemove: (id: number) => void;
}) {
  return (
    <Card key={performance.id} className="flex flex-col h-full">
      <CardHeader className="flex flex-row items-start justify-between pb-2 space-y-0">
        <div>
          <CardTitle className="mb-1 text-lg">{performance.title}</CardTitle>
          <Badge variant="secondary" className="mb-2">
            {performance.type}
          </Badge>
          {(isDateApproaching(performance.date) ||
            isDateApproaching(performance.ticketDeadline)) && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {isDateApproaching(performance.ticketDeadline)
                      ? `티켓 예매 마감 ${Math.ceil(
                          (new Date(performance.ticketDeadline).getTime() -
                            new Date().getTime()) /
                            (1000 * 60 * 60 * 24)
                        )}일 전!`
                      : `공연 ${Math.ceil(
                          (new Date(performance.date).getTime() -
                            new Date().getTime()) /
                            (1000 * 60 * 60 * 24)
                        )}일 전!`}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onRemove(performance.id)}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex items-center mb-2">
          <Calendar className="w-4 h-4 mr-2" />
          <span className="text-sm text-gray-600">{performance.date}</span>
        </div>
        <div className="flex items-center">
          <MapPin className="w-4 h-4 mr-2" />
          <span className="text-sm text-gray-600">{performance.venue}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => window.open(`/booking/${performance.id}`, "_blank")}
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          예매하기
        </Button>
      </CardFooter>
    </Card>
  );
}

export default LikedPerformanceItem;
