import { Heart } from "lucide-react";
import { Button } from "../shadcn/button";

interface BookingSectionProps {
  onBooking?: () => void;
  onLike?: () => void;
}

export function BookingSection({ onBooking, onLike }: BookingSectionProps) {
  return (
    <div className="sticky p-4 bg-white border border-gray-200 rounded-lg shadow-sm top-4">
      <h2 className="mb-4 text-xl font-semibold text-gray-900">예매하기</h2>
      <Button className="w-full mb-2" onClick={onBooking}>
        예매처 바로가기
      </Button>
      <Button variant="outline" className="w-full" onClick={onLike}>
        <Heart className="w-4 h-4 mr-2" />
        관심 공연 등록
      </Button>
    </div>
  );
}
