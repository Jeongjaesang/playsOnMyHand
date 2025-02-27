import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/select";
import { Label } from "@/components/shadcn/label";

interface SettingsSelectProps {
  id: string;
  label: string;
  description: string;
  value: string;
  onValueChange: (value: string) => void;
  options: { value: string; label: string }[];
}

export function SettingsSelect({
  id,
  label,
  description,
  value,
  onValueChange,
  options,
}: SettingsSelectProps) {
  return (
    <div className="flex items-center justify-between">
      <Label htmlFor={id} className="flex flex-col space-y-1">
        <span>{label}</span>
        <span className="text-sm font-normal text-gray-500">{description}</span>
      </Label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="알림 시기 선택" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
