import { fetchPerformanceDetails } from "@/services/performance";
import { useQuery } from "@tanstack/react-query";

// 이 부분은 실제 API 호출로 대체되어야 합니다

export const usePerformance = (id?: string) => {
  return useQuery({
    queryKey: ["performance", id],
    queryFn: () => fetchPerformanceDetails(id as string),
    enabled: !!id,
  });
};
