import { X } from "lucide-react";
import { Participant } from "./types";

interface ParticipantsListProps {
  participants: Participant[];
  onRemove: (id: string) => void;
  showPercentages?: boolean;
  onPercentageChange?: (id: string, percentage: number) => void;
}

export const ParticipantsList = ({ 
  participants, 
  onRemove, 
  showPercentages,
  onPercentageChange 
}: ParticipantsListProps) => {
  return (
    <div className="space-y-2">
      {participants.map((participant) => (
        <div
          key={participant.id}
          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              {participant.identifier[0].toUpperCase()}
            </div>
            <span>{participant.identifier}</span>
          </div>
          <div className="flex items-center gap-2">
            {showPercentages && (
              <input
                type="number"
                min="0"
                max="100"
                value={participant.percentage || 0}
                onChange={(e) => onPercentageChange?.(participant.id, Number(e.target.value))}
                className="w-16 px-2 py-1 border rounded"
              />
            )}
            <button
              onClick={() => onRemove(participant.id)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};