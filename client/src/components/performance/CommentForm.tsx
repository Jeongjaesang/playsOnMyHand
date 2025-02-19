import { Button } from "@/components/shadcn/button";
import { Textarea } from "@/components/shadcn/textarea";

interface CommentFormProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function CommentForm({ value, onChange, onSubmit }: CommentFormProps) {
  return (
    <form onSubmit={onSubmit} className="mb-6">
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="댓글을 입력하세요..."
        className="mb-2"
      />
      <Button type="submit">댓글 작성</Button>
    </form>
  );
}
