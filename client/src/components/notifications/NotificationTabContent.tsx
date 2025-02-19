import { ReactNode } from "react";
import { TabsContent } from "@/components/shadcn/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";

interface NotificationTabContentProps {
  value: string;
  title: string;
  description: string;
  children: ReactNode;
}

export function NotificationTabContent({
  value,
  title,
  description,
  children,
}: NotificationTabContentProps) {
  return (
    <TabsContent value={value}>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">{children}</CardContent>
      </Card>
    </TabsContent>
  );
}
