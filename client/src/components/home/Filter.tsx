import { X } from "lucide-react";
import { Button } from "@/components/shadcn/button";
import { Checkbox } from "@/components/shadcn/checkbox";
import { Label } from "@/components/shadcn/label";
import { Switch } from "@/components/shadcn/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/shadcn/accordion";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { DateRange } from "react-day-picker";

export interface Filters {
  categories?: string[]; // 여러 카테고리 선택 가능
  location?: string; // 선택한 지역
  dateRange?: DateRange;
  showAvailableTickets?: boolean; // 티켓 가능 여부
  kidsFriendly?: boolean;
  awardWinning?: boolean;
  festival?: boolean;
}

interface FilterProps {
  filters: Filters;
  handleFilter: (newFilters: Partial<Filters>) => void; // 부분 업데이트 허용
  isOpen: boolean;
  onClose: () => void;
}

export function Filter({
  isOpen,
  onClose,
  handleFilter,
  filters,
}: FilterProps) {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/30" onClick={onClose} />
      <div
        className="fixed top-0 right-0 z-50 w-full h-full max-w-md p-6 overflow-y-auto bg-white shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Filters</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-gray-600"
          >
            <X className="w-6 h-6" />
          </Button>
        </div>

        {/* Category */}
        <div className="mb-6">
          <h3 className="mb-2 text-lg font-semibold text-gray-900">Category</h3>
          <div className="space-y-2">
            {["Musical", "Concert", "Play", "Dance", "Opera", "Comedy"].map(
              (category) => (
                <div className="flex items-center" key={category}>
                  <Checkbox
                    id={category}
                    name="category"
                    value={category}
                    checked={filters.categories?.includes(category) || false} // ✅ Controlled
                    onCheckedChange={(checked) =>
                      handleFilter({
                        categories: checked
                          ? [...(filters.categories || []), category]
                          : filters.categories?.filter(
                              (c: string) => c !== category
                            ) || [],
                      })
                    }
                  />
                  <Label htmlFor={category} className="ml-2 text-gray-700">
                    {category}
                  </Label>
                </div>
              )
            )}
          </div>
        </div>

        {/* Location */}
        <div className="mb-6">
          <h3 className="mb-2 text-lg font-semibold text-gray-900">Location</h3>
          <Select
            value={filters.location || ""}
            onValueChange={(value) => handleFilter({ location: value })}
          >
            <SelectTrigger className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500">
              <SelectValue placeholder="Select a location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="seoul">Seoul</SelectItem>
              <SelectItem value="busan">Busan</SelectItem>
              <SelectItem value="incheon">Incheon</SelectItem>
              <SelectItem value="daegu">Daegu</SelectItem>
              <SelectItem value="daejeon">Daejeon</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Date Range */}
        <div className="mb-6">
          <h3 className="mb-2 text-lg font-semibold text-gray-900">
            Date Range
          </h3>
          <DatePickerWithRange
            className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            value={filters.dateRange || { from: undefined, to: undefined }}
            onChange={(dateRange) => handleFilter({ dateRange })}
          />
        </div>

        {/* Ticket Availability */}
        <div className="flex items-center justify-between mb-6">
          <Label
            htmlFor="ticket-availability"
            className="text-lg font-semibold text-gray-900"
          >
            Show only available tickets
          </Label>
          <Switch
            id="ticket-availability"
            name="showAvailableTickets"
            checked={filters.showAvailableTickets || false} // ✅ Controlled
            onCheckedChange={(checked) =>
              handleFilter({ showAvailableTickets: checked })
            }
          />
        </div>

        {/* Additional Filters */}
        <Accordion type="single" collapsible className="mb-6">
          <AccordionItem value="additional-filters">
            <AccordionTrigger className="text-gray-900">
              Additional Filters
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                {[
                  {
                    id: "kids-friendly",
                    label: "Kids Friendly",
                    name: "kidsFriendly",
                  },
                  {
                    id: "award-winning",
                    label: "Award Winning",
                    name: "awardWinning",
                  },
                  {
                    id: "festival",
                    label: "Part of Festival",
                    name: "festival",
                  },
                ].map(({ id, label, name }) => (
                  <div className="flex items-center" key={id}>
                    <Checkbox
                      id={id}
                      name={name}
                      checked={
                        filters[
                          name as "kidsFriendly" | "awardWinning" | "festival"
                        ] || false
                      } // ✅ Controlled
                      onCheckedChange={(checked) =>
                        handleFilter({ [name]: checked })
                      }
                    />
                    <Label htmlFor={id} className="ml-2 text-gray-700">
                      {label}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Button
          type="submit"
          className="w-full text-white bg-blue-600 hover:bg-blue-700"
          onClick={onClose}
        >
          확인
        </Button>
      </div>
    </>
  );
}
