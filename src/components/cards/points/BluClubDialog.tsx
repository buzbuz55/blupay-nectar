import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Gem, Crown } from "lucide-react";

export const BluClubDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-purple-600">
          <Gem className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>THE BLUCLUB - Exclusive Access</DialogTitle>
        </DialogHeader>
        <div className="space-y-8 py-4">
          <p className="text-sm text-gray-600">
            Welcome to THE BLUCLUB - where luxury meets exclusivity. As a BLUCLUB member, you gain access to an extraordinary world of privileges and experiences.
          </p>

          <section>
            <h4 className="font-semibold mb-4">Top Exclusive Private Clubs</h4>
            <div className="space-y-4">
              <div className="p-4 bg-purple-50 rounded-lg">
                <h5 className="font-medium text-purple-800">The Yacht Club de Monaco</h5>
                <p className="text-sm text-purple-600">One of the world's most prestigious yacht clubs, offering access to exclusive regattas and Mediterranean experiences.</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h5 className="font-medium text-purple-800">Soho House Worldwide</h5>
                <p className="text-sm text-purple-600">A social club for creatives, combining luxury spaces with intimate gatherings across major cities.</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h5 className="font-medium text-purple-800">Club 33 - Disneyland</h5>
                <p className="text-sm text-purple-600">Ultra-exclusive club inside Disneyland offering high-end dining and special park access.</p>
              </div>
            </div>
          </section>

          <section>
            <h4 className="font-semibold mb-4">Exclusive Perks</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <div className="mt-1 p-1 bg-purple-100 rounded">
                  <Crown className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium">24/7 Concierge Service</p>
                  <p className="text-sm text-gray-600">Personal assistance anytime, anywhere</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="mt-1 p-1 bg-purple-100 rounded">
                  <Crown className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium">Priority Access</p>
                  <p className="text-sm text-gray-600">First access to exclusive events and experiences</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="mt-1 p-1 bg-purple-100 rounded">
                  <Crown className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium">Enhanced Points</p>
                  <p className="text-sm text-gray-600">2x points on all transactions</p>
                </div>
              </li>
            </ul>
          </section>

          <section>
            <h4 className="font-semibold mb-4">Premium Destinations</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gradient-to-r from-purple-100 to-blue-50 rounded-lg">
                <h5 className="font-medium mb-2">Monaco</h5>
                <p className="text-sm text-gray-600">Experience the epitome of luxury with access to the Monaco Grand Prix and exclusive events.</p>
              </div>
              <div className="p-4 bg-gradient-to-r from-purple-100 to-blue-50 rounded-lg">
                <h5 className="font-medium mb-2">St. Barthélemy</h5>
                <p className="text-sm text-gray-600">Enjoy private villas and yacht charters in this Caribbean paradise.</p>
              </div>
              <div className="p-4 bg-gradient-to-r from-purple-100 to-blue-50 rounded-lg">
                <h5 className="font-medium mb-2">Dubai</h5>
                <p className="text-sm text-gray-600">Access to exclusive resorts and private beaches in the city of luxury.</p>
              </div>
            </div>
          </section>

          <div className="text-center pt-4 border-t">
            <a 
              href="https://blupay.com/bluclub" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block text-sm text-purple-600 hover:text-purple-700 hover:underline"
            >
              Visit BluPay.com/bluclub for complete list of exclusive clubs and destinations →
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};