export interface Comment {
  id: number;
  text: string;
  likes: number;
  replies: Reply[]; // Reply 타입을 사용하여 중첩 구조를 형성
}

export type Reply = Omit<Comment, "replies">; // replies 속성을 제외한 타입

export interface Performance {
  id: string;
  title: string;
  date: string;
  categories: string;
  venue: string;
  time: string;
  price: string;
  description: string;
  image: string;
  mapUrl: string;
  liked: boolean;
  comments: Comment[];
}
