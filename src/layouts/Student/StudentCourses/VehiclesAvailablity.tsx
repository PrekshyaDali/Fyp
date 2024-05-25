import React from "react";
import {
  useGetVehicleQuery,
  useUpdateVehicleStatusMutation,
} from "@/feature/adminApiSlice";

const VehiclesAvailability = () => {
  const { data: vehicleData, refetch } = useGetVehicleQuery({});
  const [updateVehicleStatus] = useUpdateVehicleStatusMutation();

  const handleStatusChange = async (vehicleId, newStatus) => {
    try {
      const res = await updateVehicleStatus({
        id: vehicleId,
        status: newStatus,
      }).unwrap();
      refetch();
      console.log(res);
    } catch (error) {
      console.error("Error updating vehicle status:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Available Vehicles</h2>
      <p className = "mb-5">Check the availability of the vehicles.</p>
      <div className="overflow-x-auto ">
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
                  {vehicle.unique_id}
                </td>
                <td className="text-left py-4 px-6 border-b border-gray-200 text-purple-500">
                  {vehicle.category.toUpperCase()}
                </td>
                <td className="text-left py-4 px-6 border-b border-gray-200">
                  {vehicle.status === "free" ? (
                    <span className="px-6 py-2 rounded-full  bg-green-300 text-green-900 bg-opacity-70">
                      Free
                    </span>
                  ) : (
                    <span className="px-4 py-2 rounded-full  bg-pink-300 text-pink-900 bg-opacity-70">
                      In Use
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VehiclesAvailability;
