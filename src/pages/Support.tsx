import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { BlogArticles } from "@/components/support/BlogArticles";

const SupportPage = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="fixed top-0 left-0 right-0 h-2 bg-gray-200 rounded-b-xl hover:bg-gray-300 transition-colors" />
      </SheetTrigger>
      <SheetContent side="top" className="h-[90vh] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold text-center">Support & Guides</SheetTitle>
        </SheetHeader>
        <BlogArticles />
      </SheetContent>
    </Sheet>
  );
};

export default SupportPage;