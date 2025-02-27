import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import { NotificationSettingsForm } from "./NotificationSettingsForm";

export default function NotificationSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>알림 설정</CardTitle>
        <CardDescription>알림 수신 방식을 설정하세요.</CardDescription>
      </CardHeader>
      <CardContent>
        <NotificationSettingsForm />
      </CardContent>
    </Card>
  );
}
