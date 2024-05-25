import { useState, useEffect } from "react";
import {
  useGetVehicleQuery,
  useUpdateVehicleStatusMutation,
} from "@/feature/adminApiSlice";
import React from "react";

export default function InstructorDashboard() {
  const { data: vehicleData, refetch } = useGetVehicleQuery({});
  const [updateVehicleStatus] = useUpdateVehicleStatusMutation();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");


    const handleStatusChange = async (vehicleId, newStatus) => {
      console.log(vehicleId);
      try {
        const res = await updateVehicleStatus({
          id: vehicleId,
          status: newStatus,
        }).unwrap();
        refetch()
        console.log(res);
      } catch (error) {
        console.error("Error updating vehicle status:", error);
      }
    };


  const filteredVehicles = vehicleData?.vehicle?.filter(
    (vehicle) =>
      (filterStatus ? vehicle.status === filterStatus : true) &&
      ((vehicle.number && vehicle.number.includes(searchTerm)) ||
        (vehicle.category && vehicle.category.includes(searchTerm))),
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Available Vehicles</h2>
      <div className="mb-4 flex ">
        <input
          type="text"
          placeholder="Search by number or category"
          className="border p-2 mr-4 w-full  bg-white focus-visible:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="border p-2 w-36 bg-white"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All</option>
          <option value="Free">Free</option>
          <option value="In Use">In Use</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm border-b border-gray-200">
                Vehicle Number
              </th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm border-b border-gray-200">
                Category
              </th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm border-b border-gray-200">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredVehicles?.map((vehicle) => (
              <tr key={vehicle.id}>
                <td className="text-left py-4 px-6 border-b border-gray-200">
                  {vehicle.unique_id}
                </td>
                <td className="text-left py-4 px-6 border-b border-gray-200 text-purple-500">
                  {vehicle.category.toUpperCase()}
                </td>
                <td className="text-left py-4 px-6 border-b border-gray-200">
                  {vehicle.status === "free" ? (
                    <button
                      className="px-4 py-2 rounded bg-red-400 mr-2 text-white"
                      onClick={() => handleStatusChange(vehicle._id, "In Use")}
                    >
                      Mark as In Use
                    </button>
                  ) : (
                    <button
                      className="px-4 py-2 rounded bg-green-400 text-white"
                      onClick={() => handleStatusChange(vehicle._id, "free")}
                    >
                      Mark as Free
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
