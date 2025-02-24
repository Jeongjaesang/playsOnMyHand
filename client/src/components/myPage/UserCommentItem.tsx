import { ExternalLink, Trash2 } from "lucide-react";
import { Button } from "@/components/shadcn/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/shadcn/card";

interface Comment {
  id: number;
  performanceId: string;
  performanceTitle: string;
  comment: string;
  date: string;
}

interface UserCommentItemProps {
  comment: Comment;
  onRemove: (id: number) => void;
}

export function UserCommentItem({ comment, onRemove }: UserCommentItemProps) {
  return (
    <Card key={comment.id} className="p-4">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-md">{comment.performanceTitle}</CardTitle>
        <CardDescription className="text-sm">{comment.date}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">{comment.comment}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            window.open(`/performance/${comment.performanceId}`, "_blank")
          }
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          공연 상세보기
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onRemove(comment.id)}>
          <Trash2 className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
