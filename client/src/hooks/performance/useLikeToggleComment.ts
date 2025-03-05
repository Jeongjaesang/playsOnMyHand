import { toggleLikeComment } from "@/services/performance";
import { Comment } from "@/types/performance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePerformanceCache } from "./usePerformance";

export const useLikeToggleComment = (performanceId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleLikeComment,

    onMutate: async ({ commentId }) => {
      // 현재 실행 중인 같은 키의 쿼리를 취소 (최신 데이터 요청 방지)
      const previousPerformance = queryClient.getQueryData([
        "performance",
        performanceId,
      ]);

      if (!previousPerformance) return;

      // 낙관적 업데이트 적용
      updatePerformanceCache(queryClient, performanceId, (oldData: any) => ({
        ...oldData,
        comments: oldData.comments.map((comment: Comment) =>
          comment.id === commentId
            ? { ...comment, likes: comment.likes + 1, liked: !comment.liked }
            : comment
        ),
      }));

      console.log(`✅ 댓글 ${commentId} 좋아요 업데이트: onMutate`);

      return { previousPerformance };
    },

    onError: (err, _, context) => {
      console.error("❌ 댓글 좋아요 업데이트 실패:", err);
      // 에러 발생 시 기존 데이터로 롤백
      if (context?.previousPerformance) {
        queryClient.setQueryData(
          ["performance", performanceId],
          context.previousPerformance
        );
      }
    },

    // onSuccess: (newLikes, { commentId }) => {
    //   console.log(`✅ 댓글 ${commentId} 좋아요 업데이트: ${newLikes}`);

    //   queryClient.setQueryData(
    //     ["performance", performanceId],
    //     (oldData: any) => ({
    //       ...oldData,
    //       comments: oldData.comments.map((comment: Comment) =>
    //         comment.id === commentId
    //           ? { ...comment, likes: newLikes, liked: !comment.liked }
    //           : comment
    //       ),
    //     })
    //   );
    // },

    onSettled: () => {
      // 최종적으로 최신 데이터를 다시 불러옴 (서버 데이터와 동기화)
      queryClient.invalidateQueries({
        queryKey: ["performance", performanceId],
      });

      console.log(`✅ 댓글 좋아요 업데이트: onSettled`);
    },
  });
};

// export const useLikeToggleComment = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: toggleLikeComment,
//     onSuccess: (newLikes, { commentId }) => {
//       console.log(`✅ 댓글 ${commentId} 좋아요 업데이트: ${newLikes}`);

//       // ✅ React Query 캐시 업데이트
//       queryClient.setQueryData(["comments"], (oldData: any) => {
//         // 문제점, comments로 캐시된 값이 없음! 여기부터 해결해야 함!
//         return oldData.map((comment: Comment) =>
//           comment.id === commentId
//             ? { ...comment, likes: newLikes, liked: !comment.liked }
//             : comment
//         );
//       });
//     },
//     onError: (error) => {
//       console.error("❌ 댓글 좋아요 업데이트 실패:", error);
//     },
//   });
// };
