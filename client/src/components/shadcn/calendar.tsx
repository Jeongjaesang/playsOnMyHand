import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

interface DateRange {
  from: Date | undefined;
  to?: Date | undefined;
}

interface CalendarProps {
  initialRange?: DateRange;
  onSelect?: (range: { from: Date; to: Date }) => void;
}

const Calendar: React.FC<CalendarProps> = ({ initialRange, onSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedRange, setSelectedRange] = useState<{
    from: Date | null;
    to: Date | null;
  }>({
    from: null,
    to: null,
  });

  const [isMobile, setIsMobile] = useState(false);

  // 반응형 감지
  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 640);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    if (initialRange) {
      setSelectedRange({
        from: initialRange.from || null,
        to: initialRange.to || null,
      });
    }
  }, [initialRange]);

  // 특정 월의 첫째 날과 마지막 날 계산
  const getMonthData = (year: number, month: number) => {
    const firstDay = new Date(year, month, 1);
    // 해당 달의 첫째날 (1일)
    const lastDay = new Date(year, month + 1, 0);
    // 해당 달의 마지막날 (30일이나 31일 등)
    return {
      firstDay,
      lastDay,
      startDay: firstDay.getDay(),
      // 1일의 요일, 왜 필요한가? -> 달력 상, 1일 전까지 빈 공간을 채우기 위해.
      totalDays: lastDay.getDate(),
    };
  };

  const prevMonth = () =>
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  const nextMonth = () =>
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );

  // 날짜 선택 핸들러
  const handleDateClick = (date: Date) => {
    if (!selectedRange.from || (selectedRange.from && selectedRange.to)) {
      setSelectedRange({ from: date, to: null });
    } else if (selectedRange.from && date >= selectedRange.from) {
      setSelectedRange({ from: selectedRange.from, to: date });
      onSelect?.({ from: selectedRange.from, to: date });
    }
  };

  // 날짜가 선택된 범위 내에 있는지 확인
  const isInRange = (date: Date) => {
    return (
      selectedRange.from &&
      selectedRange.to &&
      date >= selectedRange.from &&
      date <= selectedRange.to
    );
  };

  // 특정 날짜 스타일 설정
  const getDayClass = (date: Date) => {
    const isSelected =
      selectedRange.from && selectedRange.from.getTime() === date.getTime();

    // 현재 선택된 날짜와 해당 날짜(30일 중의 어느 한 날)의 시간이 같을 때..
    // Question: 현재 getTime 까지 같을 수 있나? => 어차피 당일 00:00 로 초기화

    const isEnd =
      selectedRange.to && selectedRange.to.getTime() === date.getTime();

    const isBetween = isInRange(date);
    // 해당 날짜가 선택된 첫 날짜 이거나 끝 날짜 라면 검정색
    if (isSelected || isEnd) return "bg-black text-white rounded-lg";
    // 사이라면 회색
    if (isBetween) return "bg-gray-300 text-black";
    return "hover:bg-gray-200";
  };

  // 달력 렌더링 함수
  const renderMonth = (offset: number) => {
    // offset은 0 또는 1
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + offset;
    const { firstDay, totalDays, startDay } = getMonthData(year, month);

    return (
      <div
        key={month}
        className="w-full p-4 bg-white rounded-lg shadow-md sm:w-80"
      >
        <h2 className="mb-2 text-lg font-semibold text-center">
          {firstDay.toLocaleString("default", { month: "long" })} {year}
        </h2>

        {/* 요일 헤더 */}
        <div className="grid grid-cols-7 mb-1 font-medium text-center text-gray-600">
          {daysOfWeek.map((day) => (
            <div key={day} className="p-1">
              {day}
            </div>
          ))}
        </div>

        {/* 날짜들 */}
        <div className="grid grid-cols-7 text-center">
          {/* 이전 달 빈 칸 채우기 , 1일 전까지 빈공간 채우기*/}
          {Array(startDay)
            .fill(null)
            .map((_, index) => (
              <div key={`empty-${index}`} className="p-2 text-gray-300"></div>
            ))}

          {/* 현재 월의 날짜 */}
          {Array.from({ length: totalDays }, (_, i) => i + 1).map((day) => {
            const date = new Date(year, month, day);
            return (
              <button
                key={day}
                className={`p-2 transition ${getDayClass(date)}`}
                onClick={() => handleDateClick(date)}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center">
      {/* 상단 네비게이션 */}
      <div className="flex justify-between w-full max-w-[42rem] mb-4">
        <button onClick={prevMonth} className="p-2">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button onClick={nextMonth} className="p-2">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* 모바일에서는 하나, PC에서는 두 개 */}
      <div
        className={`flex ${
          isMobile ? "flex-col" : "flex-row sm:space-x-4"
        } w-full items-center`}
      >
        {renderMonth(0)}
        {!isMobile && renderMonth(1)}
      </div>
    </div>
  );
};

export default Calendar;
