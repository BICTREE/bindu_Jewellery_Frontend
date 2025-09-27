// pages/CheckoutPage.jsx
import { BillingForm } from "@/components/billingform/BillingForm";
import { OrderSummary } from "@/components/ordersummary/OrderSummary";

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-white p-6 ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Billing Form Section */}
        <div className="lg:col-span-2">
          <BillingForm />
        </div>

        {/* Order Summary Section */}
        <div>
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}
