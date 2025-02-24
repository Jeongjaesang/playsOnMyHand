import { Flag } from "lucide-react";
import { ThumbsUp } from "lucide-react";
import { Avatar } from "../shadcn/avatar";
import { Button } from "../shadcn/button";

interface Comment {
  id: number;
  text: string;
  likes: number;
  replies: any[];
}

interface CommentListProps {
  comments: Comment[];
}

export function CommentList({ comments }: CommentListProps) {
  if (comments.length === 0) {
    return <p className="text-gray-500">아직 댓글이 없습니다.</p>;
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div key={comment.id} className="p-3 rounded-lg bg-gray-50 md:p-4">
          <div className="flex items-start space-x-3">
            <Avatar />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">사용자</p>
              <p className="text-sm text-gray-700">{comment.text}</p>
              <div className="flex items-center mt-2 space-x-2">
                <Button variant="ghost" size="sm">
                  <ThumbsUp className="w-4 h-4 mr-1" />
                  {comment.likes}
                </Button>
                <Button variant="ghost" size="sm">
                  답글
                </Button>
                <Button variant="ghost" size="sm">
                  <Flag className="w-4 h-4 mr-1" />
                  신고
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
