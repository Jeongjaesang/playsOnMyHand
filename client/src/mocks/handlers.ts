import { http, HttpResponse } from "msw";
import { faker } from "@faker-js/faker";
import { Performance } from "../types/performance";
import { Filters } from "@/components/home/Filter";

// Function to generate a fake performance
const generatePerformance = (id: number): Performance => ({
  id: id.toString(),
  title: faker.music.songName(),
  date: faker.date.future().toISOString().split("T")[0],
  categories: faker.helpers.arrayElement([
    "Musical",
    "Concert",
    "Play",
    "Dance",
    "Opera",
    "Comedy",
  ]),
  venue: faker.location.city(),
  time: `${faker.number.int({ min: 10, max: 20 })}:00`,
  price: `$${faker.commerce.price({ min: 10, max: 150, dec: 0 })}`,
  description: faker.lorem.paragraph(),
  image: faker.image.url(),
  mapUrl: faker.internet.url(),
  liked: faker.datatype.boolean(),
});

// Generate mock performances
const performances = Array.from({ length: 50 }, (_, i) =>
  generatePerformance(i + 1)
);

export const handlers = [
  // 🎭 Mock fetching paginated performances (GET)
  // http.get("/api/performances", async ({ request }) => {
  //   console.log("msw called");
  //   console.log(request);

  //   const url = new URL(request.url);
  //   const page = Number(url.searchParams.get("page")) || 1;
  //   const perPage = 10;
  //   const startIndex = (page - 1) * perPage;
  //   const paginatedData = performances.slice(startIndex, startIndex + perPage);

  //   return HttpResponse.json({
  //     total: performances.length,
  //     page,
  //     perPage,
  //     performances: paginatedData,
  //     nextPage: performances.length > startIndex + perPage ? page + 1 : null,
  //   });
  // }),

  // 🎯 Mock searching performances (POST)
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

    let filteredData = performances;

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
];
