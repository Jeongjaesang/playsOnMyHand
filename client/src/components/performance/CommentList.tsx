import { Flag, ThumbsUp } from "lucide-react";
import { Avatar } from "../shadcn/avatar";
import { Button } from "../shadcn/button";
import { Comment, Reply as ReplyType } from "@/types/performance";

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
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
}

interface BaseCommentItemProps {
  id: number;
  text: string;
  likes: number;
  className?: string;
  showReplyButton?: boolean;
  onReplyClick?: () => void;
}

function BaseCommentItem({
  id,
  text,
  likes,
  className,
  showReplyButton,
}: BaseCommentItemProps) {
  return (
    <div className={`p-3 rounded-lg bg-gray-50 md:p-4 ${className}`}>
      <div className="flex items-start space-x-3">
        <Avatar />
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900">사용자</p>
          <p className="text-sm text-gray-700">{text}</p>
          <div className="flex items-center mt-2 space-x-2">
            <Button variant="ghost" size="sm">
              <ThumbsUp className="w-4 h-4 mr-1" />
              {likes}
            </Button>
            {showReplyButton && (
              <Button variant="ghost" size="sm">
                답글
              </Button>
            )}
            <Button variant="ghost" size="sm">
              <Flag className="w-4 h-4 mr-1" />
              신고
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface CommentItemProps {
  comment: Comment;
}

function CommentItem({ comment }: CommentItemProps) {
  return (
    <div>
      {/* 댓글 UI */}
      <BaseCommentItem
        id={comment.id}
        text={comment.text}
        likes={comment.likes}
        showReplyButton
        className=""
      />

      {/* 대댓글 목록 렌더링 */}
      {comment.replies.length > 0 && (
        <div className="pl-4 mt-4 space-y-2 border-l-2 border-gray-200">
          {comment.replies.map((reply, index) => (
            <ReplyItem
              key={reply.id}
              reply={reply}
              isFirstReply={index === 0}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface ReplyProps {
  reply: ReplyType;
  isFirstReply?: boolean;
}

function ReplyItem({ reply, isFirstReply }: ReplyProps) {
  return (
    <BaseCommentItem
      id={reply.id}
      text={reply.text}
      likes={reply.likes}
      className={`${isFirstReply ? "pl-4 border-l-2 border-gray-200" : "pl-6"}`}
    />
  );
}
