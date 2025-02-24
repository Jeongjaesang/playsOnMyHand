import { UserCommentItem } from "./UserCommentItem";

interface Comment {
  id: number;
  performanceId: string;
  performanceTitle: string;
  comment: string;
  date: string;
}

interface UserCommentsProps {
  comments: Comment[];
  onRemove: (id: number) => void;
  onEdit: (id: number) => void;
}

export function UserComments({ comments, onRemove }: UserCommentsProps) {
  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <UserCommentItem
          key={comment.id}
          comment={comment}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}
