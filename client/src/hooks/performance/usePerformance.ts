import { fetchPerformanceDetails } from "@/services/performance";
import { QueryClient, useQuery } from "@tanstack/react-query";

// 이 부분은 실제 API 호출로 대체되어야 합니다

export const usePerformance = (id?: string) => {
  return useQuery({
    queryKey: ["performance", id],
    queryFn: () => fetchPerformanceDetails(id as string),
    enabled: !!id,
  });
};

export const updatePerformanceCache = (
  queryClient: QueryClient,
  performanceId: string,
  updater: (oldData: Performance) => Performance
) => {
  // 낙관적 업데이트 하는 부분 (여러곳에서 쓰이므로 따로 함수로 분리)
  queryClient.setQueryData(
    ["performance", performanceId],
    (oldData: Performance | undefined) => {
      if (!oldData) return oldData;
      return updater(oldData);
    }
  );
};
