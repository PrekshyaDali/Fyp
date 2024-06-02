import React from "react";
import { useState } from "react";
import {
  useAddregularCustomerMutation,
  useGetRegularCustomerQuery,
} from "@/feature/adminApiSlice";
import Button from "@/pages/component/Button";
import ViewStudentTable from "@/pages/component/ViewStudentTable";

import { get, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function RegularCustomers() {
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm();

  const [regularCustomer] = useAddregularCustomerMutation();
  const { data: customerData, isLoading } = useGetRegularCustomerQuery({});
  console.log(customerData);
  const [selectedCategory, setSelectedCategory] = React.useState("All");

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    console.log(e.target.value);
  };

  const filterData = () => {
    if (selectedCategory === "All") {
      return customerData?.regularCustomer;
    } else {
      return customerData?.regularCustomer?.filter(
        (customer) => customer.category === selectedCategory,
      );
    }
  };

  const getTotalAmount = () => {
    if (selectedCategory === "All") {
      return customerData?.regularCustomer?.reduce(
        (total, customer) => total + customer.amount,
        0,
      );
    } else {
      return filterData()?.reduce((total, customer) => total + customer.amount, 0);
    }
  };

  const SubmitHandler = async (data) => {
    console.log(data);
    try {
      const res = await regularCustomer(data).unwrap();
      console.log(res);
      toast.success("Regular Customer Added");
      reset();
    } catch (error) {
      console.log(error);
    }
  };
  const columns = [
    {
      key: "sn",
      value: "S.N",
    },
    {
      key: "category",
      value: "Category",
    },
    {
      key: "name",
      value: "name",
    },
    {
      key: "duration",
      value: "Duration",
    },
    {
      key: "time",
      value: "Time",
    },
    {
      key: "amount",
      value: "Amount",
      cell: (row) => (
        <span className="text-green-800 text-sm bg-green-200  p-2 rounded-xl">
          {row.amount}
        </span>
      ),
    },
  ];

  const data = filterData()?.map((customer, index) => {
    return {
      sn: index + 1,

      category: customer.category,
      name: customer.customerName,

      duration: customer.duration + " " + "minutes",
      amount: "Rs" + " " + customer.amount,
      time: new Date(customer.date).toLocaleString(), // Convert time to local string
    };
  });
  return (
    <div className="w-full h-full p-3 flex flex-col gap-8">
      <h1 className="text-2xl font-semibold ">Customers Tracking</h1>
      <form className="m-3" action="" onSubmit={handleSubmit(SubmitHandler)}>
        <div className="flex space-x-5 ">
          <div className="">
            <label htmlFor="">Category</label>
            <select
              {...register("category", {
                required: "Category is required",
              })}
              id="category"
              name="category"
              className="inputfields"
            >
              <option value="Car">Car</option>
              <option value="Bike">Bike</option>
              <option value="Scooter">Scooter</option>
            </select>
            {errors.category && (
              <span className="text-red-500">{errors.category.message}</span>
            )}
          </div>
          <div>
            <label htmlFor="">Customer Name</label>
            <input
              {...register("customerName", {
                required: "Customer Name is required",
              })}
              type="text"
              className="inputfields"
            />
          </div>
          <div>
            <label htmlFor="">
              Duration <span className="text-sm text-pink-500">(in minutes)</span>
            </label>
            <input
              {...register("duration", {
                required: "Duration is required",
                pattern: {
                  value: /^[0-9]*$/,
                  message: "Duration should be a number and greater than 15 minutes.",
                },
              })}
              className="inputfields"
              type="text"
            />
            {errors.duration && (
              <span className="text-red-500">{errors.duration.message}</span>
            )}
          </div>
          <div>
            <label htmlFor="">
              Amount <span className="text-sm text-pink-500">(in Rs)</span>
            </label>
            <input
              {...register("amount", {
                required: "Amount is required",
                pattern: {
                  value: /^[0-9]*$/,
                  message: "Amount should be a number",
                },
              })}
              className="inputfields"
              type="text"
            />
            {errors.amount && (
              <span className="text-red-500">{String(errors.amount.message)}</span>
            )}
          </div>
          <div className="mt-6">
            <Button name="Submit"></Button>
          </div>
        </div>
      </form>

      {/* filter */}
      <div className="flex justify-between">
        <div className="flex space-x-5 items-center">
          <span className="text-sm" htmlFor="">
            {" "}
            Sort by:
          </span>
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="w-44 h-8 border-2 rounded-md  bg-white "
            name=""
            id=""
          >
            <option value="All">All</option>
            <option value="Car">Car</option>
            <option value="Bike">Bike</option>
            <option value="Scooter">Scooter</option>
          </select>
        </div>
        <div className="space-x-5">
          <label htmlFor="">Total Income</label>
          <span className="px-8 py-2 rounded-full bg-pink-200 bg-opacity-75 text-pink-900">
            {"Rs" + " " + getTotalAmount()}
          </span>
        </div>
      </div>

      {/* View Customer table */}
      {customerData ? (
        <div>
          <ViewStudentTable column={columns} data={data} />
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <h1 className="text-2xl font-semibold ">No entries for today's date. </h1>
        </div>
      )}
    </div>
  );
}
