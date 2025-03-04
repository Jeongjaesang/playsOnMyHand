import { useParams } from "react-router-dom";
import { usePerformance } from "@/hooks/performance/usePerformance";
import { useAddComment } from "@/hooks/performance/useAddComment";

import { PerformanceHeader } from "@/components/performance/PerformanceHeader";
import { PerformanceInfo } from "@/components/performance/PerformanceInfo";
import { PerformanceDescription } from "@/components/performance/PerformanceDescription";
import { PerformanceLocation } from "@/components/performance/PerformanceLocation";
import { PerformanceShare } from "@/components/performance/PerformanceShare";
import { PerformanceComments } from "@/components/performance/PerformanceComments";
import { BookingSection } from "@/components/performance/BookingSection";

export default function PerformanceDetail() {
  const { id } = useParams();
  const { data: performance, isLoading, error } = usePerformance(id);
  const { mutate: addComment } = useAddComment(id as string);

  const handleCommentSubmit = (commentText: string) => {
    if (commentText.trim()) {
      addComment({ text: commentText });
    }
  };

  const handleShare = (platform: string) => {
    console.log(`Sharing on ${platform}`);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading performance details</div>;
  if (!performance) return <div>No performance found</div>;

  return (
    <div className="grid gap-4 md:grid-cols-3 md:gap-8">
      <div className="md:col-span-2">
        <PerformanceHeader
          title={performance.title}
          image={performance.image}
        />
        <PerformanceInfo {...performance} />
        <PerformanceDescription description={performance.description} />
        <PerformanceLocation mapUrl={performance.mapUrl} />
        <PerformanceShare onShare={handleShare} />
        <PerformanceComments
          comments={performance.comments}
          onSubmit={handleCommentSubmit}
        />
      </div>
      <div>
        <BookingSection />
      </div>
    </div>
  );
}
