import { Comment, Performance, Reply } from "@/types/performance";
import { faker } from "@faker-js/faker";

const generateFakeReplies = (
  count: number,
  performanceId: string,
  commentId: string
): Reply[] => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    text: faker.lorem.sentence(),
    likes: faker.number.int({ min: 0, max: 100 }),
    liked: faker.datatype.boolean(),
    performanceId, // 공연 ID 추가
    commentId, // 댓글 ID 추가
  }));
};

const generateFakeComments = (
  count: number,
  performanceId: string
): Comment[] => {
  return Array.from({ length: count }, () => {
    const commentId = faker.string.uuid(); // 댓글 ID 생성

    return {
      id: commentId,
      text: faker.lorem.sentence(),
      likes: faker.number.int({ min: 0, max: 100 }),
      liked: faker.datatype.boolean(),
      performanceId, // 공연 ID 추가
      replies: generateFakeReplies(
        faker.number.int({ min: 0, max: 5 }),
        performanceId,
        commentId
      ), // 대댓글 생성
    };
  });
};

export const generateFakePerformance = (count: number): Performance[] => {
  return Array.from({ length: count }, () => {
    const performanceId = faker.string.uuid(); // 공연 ID 생성

    return {
      id: performanceId,
      title: faker.lorem.words(3),
      date: faker.date.future().toISOString(),
      categories: faker.helpers.arrayElement([
        "Musical",
        "Concert",
        "Play",
        "Dance",
        "Opera",
        "Comedy",
      ]),
      venue: faker.location.city(),
      time: `${faker.number.int({ min: 12, max: 22 })}:00`,
      price: `${faker.number
        .int({ min: 10000, max: 100000 })
        .toLocaleString()}원`,
      description: faker.lorem.paragraph(),
      image: faker.image.urlLoremFlickr({ category: "theater" }),
      mapUrl: faker.internet.url(),
      liked: faker.datatype.boolean(),
      comments: generateFakeComments(
        faker.number.int({ min: 0, max: 10 }),
        performanceId
      ), // 공연 ID 전달
    };
  });
};

const performances = generateFakePerformance(100);

export default performances;
