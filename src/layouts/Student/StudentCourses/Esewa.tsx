import { useEsewaPaymentMutation } from "@/feature/userApiSlice";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function Esewa() {
  const [esewa] = useEsewaPaymentMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const courseData = JSON.parse(localStorage.getItem("course"));
  const userData = localStorage.getItem("id");
  console.log(courseData, userData);
const SubmitHandler = async (data) => {
  try {
    console.log("Data:", data);
    console.log("Course Data:", courseData);
    console.log("User Data:", userData);

    const formData = new FormData();
    formData.append("amount", data.amount);
    formData.append("course", JSON.stringify(courseData));
    formData.append("user", JSON.stringify(userData));

    console.log("FormData:", formData);

    const res = await esewa(formData).unwrap();
    console.log("Response:", res);
    toast.success("Payment Successful");
    const {amount} = data;
    const pid = res.course;
    callEsewaApi(amount, pid);

  } catch (error) {
    console.log("Error:", error);
    toast.error("Payment Failed");
  }
};

const callEsewaApi = async (amount, pid) => {
  const formData = {
    amt: amount,
    psc: 0,
    pdc: 0,
    txAmt: 0,
    tAmt: amount,
    pid: pid,
    scd: "EPAYTEST",
    su: "http://localhost:5173/users/esewa_payment_success",
    fu: "http://localhost:5173/users/esewa_payment_failed",
  };
  const form = document.createElement("form");
  form.setAttribute("method", "POST");
  form.setAttribute("action", "https://uat.esewa.com.np/epay/main");

  for (const key in formData) {
    if (Object.hasOwnProperty.call(formData, key)) {
      const hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", "hidden");
      hiddenField.setAttribute("name", key);
      hiddenField.setAttribute("value", formData[key]);
      form.appendChild(hiddenField);
    }
  }
  document.body.appendChild(form);
  form.submit();
};

  return (
    <div className="h-full w-full flex items-center justify-center p-5">
      <form
        action=""
        onSubmit={handleSubmit(SubmitHandler)}
        encType="multipart/form-data"
      >
        <div className="w-80 h-fit border-2 p-5 flex flex-col space-y-5">
          <div className="space-y-3">
            <h1 className="text-2xl font-bold ">Esewa</h1>
            <p className="text-sm text-gray-400">
              Please enter the amount that you want to pay for the course as advance. You
              can also pay the full amount
            </p>
            <p className="text-sm">
              Package Price: <span className="text-green-400">Rs 30000</span>
            </p>
          </div>

          <div>
            <label htmlFor="Amount">Amount</label>
            <input
              {...register("amount", { required: true })}
              type="text"
              className="h-10 w-full bg-transparent border-2 rounded-sm"
            />
            {errors.amount && <span>This field is required</span>}
          </div>
          <div className="flex flex-col space-y-3">
            <button
              type="submit"
              className="w-full bg-green-400 h-10 text-white hover:bg-green-500 active:bg-green-400"
            >
              Proceed
            </button>
            <button className="w-full bg-gray-400 h-10 text-white hover:bg-gray-500 active:bg-gray-400">
              Previous
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
