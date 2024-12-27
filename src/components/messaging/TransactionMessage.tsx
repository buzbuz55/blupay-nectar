import { useState } from "react";
import { MessageCircle, SmilePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

interface Message {
  id: string;
  userId: string;
  content: string;
  timestamp: Date;
}

interface Reaction {
  emoji: string;
  count: number;
  userIds: string[];
}

interface TransactionMessageProps {
  transactionId: string;
  messages?: Message[];
  reactions?: Reaction[];
}

export const TransactionMessage = ({
  transactionId,
  messages: initialMessages = [],
  reactions: initialReactions = [],
}: TransactionMessageProps) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [reactions, setReactions] = useState<Reaction[]>(initialReactions);
  const [newMessage, setNewMessage] = useState("");
  const { toast } = useToast();

  const handleAddMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Math.random().toString(36).substr(2, 9),
      userId: "current-user", // In a real app, this would come from auth
      content: newMessage,
      timestamp: new Date(),
    };

    setMessages([...messages, message]);
    setNewMessage("");
    
    toast({
      title: "Message sent",
      description: "Your message has been added to the transaction.",
    });
  };

  const handleAddReaction = (emoji: string) => {
    const existingReaction = reactions.find((r) => r.emoji === emoji);
    
    if (existingReaction) {
      const userId = "current-user"; // In a real app, this would come from auth
      const hasReacted = existingReaction.userIds.includes(userId);
      
      if (hasReacted) {
        setReactions(
          reactions.map((r) =>
            r.emoji === emoji
              ? {
                  ...r,
                  count: r.count - 1,
                  userIds: r.userIds.filter((id) => id !== userId),
                }
              : r
          ).filter((r) => r.count > 0)
        );
      } else {
        setReactions(
          reactions.map((r) =>
            r.emoji === emoji
              ? {
                  ...r,
                  count: r.count + 1,
                  userIds: [...r.userIds, userId],
                }
              : r
          )
        );
      }
    } else {
      setReactions([
        ...reactions,
        {
          emoji,
          count: 1,
          userIds: ["current-user"], // In a real app, this would come from auth
        },
      ]);
    }
  };

  const commonEmojis = ["👍", "❤️", "😊", "🎉", "👏", "🙌"];

  return (
    <div className="mt-4 space-y-4">
      <div className="flex gap-2">
        {reactions.map((reaction) => (
          <Button
            key={reaction.emoji}
            variant="outline"
            size="sm"
            onClick={() => handleAddReaction(reaction.emoji)}
            className={`text-sm ${
              reaction.userIds.includes("current-user")
                ? "bg-blue-50"
                : ""
            }`}
          >
            {reaction.emoji} {reaction.count}
          </Button>
        ))}
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm">
              <SmilePlus className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-2">
            <div className="grid grid-cols-6 gap-2">
              {commonEmojis.map((emoji) => (
                <Button
                  key={emoji}
                  variant="ghost"
                  size="sm"
                  onClick={() => handleAddReaction(emoji)}
                >
                  {emoji}
                </Button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.userId === "current-user"
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`rounded-lg px-4 py-2 max-w-[80%] ${
                message.userId === "current-user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <Textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1"
        />
        <Button onClick={handleAddMessage}>
          <MessageCircle className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};