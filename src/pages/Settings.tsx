import { ArrowLeft, Building2, Plus, Landmark, CalendarClock, MapPin, Fingerprint, Lock, Bell, Users2, SmilePlus, HelpCircle, FileText, Wallet, BriefcaseBusiness, Send, Gift, FileKey, Smartphone, ShieldCheck, FileQuestion, Star, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

const settingSections = [
  {
    title: "PREFERENCES",
    items: [
      { icon: Building2, label: "Account", badge: "" },
      { icon: Plus, label: "Create Business Profile", badge: "New" },
      { icon: Landmark, label: "Payment Methods", badge: "" },
      { icon: CalendarClock, label: "Scheduled Payments & Requests", badge: "" },
      { icon: MapPin, label: "Shipping Addresses", badge: "" },
      { icon: Fingerprint, label: "Face ID & Passcode", badge: "" },
      { icon: Lock, label: "Privacy", badge: "" },
      { icon: Bell, label: "Notifications", badge: "" },
      { icon: Users2, label: "Friends & Social", badge: "" },
      { icon: SmilePlus, label: "Emoji", badge: "" },
      { icon: HelpCircle, label: "Get help", badge: "" },
    ]
  },
  {
    title: "TAX",
    items: [
      { icon: FileText, label: "Tax Verification", badge: "" },
      { icon: FileText, label: "Tax Documents", badge: "" },
    ]
  },
  {
    title: "BUYING",
    items: [
      { icon: Wallet, label: "BLUPAY Debit Card", badge: "" },
      { icon: BriefcaseBusiness, label: "Direct Deposit", badge: "" },
      { icon: FileText, label: "Cash a Check", badge: "" },
      { icon: Wallet, label: "Backup Payment", badge: "" },
      { icon: BriefcaseBusiness, label: "Connected Businesses", badge: "" },
      { icon: Send, label: "Send & receive money with Visa+", badge: "" },
      { icon: Gift, label: "Offers", badge: "" },
      { icon: Gift, label: "Gift cards", badge: "" },
    ]
  },
  {
    title: "SECURITY",
    items: [
      { icon: FileKey, label: "Change Password", badge: "" },
      { icon: Smartphone, label: "Remembered Devices", badge: "" },
      { icon: ShieldCheck, label: "Identity Verification", badge: "" },
    ]
  },
  {
    title: "INFORMATION",
    items: [
      { icon: FileQuestion, label: "Legal", badge: "" },
      { icon: FileText, label: "Helpful Information", badge: "" },
      { icon: FileText, label: "Technical Info", badge: "" },
      { icon: Star, label: "Rate BLUPAY", badge: "" },
    ]
  }
];

const SettingsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-10">
        <div className="flex items-center p-4">
          <Link to="/" className="mr-4">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-semibold">Settings</h1>
        </div>
      </header>

      <main className="pt-16 pb-20">
        <div className="p-4 mb-4">
          <p className="text-sm text-gray-600">BLUPAY is a service of BluCorp, Inc.</p>
          <p className="text-sm text-gray-600">NMLS ID: 910457</p>
        </div>

        {settingSections.map((section) => (
          <div key={section.title} className="mb-6">
            <h2 className="px-4 py-2 text-sm font-semibold text-gray-500">{section.title}</h2>
            <div className="bg-white">
              {section.items.map((item, index) => (
                <Link
                  key={item.label}
                  to="#"
                  className={`flex items-center justify-between p-4 hover:bg-gray-50 ${
                    index !== section.items.length - 1 ? 'border-b border-gray-100' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5 text-gray-600" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.badge && (
                      <span className="px-2 py-1 text-xs font-semibold text-white bg-red-500 rounded-full">
                        {item.badge}
                      </span>
                    )}
                    <span className="text-gray-400">›</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}

        <div className="p-4">
          <button 
            className="w-full flex items-center justify-center gap-2 text-blue-500 font-medium py-2"
            onClick={() => console.log("Sign out clicked")}
          >
            <LogOut className="w-5 h-5" />
            <span>Sign Out of BLUPAY</span>
          </button>
          <p className="text-center text-gray-500 text-sm mt-4">Version 10.55.0 (4)</p>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;