import {
  CalendarClock, Gift, History, CreditCard, Globe, ShieldCheck,
  ArrowDown, Users, MessageSquare, ShoppingCart, ChartBar, Wallet,
  Headset, QrCode, Split, Mail, WalletCards, UserCog, Speaker,
  AlertOctagon, Heart, PiggyBank, Database, User, Settings, ChartLine,
  Percent, DollarSign, BrainCircuit, Building2, Store, Filter,
  Bell, Share2, Languages, Coins, UserPlus, Newspaper, CreditCard as CardIcon
} from "lucide-react";

export const featureButtons = [
  { 
    icon: BrainCircuit, 
    label: "Ask BLUAi", 
    route: "/bluai/chat",
    description: "Your personal AI financial assistant"
  },
  { 
    icon: Store, 
    label: "Merchant Payments", 
    route: "/merchant",
    description: "Pay businesses and merchants directly"
  },
  { 
    icon: ChartBar, 
    label: "Expense Categories", 
    route: "/expenses",
    description: "View and manage your spending categories"
  },
  { 
    icon: Share2, 
    label: "Shared Wallets", 
    route: "/shared-wallets",
    description: "Create and manage group funds"
  },
  { 
    icon: Headset, 
    label: "Customer Support", 
    route: "/support",
    description: "Get help with your account"
  },
  { 
    icon: QrCode, 
    label: "QR Payments", 
    route: "/qr-payments",
    description: "Send and receive money via QR codes"
  },
  { 
    icon: Split, 
    label: "Split with Friends", 
    route: "/split",
    description: "Split bills and expenses easily"
  },
  { 
    icon: Filter, 
    label: "Transaction History", 
    route: "/history",
    description: "View and filter your transactions"
  },
  { 
    icon: Languages, 
    label: "Language Settings", 
    route: "/settings/language",
    description: "Change app language"
  },
  { 
    icon: Bell, 
    label: "Notifications", 
    route: "/notifications",
    description: "Manage your notification preferences"
  },
  { 
    icon: UserPlus, 
    label: "Referral Program", 
    route: "/referral",
    description: "Invite friends and earn rewards"
  },
  { 
    icon: Coins, 
    label: "App Balance", 
    route: "/balance",
    description: "Manage your in-app funds"
  },
  { 
    icon: Newspaper, 
    label: "Social Feed", 
    route: "/social",
    description: "See your friends' transactions"
  },
  { 
    icon: Mail, 
    label: "Email Payments", 
    route: "/email-pay",
    description: "Send money via email"
  },
  { 
    icon: CardIcon, 
    label: "Digital Cards", 
    route: "/cards",
    description: "Manage your virtual cards"
  },
  { 
    icon: Globe, 
    label: "Currency Exchange", 
    route: "/exchange",
    description: "Convert between currencies"
  },
  { icon: UserCog, label: "AI Assistant", route: "/ai-assistant" },
  { icon: Speaker, label: "Voice Payments", route: "/voice" },
  { icon: AlertOctagon, label: "Fraud Detection", route: "/security" },
  { icon: Heart, label: "Spend-For-A-Cause", route: "/donate" },
  { icon: PiggyBank, label: "Automated Savings", route: "/savings" },
  { icon: UserCog, label: "Spend Smart", route: "/smart-spend" },
  { icon: Database, label: "Blockchain History", route: "/blockchain" },
  { icon: User, label: "Spending Profiles", route: "/profiles" },
  { icon: ChartLine, label: "Investment Tips", route: "/investments" },
  { icon: ChartLine, label: "Credit Score", route: "/credit" },
  { icon: Users, label: "Shared Goals", route: "/goals" },
  { icon: Percent, label: "Personal Offers", route: "/offers" }
];
