import { Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export const SearchDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200">
          <Search className="w-5 h-5" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Search Transactions</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            id="search"
            placeholder="Search transactions..."
            className="col-span-3"
            autoFocus
          />
          <div className="space-y-4">
            <select className="w-full p-2 rounded-md border border-gray-300">
              <option value="all">All Categories</option>
              <option value="shopping">Shopping</option>
              <option value="food">Food</option>
              <option value="transport">Transport</option>
              <option value="entertainment">Entertainment</option>
              <option value="bills">Bills</option>
              <option value="other">Other</option>
            </select>
            <Input
              type="number"
              placeholder="Amount"
              className="w-full"
            />
            <div className="flex gap-2">
              <Input
                type="date"
                className="flex-1"
              />
              <Input
                type="date"
                className="flex-1"
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};