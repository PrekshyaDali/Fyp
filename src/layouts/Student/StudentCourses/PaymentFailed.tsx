import PaymentSuccessModal from "@/pages/component/PaymentSuccessModal";
import React from "react";

export default function PaymentFailed() {
  return (
    <div>
      <PaymentSuccessModal
        img="/img/failed.png"
        message="Payment Failed"
        description="Payment Failed , Please try again"
        money="Rs. 1000"
      />
    </div>
  );
}
