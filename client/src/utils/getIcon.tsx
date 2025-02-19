import { NotificationCardType } from "@/types/notification";
import { ShareSns } from "@/types/shareSns";
import { ThumbsUp, MessageSquare, Calendar, Bell } from "lucide-react";

type TIcon = NotificationCardType | "welcome" | ShareSns;
export const getIcon = (type: TIcon) => {
  const icons = {
    welcome: <Bell className="inline-block w-5 h-5 mr-2 text-purple-500" />,
    like: <ThumbsUp className="inline-block w-5 h-5 mr-2 text-blue-500" />,
    reply: (
      <MessageSquare className="inline-block w-5 h-5 mr-2 text-green-500" />
    ),
    bookingAlert: (
      <Calendar className="inline-block w-5 h-5 mr-2 text-red-500" />
    ),
    kakao: (
      <img
        src="/icons/kakao.svg"
        alt="kakao"
        className="inline-block w-5 h-5 mr-2"
      />
    ),
    twitter: (
      <img
        src="/icons/twitter.svg"
        alt="twitter"
        className="inline-block w-5 h-5 mr-2"
      />
    ),
    facebook: (
      <img
        src="/icons/facebook.svg"
        alt="facebook"
        className="inline-block w-5 h-5 mr-2"
      />
    ),
  };

  return icons[type];
};
