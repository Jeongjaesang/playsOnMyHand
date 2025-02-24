import { useState } from "react";
import { Search, Sliders, MapPin } from "lucide-react";
import { Button } from "@/components/shadcn/button";
import { Input } from "@/components/shadcn/input";
import { useFilter } from "@/hooks/useFilter";
import { Filter } from "@/components/home/Filter";
import { PerformanceCard } from "@/components/home/PerformanceCard";

export default function Home() {
  const [performances, setPerformances] = useState([
    {
      id: 1,
      title: "Hamlet",
      venue: "Seoul Arts Center",
      date: "2025-02-15",
      category: "Theater",
      liked: false,
    },
    {
      id: 2,
      title: "Swan Lake",
      venue: "National Theater of Korea",
      date: "2025-02-20",
      category: "Ballet",
      liked: false,
    },
    {
      id: 3,
      title: "The Phantom of the Opera",
      venue: "Blue Square",
      date: "2025-02-25",
      category: "Musical",
      liked: true,
    },
  ]);

  const { isFilterOpen, setIsFilterOpen } = useFilter();

  return (
    <div>
      <div className="flex flex-col items-center justify-between mb-4 space-y-4 sm:flex-row sm:mb-8 sm:space-y-0">
        <div className="relative w-full sm:w-1/2">
          <Search className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
          <Input
            type="text"
            placeholder="Search performances or venues"
            className="w-full py-2 pl-10 pr-4 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="flex w-full space-x-2 sm:w-auto sm:space-x-4">
          <Button
            onClick={() => setIsFilterOpen(true)}
            variant="outline"
            className="flex-1 text-gray-600 border-gray-300 sm:flex-initial"
          >
            <Sliders className="w-4 h-4 mr-2" /> Filters
          </Button>
          <Button
            variant="outline"
            className="flex-1 text-gray-600 border-gray-300 sm:flex-initial"
          >
            <MapPin className="w-4 h-4 mr-2" /> Near Me
          </Button>
        </div>
      </div>

      {isFilterOpen && (
        <Filter isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {performances.map((performance) => (
          <PerformanceCard key={performance.id} performance={performance} />
        ))}
      </div>
    </div>
  );
}
