import { PaymentScreen } from "@/components/payment/PaymentScreen";
import { RecurringPayment } from "@/components/payment/RecurringPayment";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PayPage = () => {
  return (
    <div className="container mx-auto p-6">
      <Tabs defaultValue="pay" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="pay">One-time Payment</TabsTrigger>
          <TabsTrigger value="recurring">Recurring Payment</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pay">
          <PaymentScreen />
        </TabsContent>
        
        <TabsContent value="recurring">
          <RecurringPayment />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PayPage;