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

interface FilterProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Filter({ isOpen, onClose }: FilterProps) {
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
            {["Musical", "Theater", "Classical", "Dance", "Opera"].map(
              (category) => (
                <div className="flex items-center" key={category}>
                  <Checkbox
                    id={category}
                    className="text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <Label htmlFor={category} className="ml-2 text-gray-700">
                    {category}
                  </Label>
                </div>
              )
            )}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="mb-2 text-lg font-semibold text-gray-900">Location</h3>
          <Select>
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
          <DatePickerWithRange className="border-gray-300 focus:border-blue-500 focus:ring-blue-500" />
        </div>

        {/* Ticket Availability */}
        <div className="flex items-center justify-between mb-6">
          <Label
            htmlFor="ticket-availability"
            className="text-lg font-semibold text-gray-900"
          >
            Show only available tickets
          </Label>
          <Switch id="ticket-availability" className="text-blue-600" />
        </div>

        {/* Additional Filters */}
        <Accordion type="single" collapsible className="mb-6">
          <AccordionItem value="additional-filters">
            <AccordionTrigger className="text-gray-900">
              Additional Filters
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Checkbox
                    id="kids-friendly"
                    className="text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <Label htmlFor="kids-friendly" className="ml-2 text-gray-700">
                    Kids Friendly
                  </Label>
                </div>
                <div className="flex items-center">
                  <Checkbox
                    id="award-winning"
                    className="text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <Label htmlFor="award-winning" className="ml-2 text-gray-700">
                    Award Winning
                  </Label>
                </div>
                <div className="flex items-center">
                  <Checkbox
                    id="festival"
                    className="text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <Label htmlFor="festival" className="ml-2 text-gray-700">
                    Part of Festival
                  </Label>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Button className="w-full text-white bg-blue-600 hover:bg-blue-700">
          Apply Filters
        </Button>
      </div>
    </>
  );
}
