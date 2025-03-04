import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Comment } from "@/types/performance";
import { postComment } from "@/services/performance";

export const useAddComment = (performanceId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ text }: { text: string }) =>
      postComment({ performanceId, text }),
    // ✅ 낙관적 업데이트 적용
    onMutate: async ({ text }) => {
      await queryClient.cancelQueries({
        queryKey: ["performance", performanceId],
      });
      // 왜 cancelQueries를 호출할까?
      // 만약 사용자가 댓글을 추가하는 순간, ["performance", performanceId] 쿼리가 백그라운드에서 데이터를 가져오고 있다면, 그 요청이 끝난 후 UI가 업데이트될 가능성이 있음.
      // 낙관적 업데이트를 적용하기 위해 onMutate에서 UI를 먼저 업데이트하는데, 기존의 오래된 요청이 먼저 끝나서 UI를 덮어쓸 수 있음.

      const previousPerformance = queryClient.getQueryData([
        "performance",
        performanceId,
      ]);

      // ✅ UI에 즉시 반영할 가짜 댓글 (낙관적 업데이트)
      const optimisticComment: Comment = {
        id: Date.now(), // 임시 ID
        text,
        likes: 0,
        replies: [],
      };

      queryClient.setQueryData(
        ["performance", performanceId],
        (oldData: any) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            comments: [...oldData.comments, optimisticComment],
          };
        }
      );

      return { previousPerformance }; // 실패 시 rollback을 위한 데이터 반환
    },
    // ✅ 에러 발생 시 롤백
    onError: (_error, _newComment, context) => {
      if (context?.previousPerformance) {
        queryClient.setQueryData(
          ["performance", performanceId],
          context.previousPerformance
        );
      }
    },
    // ✅ 성공 시 별도 처리 필요 없음 (이미 UI 반영됨)
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["performance", performanceId],
      });
    },
  });
};
