import { usePaymentTrackingMutation } from "@/feature/userApiSlice";
import ViewStudentTable from "@/pages/component/ViewStudentTable";
import React from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function ViewPayment() {
  const { enrollmentId } = useParams<{ enrollmentId: string }>();
  console.log(enrollmentId, "enrollmentId");
  const [paymentTracking, isLoading] = usePaymentTrackingMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const SubmitHandler = async (data) => {
    try {
      const formData = new FormData();
      formData.append("paymentType", data.paymentType);
      formData.append("paidAmount", data.paidAmount);

      formData.append("enrollmentId", enrollmentId);
      const res = await paymentTracking(formData).unwrap();
      console.log(res);
      toast.success("Payment tracked successfully");
    } catch (error) {
      toast.error("Error tracking payment");
    }
  };
  return (
    <form action="" onSubmit={handleSubmit(SubmitHandler)} encType="multipart/form-data">
      <div className=" flex flex-col md:flex-row bg-white p-5 ">
        <div className="flex-1 w-full flex flex-col space-y-5 ">
          <h1 className="text-2xl font-semibold mb-3">Payment Details</h1>
          <div className="w-full md:w-1/2 flex items-center mb-3">
            <label htmlFor="Payment" className="mr-2 text-sm">
              Payment Type
            </label>
            <select
              {...register("paymentType")}
              className="bg-white border-2 text-sm p-1 w-full"
            >
              <option value="Unpaid">Unpaid</option>
              <option value="Half Payment">Half Payment</option>
              <option value="Full Payment">Full Payment</option>
            </select>
            {errors.paymentType && (
              <span className="text-red-500 text-sm">{String(errors.message)}</span>
            )}
          </div>

          {/* Paid amount */}
          <div className="w-full md:w-1/2 flex items-center mb-3">
            <label htmlFor="" className="mr-2 text-sm">
              Paid Amount
            </label>
            <input
              {...register("paidAmount", { required: "This field is required" })}
              type="text"
              className="bg-white border-2 text-sm p-1 w-full"
            />
            {errors.paymentType && (
              <span className="text-red-500 text-sm">{String(errors.message)}</span>
            )}
          </div>

          {/* Due amount */}
          <div className="w-full md:w-1/2 flex items-center">
            <label htmlFor="" className="mr-2 text-sm">
              Due Amount
            </label>
            <input type="text" className="bg-white border-2 text-sm p-1 w-full" />
          </div>


          {/* button */}

          <div>
            <button
            type = "submit"
            isLoading={isLoading}
            className="text-sm text-white bg-blue-400 hover:bg-blue-500 active:bg-blue-400 rounded-md px-6 py-2">
              {" "}
              Save
            </button>
          </div>
        </div>

        {/* right div */}
        <div>
          <ViewStudentTable
            SN="1"
            field1="Category"
            field2="Payment Method"
            data1="Primary"
            data2="Cash"
            data3="1000"
          />
        </div>
      </div>
    </form>
  );
}
