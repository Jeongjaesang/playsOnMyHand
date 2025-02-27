import { Switch } from "@/components/shadcn/switch";
import { Label } from "@/components/shadcn/label";

interface SettingsSwitchProps {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export function SettingsSwitch({
  id,
  label,
  description,
  checked,
  onCheckedChange,
}: SettingsSwitchProps) {
  return (
    <div className="flex items-center justify-between">
      <Label htmlFor={id} className="flex flex-col space-y-1">
        <span>{label}</span>
        <span className="text-sm font-normal text-gray-500">{description}</span>
      </Label>
      <Switch id={id} checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
}
