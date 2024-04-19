import { useEsewaPaymentMutation } from "@/feature/userApiSlice";
import axios from "axios";
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
  const course = JSON.parse(localStorage.getItem("course"));
  const user = localStorage.getItem("id");
  const userData = localStorage.getItem("formData")
    ? JSON.parse(localStorage.getItem("formData"))
    : null;
 
  const SubmitHandler = async (data) => {
    try {
      console.log("Data:", data);
      console.log("Course Data:", course);
      console.log("User Data:", user);
    
     var options = {
       method: "POST",
       url: "https://a.khalti.com/api/v2/epayment/initiate/",
       headers: {
         Authorization: "key 3def120726f04186b1c6f274700bd12f",
         "Content-Type": "application/json",
       },
       body: JSON.stringify({
         return_url: "http://localhost:3000/return",
         website_url: "http://localhost:3000/website",
         amount: data.amount,
         purchase_order_id: "Order01",
         purchase_order_name: "test",
         customer_info: {
           name: userData.firstname + " " + userData.lastname,
           email: userData.email,
           phone: userData.phone,
         },
       }),
     };
     console.log("Options:", options);
     

     const headers = {  
      Authorization: "key 3def120726f04186b1c6f274700bd12f",
      "Content-Type": "application/json",
    };
  
    const generatedId = Math.floor(Math.random() * 1000000);
    
    await axios
      .post(
        "https://a.khalti.com/api/v2/epayment/initiate/",
        {
          return_url: "http://localhost:3000/user/mycourses",
          website_url: "http://localhost:3000/website",
          amount: data.amount * 100,
          purchase_order_id: generatedId.toString(),
          purchase_order_name: "test",
          customer_info: {
            name: userData.firstname + " " + userData.lastname,
            email: userData.email,
            phone: userData.contactnumber,
          },
        },
        {
          headers: headers,
        },
      )
      .then(function (response) {
        window.location.href = response.data.payment_url;
      })
      .catch(function (error) {
        toast.error("Payment Failed");
      });
  
    } catch (error) {
      console.log("Error:", error);
      toast.error("Payment Failed");
    }
  };


  return (
    <div className="h-full w-full flex items-center justify-center p-5">
      <form action="" onSubmit={handleSubmit(SubmitHandler)}>
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
