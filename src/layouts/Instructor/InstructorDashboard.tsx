import {
  useGetVehicleQuery,
  useUpdateVehicleStatusMutation,
} from "@/feature/adminApiSlice";
import React from "react";

export default function InstructorDashboard() {
  const { data: vehicleData } = useGetVehicleQuery({});
  const [updateVehicleStatus] = useUpdateVehicleStatusMutation();

  const handleStatusChange = async (vehicleId, newStatus) => {
    try {
      await updateVehicleStatus({ id: vehicleId, status: newStatus });
    } catch (error) {
      console.error("Error updating vehicle status:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Available Vehicles</h2>
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
            {vehicleData?.vehicle?.map((vehicle) => (
              <tr key={vehicle.id}>
                <td className="text-left py-4 px-6 border-b border-gray-200">
                  {vehicle.number}
                </td>
                <td className="text-left py-4 px-6 border-b border-gray-200 text-purple-500">
                  {vehicle.category.toUpperCase()}
                </td>
                <td className="text-left py-4 px-6 border-b border-gray-200">
                  <button
                    className="px-4 py-2 rounded bg-red-500 mr-2"
                    onClick={() => handleStatusChange(vehicle.id, "In Use")}
                  >
                    In Use
                  </button>
                  <button
                    className="px-4 py-2 rounded bg-green-500 "
                    onClick={() => handleStatusChange(vehicle.id, "Free")}
                  >
                    Free
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
