import { Clock, DollarSign } from "lucide-react";

import { MapPin } from "lucide-react";

import { Calendar } from "lucide-react";

interface PerformanceInfoProps {
  date: string;
  venue: string;
  time: string;
  price: string;
}

export function PerformanceInfo({
  date,
  venue,
  time,
  price,
}: PerformanceInfoProps) {
  return (
    <div className="mb-6 space-y-4">
      <div className="flex items-center text-gray-600">
        <Calendar className="w-5 h-5 mr-2" />
        <span>{date}</span>
      </div>
      <div className="flex items-center text-gray-600">
        <MapPin className="w-5 h-5 mr-2" />
        <span>{venue}</span>
      </div>
      <div className="flex items-center text-gray-600">
        <Clock className="w-5 h-5 mr-2" />
        <span>{time}</span>
      </div>
      <div className="flex items-center text-gray-600">
        <DollarSign className="w-5 h-5 mr-2" />
        <span>{price}</span>
      </div>
    </div>
  );
}
