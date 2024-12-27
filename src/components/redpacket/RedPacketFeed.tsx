import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";

interface RedPacketPost {
  id: string;
  sender: string;
  amount: number;
  message: string;
  timestamp: string;
  avatarUrl?: string;
}

const mockFeed: RedPacketPost[] = [
  {
    id: "1",
    sender: "Sarah Chen",
    amount: 88,
    message: "Happy New Year! 新年快乐!",
    timestamp: "2 minutes ago"
  },
  {
    id: "2",
    sender: "Mike Wang",
    amount: 66,
    message: "Good fortune and prosperity! 恭喜发财!",
    timestamp: "5 minutes ago"
  }
];

export const RedPacketFeed = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Lucky Red Packets</h2>
      
      {mockFeed.map((post) => (
        <Card key={post.id} className="p-4 bg-white">
          <div className="flex items-start gap-4">
            <Avatar className="w-12 h-12 bg-red-100">
              <span className="text-lg font-semibold text-red-600">
                {post.sender.charAt(0)}
              </span>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{post.sender}</h3>
                  <p className="text-sm text-gray-500">{post.timestamp}</p>
                </div>
                <span className="text-red-600 font-semibold">
                  ${post.amount}
                </span>
              </div>
              
              <p className="mt-2 text-gray-700">{post.message}</p>
              
              <div className="mt-3 flex gap-2">
                <span className="text-sm text-gray-500">🧧 Red Packet</span>
                <span className="text-sm text-gray-500">•</span>
                <span className="text-sm text-gray-500">Tap to open</span>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};