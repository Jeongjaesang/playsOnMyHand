import { useState } from "react";
import { Switch } from "@/components/shadcn/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/select";
import { Label } from "@/components/shadcn/label";
import { SettingsSwitch } from "../common/SettingsSwitch";
import { SettingsSelect } from "../common/SettingsSelect";

export function NotificationSettingsForm() {
  const [bookingReminder, setBookingReminder] = useState("3");
  const [performanceDateReminder, setPerformanceDateReminder] = useState("3");
  const [showCancellationChanges, setShowCancellationChanges] = useState(true);
  const [showCommentReplies, setShowCommentReplies] = useState(true);
  const [showCommentLikes, setShowCommentLikes] = useState(true);
  const [commentLikesThreshold, setCommentLikesThreshold] = useState("10");

  return (
    <div className="space-y-6">
      <SettingsSelect
        id="booking-reminder"
        label="예매 임박 알림"
        description="찜한 공연의 예매 시작일이 다가오면 알려드립니다."
        value={bookingReminder}
        onValueChange={setBookingReminder}
        options={[
          { value: "1", label: "1일 전" },
          { value: "3", label: "3일 전" },
          { value: "7", label: "7일 전" },
        ]}
      />
      <SettingsSelect
        id="performance-date-reminder"
        label="공연일 임박 알림"
        description="찜한 공연의 실제 공연일이 다가오면 알려드립니다."
        value={performanceDateReminder}
        onValueChange={setPerformanceDateReminder}
        options={[
          { value: "1", label: "1일 전" },
          { value: "3", label: "3일 전" },
          { value: "7", label: "7일 전" },
        ]}
      />
      <SettingsSwitch
        id="cancellation-changes"
        label="공연 취소 / 변경 알림"
        description="찜한 공연이 취소되거나 일정이 변경되면 알려드립니다."
        checked={showCancellationChanges}
        onCheckedChange={setShowCancellationChanges}
      />
      <SettingsSwitch
        id="comment-replies"
        label="댓글 답글 알림"
        description="내가 작성한 댓글에 새로운 답글이 달리면 알려드립니다."
        checked={showCommentReplies}
        onCheckedChange={setShowCommentReplies}
      />
      <div className="flex items-center justify-between">
        <Label htmlFor="comment-likes" className="flex flex-col space-y-1">
          <span>댓글 좋아요 알림</span>
          <span className="text-sm font-normal text-gray-500">
            내가 작성한 댓글에 많은 좋아요가 달리면 알려드립니다.
          </span>
        </Label>
        <div className="flex items-center space-x-2">
          <Switch
            id="comment-likes"
            checked={showCommentLikes}
            onCheckedChange={setShowCommentLikes}
          />
          {showCommentLikes && (
            <Select
              value={commentLikesThreshold}
              onValueChange={setCommentLikesThreshold}
            >
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="좋아요 수" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5개 이상</SelectItem>
                <SelectItem value="10">10개 이상</SelectItem>
                <SelectItem value="20">20개 이상</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>
      </div>
    </div>
  );
}
