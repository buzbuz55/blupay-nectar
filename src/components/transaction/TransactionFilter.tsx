import { useState, useEffect } from "react";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";

interface TransactionFilterProps {
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onAmountChange: (value: string) => void;
}

export const TransactionFilter = ({ 
  onSearchChange,
  onCategoryChange,
  onAmountChange
}: TransactionFilterProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [amount, setAmount] = useState("");

  const categories = [
    "all",
    "shopping",
    "food",
    "transport",
    "entertainment",
    "bills",
    "other",
  ];

  useEffect(() => {
    onSearchChange(searchTerm);
  }, [searchTerm, onSearchChange]);

  useEffect(() => {
    onCategoryChange(category);
  }, [category, onCategoryChange]);

  useEffect(() => {
    onAmountChange(amount);
  }, [amount, onAmountChange]);

  return (
    <div className="space-y-4 bg-white p-4 rounded-lg shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <Input
          placeholder="Search transactions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
        
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full sm:w-[150px]"
        />
      </div>

      <div className="flex items-center gap-2">
        <DatePickerWithRange className="flex-1" />
        <Button variant="outline" size="icon">
          <Calendar className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};