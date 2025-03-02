import api from "@/services/api"; // Use the centralized Axios instance

export async function fetchPerformances({
  page = 1,
  filters,
  searchTerm,
}: {
  page?: number;
  filters?: Record<string, any>;
  searchTerm?: string;
}) {
  console.log(`searchTerm=${searchTerm}`);
  console.log(`page=${page}`);
  const baseUrl = "/performances"; // Adjust based on your API

  // return filters || searchTerm
  // ?
  return api
    .post(baseUrl, { page, filters, searchTerm })
    .then((res) => res.data);
  // : api.get(baseUrl, { params: { page } }).then((res) => res.data);
}

/**
 * Sends a request to like/unlike a performance.
 * @param performanceId - The ID of the performance to like/unlike.
 * @returns The updated performance data.
 */
export async function likePerformance(performanceId: string) {
  return api
    .post(`/performances/${performanceId}/like`)
    .then((res) => res.data);
}
