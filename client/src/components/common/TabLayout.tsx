import { ReactNode } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shadcn/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/shadcn/card";

interface TabItem {
  value: string;
  label: string;
  content: ReactNode;
}

interface TabLayoutProps {
  items: TabItem[];
  defaultValue?: string;
  title?: string;
  description?: string;
}

export function TabLayout({
  items,
  defaultValue,
  title,
  description,
}: TabLayoutProps) {
  return (
    <Tabs defaultValue={defaultValue || items[0].value} className="mb-6">
      <TabsList className="grid w-full grid-cols-2">
        {items.map((item) => (
          <TabsTrigger key={item.value} value={item.value}>
            {item.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {items.map((item) => (
        <TabsContent key={item.value} value={item.value}>
          <Card className="p-2 sm:p-6">
            {(title || description) && (
              <CardHeader>
                {title && <CardTitle>{title}</CardTitle>}
                {description && (
                  <CardDescription>{description}</CardDescription>
                )}
              </CardHeader>
            )}
            <CardContent>{item.content}</CardContent>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  );
}
