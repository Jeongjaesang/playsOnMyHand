import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/shadcn/accordion";

interface PerformanceDescriptionProps {
  description: string;
}

export function PerformanceDescription({
  description,
}: PerformanceDescriptionProps) {
  return (
    <Accordion type="single" collapsible className="mb-6">
      <AccordionItem value="description">
        <AccordionTrigger>공연 상세 설명</AccordionTrigger>
        <AccordionContent>
          <p className="text-gray-700">{description}</p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
