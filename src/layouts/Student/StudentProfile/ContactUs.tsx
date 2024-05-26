import React from "react";

export default function ContactUs() {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-800">
      <h1 className="text-3xl font-bold text-center mb-8">Contact Us</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <p className="mb-4">
          If you have any questions, concerns, or need further assistance, please feel
          free to contact us using the information below.
        </p>
        <p className="mb-4">
          <strong>DriveSync</strong>
          <br />
          123 Driving School Road
          <br />
          Kathmandu, 44600
          <br />
          Phone: 9861696707, 01-4112124
          <br />
          Email: info@drivingschool.com
        </p>
        <h2 className="text-2xl font-semibold mb-4">Office Hours</h2>
        <p className="mb-4">
          Sunday - Friday: 9:00 AM - 5:00 PM
          <br />
          Saturday: Closed
        
        </p>
        <h2 className="text-2xl font-semibold mb-4">Follow Us</h2>
        <p className="mb-4">Stay connected with us on social media:</p>
        <div className="flex space-x-4">
          <a href="https://facebook.com" className="text-blue-600">
            Facebook
          </a>
          <a href="https://twitter.com" className="text-blue-400">
            Twitter
          </a>
          <a href="https://instagram.com" className="text-pink-600">
            Instagram
          </a>
        </div>
      </div>
    </div>
  );
}
