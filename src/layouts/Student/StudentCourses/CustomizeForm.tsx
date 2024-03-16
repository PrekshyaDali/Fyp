import React from 'react'

export default function CustomizeForm() {
  return (
    <div>
      <form
        action="
      "
      >
        <div className="border-2 border-gray-300 m-3 rounded-md p-5 space-y-8 max-h-[80]">
          <div className="h-44 rounded-md bg-red-800 border-2 relative p-5">
            <img
              className="invisible sm:visible h-36 absolute right-3 top-5"
              src="/img/FormCar.png"
              alt=""
            />
            <h1 className="text-3xl font-semibold text-white">
              Customize your own course{" "}
            </h1>
            <p className="text-white">
              Embark on an exhilarating journey into the world of automotive
            </p>
          </div>

          <div className="space-y-5">
            <div className="space-y-5 sm:flex sm:space-y-0 sm:space-x-8">
              <div className="w-full sm:w-1/2">
                <label htmlFor="firstName1">First Name</label>
                <input
                  type="text"
                  id="firstName1"
                  className="inputfields"
                  // {...register("firstname", {
                  //   required: "This field is required",
                  // })}
                />
                {/* {errors.firstname && (
                  <span className="text-red-500">This field is required</span>
                )} */}
              </div>
              <div className="w-full sm:w-1/2">
                <label htmlFor="lastName1">Last Name</label>
                <input
                  type="text"
                  id="lastName1"
                  className="inputfields"
                  // {...register("lastname", {
                  //   required: "This field is required",
                  // })}
                />
                {/* {errors.lastname && (
                  <span className="text-red-500">This field is required</span>
                )} */}
              </div>
            </div>

            <div className="sm:flex space-y-5 sm:space-y-0 sm:space-x-8">
              <div className="w-full sm:w-1/2">
                <label htmlFor="Contact Number">Contact Number</label>
                <input
                  type="text"
                  id="Contact Number"
                  className="inputfields"
                  // {...register("contactnumber", {
                  //   required: "This field is required",
                  //   pattern: {
                  //     value: /^(98|96|97)[1-9]\d{7}$/,
                  //     message: "Please enter a valid number",
                  //   },
                  // })}
                />
                {/* {errors.contactnumber && (
                  <span className="text-red-500">
                    {String(errors.contactnumber.message)}
                  </span>
                )} */}
              </div>
              <div className="w-full sm:w-1/2">
                <label htmlFor="Email">Email</label>

                <input
                  type="text"
                  id="Email"
                  // value={profileData?.user?.email}
                  className="inputfields"
                  // {...register("email", {
                  //   required: "This field is required",
                  //   pattern: {
                  //     value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  //     message: "Invalid email address",
                  //   },
                  // })}
                />
                {/* {errors.email && (
                  <span className="text-red-500">{String(errors.email.message)}</span>
                )} */}
              </div>
            </div>

            <div className="sm:flex space-y-5 sm:space-y-0 sm:space-x-8">
              <div className="w-full sm:w-1/2">
                <label htmlFor="Category">Category</label>
                <select className="inputfields" name="" id="">
                  <option value="car">Car</option>
                  <option value="bike">Bike</option>
                  <option value="scooter">Scooter</option>
                </select>
              </div>
              <div className="w-full sm:w-1/2">
                <label htmlFor="Address">Address</label>
                <input
                  type="text"
                  id="Address"
                  className="inputfields"
                  // {...register("address", {
                  //   required: "This field is required",
                  // })}
                />
                {/* {errors.address && (
                  <span className="text-red-500">This field is required</span>
                )} */}
              </div>
            </div>

            <div className="sm:flex space-y-5 sm:space-y-0 sm:space-x-8">
              <div className="w-full sm:w-1/2">
                <label htmlFor="Gender">Gender</label>
                <select
                  id="Gender"
                  className="inputfields"
                  // {...register("gender", {
                  //   required: "This field is required",
                  // })}
                >
                  <option className="" value="male">
                    Male
                  </option>
                  <option className="" value="female">
                    Female
                  </option>
                  <option className="" value="other">
                    Other
                  </option>
                  {/* {errors.gender && (
                    <span className="text-red-500">This field is required</span>
                  )} */}
                </select>
              </div>

              <div className="w-full sm:w-1/2">
                <label htmlFor="Emergency Contact Info">Emergency Contact Info</label>
                <input
                  type="text"
                  id="Emergency Contact Info"
                  className="inputfields"
                  // {...register("emergencycontact", {
                  //   required: "This field is required",
                  // })}
                />
                {/* {errors.emergencycontact && (
                  <span className="text-red-500">This field is required</span>
                )} */}
              </div>
            </div>

            <div className="sm:flex space-y-5 sm:space-y-0 sm:space-x-8">
              <div className="w-full sm:w-1/2">
                <label htmlFor="Duration">Duration</label>
                <select className="inputfields" name="" id="">
                  <option value="7 days">7 days</option>
                  <option value="14 days">14 days</option>
                  <option value="21 days">21 days</option>
                </select>
              </div>
              <div className="w-full sm:w-1/2">
                <label htmlFor="Price">Price</label>
                <input
                  // value={"Rs" + " " + courseData?.price}
                  type="text"
                  id="Price"
                  className="inputfields"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="Category"
                className="w-5 h-5 mr-4 text-blue-white bg-white border-gray-300 rounded focus:ring-white dark:focus:ring-white "
                // {...register("termsandcondition", {
                //   required: "This field is required",
                // })}
              />

              <label htmlFor="Category" className="text-sm">
                I have read and agree to all the terms and conditions. Once submitted, it
                cannot be cancelled.
              </label>
              {/* {errors && errors?.termsandcondition && (
                <span className="text-red-500">This field is required</span>
              )} */}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
