import { toggleLikeReply } from "@/services/performance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useLikeTogglewReply = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleLikeReply,
    onSuccess: (newLikes, { replyId }) => {
      queryClient.setQueryData(["comments"], (oldData: any) => {
        return oldData.map((comment: any) => ({
          ...comment,
          replies: comment.replies.map((reply: any) =>
            reply.id === replyId
              ? { ...reply, likes: newLikes, isLiked: !reply.isLiked }
              : reply
          ),
        }));
      });
    },
  });
};
