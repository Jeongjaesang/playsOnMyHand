import type { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/shadcn/button";
// import { Calendar } from "@/components/shadcn/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn/popover";
import { CalendarIcon } from "lucide-react";
import Calendar from "../shadcn/calendar";

interface DatePickerWithRangeProps {
  value?: DateRange; // ✅ 현재 선택된 날짜 범위
  onChange: (dateRange: DateRange | undefined) => void; // ✅ 날짜 변경 이벤트 핸들러
  className?: string; // ✅ className 추가
}

export function DatePickerWithRange({
  className,
  value,
  onChange,
}: DatePickerWithRangeProps) {
  const handleRange = (dateRange: DateRange) => {
    onChange(dateRange);
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !value && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="w-4 h-4 mr-2" />
            {value?.from ? (
              value.to ? (
                <>
                  {value.from.toDateString()} - {value.to.toDateString()}
                </>
              ) : (
                value.from.toDateString()
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar initialRange={value} onSelect={handleRange} />
        </PopoverContent>
      </Popover>

      {/* ✅ Hidden Inputs to Submit Date Range */}
      <input
        type="hidden"
        name={`startDate`}
        value={value?.from?.toISOString() || ""}
      />
      <input
        type="hidden"
        name={`endDate`}
        value={value?.to?.toISOString() || ""}
      />
    </div>
  );
}
