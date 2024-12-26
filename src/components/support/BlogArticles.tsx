import { Clock } from "lucide-react";
import { Link } from "react-router-dom";

interface Article {
  id: string;
  title: string;
  readTime: number;
  image: string;
  slug: string;
}

const articles: Article[] = [
  {
    id: "1",
    title: "Understanding your crypto",
    readTime: 1,
    image: "/lovable-uploads/4e5cf938-5bdf-4bfd-8b66-e23932966f69.png",
    slug: "understanding-crypto"
  },
  {
    id: "2",
    title: "Crypto scams",
    readTime: 1,
    image: "/lovable-uploads/4e5cf938-5bdf-4bfd-8b66-e23932966f69.png",
    slug: "crypto-scams"
  },
  {
    id: "3",
    title: "Cash vs. Crypto",
    readTime: 1,
    image: "/lovable-uploads/4e5cf938-5bdf-4bfd-8b66-e23932966f69.png",
    slug: "cash-vs-crypto"
  },
  {
    id: "4",
    title: "What is blockchain?",
    readTime: 1,
    image: "/lovable-uploads/4e5cf938-5bdf-4bfd-8b66-e23932966f69.png",
    slug: "what-is-blockchain"
  },
  {
    id: "5",
    title: "Getting started with crypto",
    readTime: 1,
    image: "/lovable-uploads/6f7e4134-44d9-454c-a5d8-a766711c3c08.png",
    slug: "getting-started"
  },
  {
    id: "6",
    title: "What is PayPal USD?",
    readTime: 2,
    image: "/lovable-uploads/6f7e4134-44d9-454c-a5d8-a766711c3c08.png",
    slug: "paypal-usd"
  },
  {
    id: "7",
    title: "What is crypto?",
    readTime: 1,
    image: "/lovable-uploads/6f7e4134-44d9-454c-a5d8-a766711c3c08.png",
    slug: "what-is-crypto"
  },
  {
    id: "8",
    title: "Crypto and your taxes",
    readTime: 1,
    image: "/lovable-uploads/6f7e4134-44d9-454c-a5d8-a766711c3c08.png",
    slug: "crypto-taxes"
  }
];

export const BlogArticles = () => {
  return (
    <div className="space-y-4 p-4">
      {articles.map((article) => (
        <Link
          key={article.id}
          to={`/support/${article.slug}`}
          className="block bg-blue-50 rounded-xl p-4 transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <h3 className="text-xl font-semibold text-gray-900">{article.title}</h3>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="w-4 h-4 mr-1" />
                <span>{article.readTime} min read</span>
              </div>
            </div>
            <img 
              src={article.image} 
              alt="" 
              className="w-24 h-24 object-cover rounded-lg"
            />
          </div>
        </Link>
      ))}
    </div>
  );
};