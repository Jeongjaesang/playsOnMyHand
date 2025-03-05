import { http, HttpResponse, ws } from "msw";
import { Filters } from "@/components/home/Filter";
import performances from "./mockDatabase";

const notificationWs = ws.link("wss://chat.example.com");

export const handlers = [
  notificationWs.addEventListener("connection", ({ client }) => {
    client.addEventListener("message", (event) => {
      // 클라이언트에서 서버로 요청할때 event로 데이터를 확인 가능
      console.log("client sent:", event.data);
    });
  }),

  // 🎯 Mock searching performances (POST)
  // 홈페이지에서 공연데이터 가져오기 또는 필터링
  http.post("/api/performances", async ({ request }) => {
    console.log("post homePage called");

    const {
      page = 1,
      filters,
      searchTerm,
    } = (await request.json()) as {
      page?: number;
      filters?: Filters;
      searchTerm?: string;
    };

    let filteredData = [...performances];

    if (searchTerm) {
      filteredData = filteredData.filter((p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters) {
      console.log("filter true");
      console.log(filters);

      // 아직 데이터 형태가 어떻게 될 지 모르므로..
      if (filters.categories?.length) {
        filteredData = filteredData.filter((p) =>
          filters.categories?.includes(p.categories)
        );

        console.log("filteredData at middle", filteredData);
      }
      if (filters.location) {
        filteredData = filteredData.filter((p) => p.venue === filters.location);
      }
    }

    const perPage = 10;
    const startIndex = (page - 1) * perPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + perPage);
    console.log("data", paginatedData);

    return HttpResponse.json({
      total: filteredData.length,
      page,
      perPage,
      performances: paginatedData,
      nextPage: filteredData.length > startIndex + perPage ? page + 1 : null,
    });
  }),

  // ✅ `GET /performances/:id` (공연 상세 정보 가져오기)
  http.get("/api/performances/:id", async ({ params }) => {
    const { id } = params;

    // ✅ `mockDatabase`에서 해당 공연 찾기
    const performance = performances.find((p) => p.id === id);

    if (!performance) {
      return HttpResponse.json(
        { message: "Performance not found" },
        { status: 404 }
      );
    }

    return HttpResponse.json(performance, { status: 200 });
  }),

  // 댓글 추가
  http.post(
    "/api/performances/:performanceId/comments",
    async ({ params, request }) => {
      const performanceId = String(params.performanceId); // 🔹 타입 변환 (string 보장)
      // if (!performanceId) {
      //   return HttpResponse.json(
      //     { message: "Performance not found" },
      //     { status: 404 }
      //   );
      // }
      const { text } = (await request.json()) as { text: string };
      const performance = performances.find((p) => p.id === performanceId);
      if (!performance) {
        return HttpResponse.json(
          { message: "Performance not found" },
          { status: 404 }
        );
      }

      const newComment = {
        id: `c${Date.now()}`,
        performanceId,
        text,
        likes: 0,
        liked: false,
        replies: [],
      };

      performance.comments.push(newComment);

      return HttpResponse.json(newComment, { status: 201 });
    }
  ),

  // 대댓글 추가
  http.post(
    "/api/performances/:performanceId/replies",
    async ({ params, request }) => {
      console.log("Adding reply...");

      const performanceId = String(params.performanceId); // 🔹 타입 변환 (string 보장)

      const { commentId, content } = (await request.json()) as {
        commentId: string;
        content: string;
      };

      console.log(`performanceId=${performanceId}`);
      console.log(`commentId=${commentId}`);
      console.log(`content=${content}`);

      if (!commentId || !content) {
        return HttpResponse.json({ message: "Invalid data" }, { status: 400 });
      }

      // ✅ `mockDatabase`에서 해당 공연 찾기
      const performance = performances.find((p) => p.id === performanceId);
      if (!performance) {
        return HttpResponse.json(
          { message: "Performance not found" },
          { status: 404 }
        );
      }

      // ✅ `find()`를 사용하여 해당 댓글 찾기
      const parentComment = performance.comments.find(
        (comment) => comment.id === commentId
      );

      console.log(`parentComment=${parentComment}`);

      // ✅ 댓글이 존재하지 않으면 404 반환
      if (!parentComment) {
        return HttpResponse.json(
          { message: "Comment not found" },
          { status: 404 }
        );
      }

      const newReply = {
        id: Date.now().toString(),
        performanceId,
        commentId,
        text: content,
        likes: 0,
        liked: false, // ✅ 필드명 통일 (`isLiked`)
      };

      // ✅ 대댓글 추가
      parentComment.replies = parentComment.replies ?? []; // replies 배열 초기화
      parentComment.replies.push(newReply);

      console.log("Reply added:", newReply);

      return HttpResponse.json(newReply, { status: 201 });
    }
  ),

  // 대글 좋아요 토글
  http.patch("/api/comments/:commentId/like", async ({ params, request }) => {
    const { commentId } = params;

    console.log("댓글 좋아요 msw 호출!");

    // let body;
    // try {
    //   body = (await request.json()) as { userId: string };
    //   console.log("📌 요청 바디 (Parsed JSON):", body);
    // } catch (error) {
    //   console.error("❌ JSON 파싱 오류:", error);
    //   return HttpResponse.json(
    //     { message: "Invalid JSON format" },
    //     { status: 400 }
    //   );
    // }

    // if (!body || !body.userId) {
    //   return HttpResponse.json({ message: "Missing userId" }, { status: 400 });
    // }

    const comment = performances
      .flatMap((p) => p.comments)
      .find((c) => c.id === commentId);

    if (!comment) {
      return HttpResponse.json(
        { message: "Comment not found" },
        { status: 404 }
      );
    }

    if (comment.liked) {
      comment.liked = false;
      comment.likes -= 1;
    } else {
      comment.liked = true;
      comment.likes += 1;
    }

    return HttpResponse.json(
      { likes: comment.likes, isLiked: comment.liked },
      { status: 200 }
    );
  }),

  http.patch("/api/likes/replies/:replyId", async ({ params, request }) => {
    const { replyId } = params;
    // ✅ 요청 바디 타입을 명확히 지정
    const body = (await request.json()) as { userId: string };

    if (!body.userId) {
      return HttpResponse.json({ message: "Missing userId" }, { status: 400 });
    }
    const reply = performances
      .flatMap((p) => p.comments.flatMap((c) => c.replies))
      .find((r) => r.id === replyId);
    if (!reply) {
      return HttpResponse.json({ message: "Reply not found" }, { status: 404 });
    }

    if (reply.liked) {
      reply.liked = false;
      reply.likes -= 1;
    } else {
      reply.liked = true;
      reply.likes += 1;
    }

    return HttpResponse.json(
      { likes: reply.likes, isLiked: reply.liked },
      { status: 200 }
    );
  }),
];
