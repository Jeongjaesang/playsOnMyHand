import React, { useState } from "react";
import { CommentForm } from "./CommentForm";
import { CommentList } from "./CommentList";
import { Comment } from "@/types/performance";

interface PerformanceCommentsProps {
  comments: Comment[];
  onSubmit: (comment: string) => void;
}

export function PerformanceComments({
  comments,
  onSubmit,
}: PerformanceCommentsProps) {
  console.log("comments in PerformanceComments");
  console.log(comments);

  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      onSubmit(comment);
      setComment("");
    }
  };

  return (
    <div>
      <h2 className="mb-2 text-lg font-semibold text-gray-900 md:text-xl md:mb-4">
        댓글
      </h2>
      <CommentForm
        value={comment}
        onChange={setComment}
        onSubmit={handleSubmit}
      />
      <CommentList comments={comments} />
    </div>
  );
}
