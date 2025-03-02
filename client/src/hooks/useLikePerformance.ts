import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likePerformance } from "@/services/performance";
import { ensureLoggedIn } from "@/utils/ensureLoginAndExecute";
import { useAuthStore } from "@/store/auth";
import { useModalStore } from "@/store/modal";

export function useLikePerformance() {
  const queryClient = useQueryClient();
  const { accessToken: isLoggedin } = useAuthStore();
  const { openLoginModal } = useModalStore();

  // console.log("useLikePerformance called");

  // 🎯 Define like mutation
  const likeMutation = useMutation({
    mutationFn: (performanceId: string) => likePerformance(performanceId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["performances"] }); // Refresh the list
    },
  }); // 서버로 좋아요 요청을 보냄 (낙관적 업데이트 처리는?)

  // 🎯 Define the function for handling likes
  const handleLike = (performanceId: string) => {
    ensureLoggedIn(!!isLoggedin, openLoginModal);
    likeMutation.mutate(performanceId);
  };

  return { handleLike };
}
