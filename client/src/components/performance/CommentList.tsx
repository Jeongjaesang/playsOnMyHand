import { useState } from "react";
import { Flag, ThumbsUp, MessageCircle } from "lucide-react";
import { Avatar } from "../shadcn/avatar";
import { Button } from "../shadcn/button";
import { Textarea } from "../shadcn/textarea";
import { useAddReply } from "@/hooks/performance/useAddComment"; // 대댓글 추가 훅
import { Comment, Reply } from "@/types/performance";
import { useLikeToggleComment } from "@/hooks/performance/useLikeToggleComment";
import { useLikeTogglewReply } from "@/hooks/performance/useLikeToggleReply";
import { cn } from "@/lib/utils"; // shadcn 기본 제공 유틸 (clsx 기반)

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
  comment: Comment | Reply;
  className?: string;
  showReplyButton?: boolean;
  onReplyClick?: () => void;
  onLike: () => void;
}

function BaseCommentItem({
  comment,
  className,
  showReplyButton,
  onReplyClick,
  onLike,
}: BaseCommentItemProps) {
  const { text, likes, liked } = comment;

  return (
    <div className={cn("p-3 rounded-lg bg-gray-50 md:p-4", className)}>
      <div className="flex items-start space-x-3">
        <Avatar />
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900">사용자</p>
          <p className="text-sm text-gray-700">{text}</p>
          <div className="flex items-center mt-2 space-x-2">
            <Button variant="ghost" size="sm" onClick={onLike}>
              <ThumbsUp
                className={cn("w-4 h-4 mr-1", liked && "text-pink-500")}
              />
              {likes}
            </Button>
            {showReplyButton && (
              <Button variant="ghost" size="sm" onClick={onReplyClick}>
                <MessageCircle className="w-4 h-4 mr-1" />
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
  const [isReplying, setIsReplying] = useState(false);

  const likeCommentMutation = useLikeToggleComment(comment.performanceId);

  const handleLike = () => {
    console.log("댓글 좋아요 함수 호출!");
    if (comment.liked) {
      alert("이미 좋아요를 눌렀습니다!");
      return;
    }
    likeCommentMutation.mutate({ commentId: comment.id });
  };

  return (
    <div>
      {/* 댓글 UI */}
      <BaseCommentItem
        comment={comment}
        showReplyButton
        onReplyClick={() => setIsReplying(!isReplying)}
        onLike={handleLike}
      />

      {/* 답글 입력 UI */}
      {isReplying && (
        <ReplyInput
          performanceId={comment.performanceId}
          commentId={comment.id}
          onClose={() => setIsReplying(false)}
        />
      )}

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
  reply: Reply;
  isFirstReply?: boolean;
}

function ReplyItem({ reply, isFirstReply }: ReplyProps) {
  const likeReplyMutation = useLikeTogglewReply();

  const handleLike = () => {
    if (reply.liked) {
      alert("이미 좋아요를 눌렀습니다!");
      return;
    }
    likeReplyMutation.mutate({ replyId: reply.id });
  };

  return (
    <BaseCommentItem
      comment={reply}
      onLike={handleLike}
      className={`${isFirstReply ? "pl-4 border-l-2 border-gray-200" : "pl-6"}`}
    />
  );
}

// ✅ 답글 입력 UI 추가
interface ReplyInputProps {
  commentId: string;
  performanceId: string;
  onClose: () => void;
}

function ReplyInput({ commentId, onClose, performanceId }: ReplyInputProps) {
  const [replyText, setReplyText] = useState("");
  const addReplyMutation = useAddReply();

  const handleAddReply = () => {
    if (!replyText.trim()) return;
    addReplyMutation.mutate(
      { commentId, text: replyText, performanceId },
      {
        onSuccess: () => {
          setReplyText(""); // 입력 필드 초기화
          onClose(); // 입력창 닫기
        },
      }
    );
  };

  return (
    <div className="p-3 mt-2 ml-6 bg-gray-100 border border-gray-300 rounded-lg">
      <Textarea
        value={replyText}
        onChange={(e) => setReplyText(e.target.value)}
        placeholder="답글을 입력하세요..."
        className="w-full p-2 border rounded-lg focus:ring-0 focus:outline-none"
      />
      <div className="flex justify-end mt-2 space-x-2">
        <Button variant="outline" size="sm" onClick={onClose}>
          취소
        </Button>
        <Button
          variant="default"
          size="sm"
          onClick={handleAddReply}
          disabled={addReplyMutation.status === "pending"}
        >
          {addReplyMutation.status === "pending" ? "등록 중..." : "답글 등록"}
        </Button>
      </div>
    </div>
  );
}
