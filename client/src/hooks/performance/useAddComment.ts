import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Comment, Reply } from "@/types/performance";
import { postComment } from "@/services/performance";
import { addReply } from "@/services/performance"; // ✅ 분리한 API 함수 가져오기
import { updatePerformanceCache } from "./usePerformance";

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
        id: Date.now().toString(), // 임시 ID
        performanceId,
        text,
        likes: 0,
        replies: [],
        liked: false,
      };

      updatePerformanceCache(queryClient, performanceId, (oldData: any) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          comments: [...oldData.comments, optimisticComment],
        };
      });

      // queryClient.setQueryData(
      //   ["performance", performanceId],
      //   (oldData: any) => {
      //     if (!oldData) return oldData;
      //     return {
      //       ...oldData,
      //       comments: [...oldData.comments, optimisticComment],
      //     };
      //   }
      // );

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

export const useAddReply = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      performanceId,
      commentId,
      text,
    }: {
      performanceId: string;
      commentId: string;
      text: string;
    }) => addReply({ performanceId, commentId, content: text }), // ✅ 실제 API 호출

    // ✅ 낙관적 업데이트 적용
    onMutate: async ({ performanceId, commentId, text }) => {
      await queryClient.cancelQueries({
        queryKey: ["performance", performanceId],
      });

      // 기존 데이터 백업 (실패 시 롤백용)
      const previousPerformance = queryClient.getQueryData([
        "performance",
        performanceId,
      ]);

      // ✅ UI에 즉시 반영할 가짜 대댓글 (낙관적 업데이트)
      const optimisticReply: Reply = {
        id: Date.now().toString(), // 임시 ID
        performanceId,
        commentId,
        text,
        likes: 0,
        liked: false,
      };

      // ✅ performance 데이터에서 해당 comment에 대댓글 추가
      updatePerformanceCache(queryClient, performanceId, (oldData: any) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          comments: oldData.comments.map((comment: any) =>
            comment.id === commentId
              ? { ...comment, replies: [...comment.replies, optimisticReply] }
              : comment
          ),
        };
      });

      return { previousPerformance }; // 실패 시 rollback을 위한 데이터 반환
    },

    // ✅ 에러 발생 시 롤백
    onError: (_error, _newReply, context) => {
      if (context?.previousPerformance) {
        queryClient.setQueryData(
          ["performance", _newReply.performanceId],
          context.previousPerformance
        );
      }
    },

    // ✅ 성공 또는 실패 후 무조건 실행 (서버 데이터와 동기화)
    onSettled: (newReply, error, { performanceId }) => {
      queryClient.invalidateQueries({
        queryKey: ["performance", performanceId],
      });
    },
  });
};

// export const useAddReply = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: addReply, // ✅ API 함수 호출
//     onSuccess: (newReply, { commentId,performanceId }) => {
//       console.log("✅ 대댓글 추가 성공:", newReply);

//       // 기존 댓글 목록에서 대댓글이 추가된 댓글을 찾아서 업데이트
//       // queryClient.setQueryData(["comments"], (oldData: any) => {
//       //   if (!oldData) return;

//       //   return oldData.map((comment: any) =>
//       //     comment.id === commentId
//       //       ? { ...comment, replies: [...comment.replies, newReply] }
//       //       : comment
//       //   );
//       // });
// updatePerformanceCache(queryClient, performanceId,);

//     },
//     onError: (error) => {
//       console.error("❌ 대댓글 추가 실패:", error);
//     },
//   });
// };
