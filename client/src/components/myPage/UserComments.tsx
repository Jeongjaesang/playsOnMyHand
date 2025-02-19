import { Edit2, Trash2 } from "lucide-react";
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
  performanceTitle: string;
  comment: string;
  date: string;
}

interface UserCommentsProps {
  comments: Comment[];
  onRemove: (id: number) => void;
  onEdit: (id: number) => void;
}

export function UserComments({
  comments,
  onRemove,
  onEdit,
}: UserCommentsProps) {
  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <Card key={comment.id} className="p-3 sm:p-6">
          <CardHeader className="p-0 sm:p-6">
            <CardTitle className="text-md sm:text-lg">
              {comment.performanceTitle}
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              {comment.date}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0 pt-4 sm:p-6">
            <p className="text-sm text-gray-600">{comment.comment}</p>
          </CardContent>
          <CardFooter className="flex flex-col p-0 pt-4 space-y-2 sm:p-6 sm:flex-row sm:space-y-0 sm:space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full sm:w-auto"
              onClick={() => onEdit(comment.id)}
            >
              <Edit2 className="w-4 h-4 mr-2" />
              수정
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onRemove(comment.id)}
              className="w-full sm:w-auto"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              삭제
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
