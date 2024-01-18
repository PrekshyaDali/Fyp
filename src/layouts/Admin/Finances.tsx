import React from "react";
const Finances = ()=>{
    return(
          <body className="bg-gray-200">
    <div className="container mx-auto mt-8">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-blue-600">Student Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          <div className="bg-blue-400 p-6 rounded-md text-white">
            <h2 className="text-lg font-semibold mb-4">Course Progress</h2>
            <p className="text-2xl">60% completed</p>
          </div>

  
          <div className="bg-green-400 p-6 rounded-md text-white">
            <h2 className="text-lg font-semibold mb-4">Upcoming Lessons</h2>
            <ul>
              <li>Lesson 1 - 20/01/2024</li>
              <li>Lesson 2 - 25/01/2024</li>
            </ul>
          </div>

          <div className="bg-yellow-400 p-6 rounded-md text-white">
            <h2 className="text-lg font-semibold mb-4">Exam Schedule</h2>
            <p className="text-2xl">Exam on 30/01/2024</p>
          </div>
        </div>


        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4 text-purple-600">Notifications</h2>
          <ul>
            <li className="mb-2">New lesson added - Lesson 3</li>
            <li>New announcement: Exam date changed</li>
          </ul>
        </div>
      </div>
    </div>
  </body>
    )
}
export default Finances;