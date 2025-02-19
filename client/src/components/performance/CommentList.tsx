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
        <div key={comment.id} className="flex space-x-4">
          <div className="flex-1">
            <p className="text-gray-700">{comment.text}</p>
            <div className="mt-2 text-sm text-gray-500">
              좋아요 {comment.likes}개
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
