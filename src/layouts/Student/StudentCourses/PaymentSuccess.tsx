import React from "react";
import PaymentSuccessModal from "@/pages/component/PaymentSuccessModal";

export default function PaymentSuccess() {
  return (
    <div>
      <PaymentSuccessModal
        img="/img/success.png"
        message="Payment Successful"
        description="Thank you for your payment"
        money="Rs. 1000"
      />
    </div>
  );
}
