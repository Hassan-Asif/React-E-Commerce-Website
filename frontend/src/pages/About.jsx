import React from "react";

export default function About() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-900">
      {/* Floating animated background shapes */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute w-20 h-20 bg-pink-200 rounded-full opacity-30 animate-bounce-slow"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>
      {/* Hero Section */}
      <div className="text-center py-20 ">
        <h1 className="text-5xl font-extrabold text-purple-700 mb-4">
          About MyShop
        </h1>
        <p className="text-xl text-gray-700 max-w-2xl mx-auto">
          We’re passionate about bringing vibrant, high-quality products
          directly to you. Our mission is to make shopping delightful, colorful, and easy!
        </p>
      </div>

      {/* Team Section */}
      <div className="max-w-6xl mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { name: "Alice", role: "Founder & CEO", img: "https://i.pravatar.cc/150?img=1" },
            { name: "Bob", role: "Designer", img: "https://i.pravatar.cc/150?img=2" },
            { name: "Charlie", role: "Developer", img: "https://i.pravatar.cc/150?img=3" },
            { name: "Diana", role: "Marketing", img: "https://i.pravatar.cc/150?img=4" },
          ].map((member) => (
            <div key={member.name} className="text-center bg-gray-900 p-6 rounded-xl shadow-lg hover:scale-105 transition-transform">
              <img
                src={member.img}
                alt={member.name}
                className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
              />
              <h3 className="text-xl font-semibold text-white">{member.name}</h3>
              <p className="text-gray-500">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mission Section */}
      <div className=" py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-6 text-white">Our Mission</h2>
        <p className="text-center text-gray-700 max-w-3xl mx-auto">
          We aim to provide products that bring joy and color to everyday life.
          Quality, affordability, and a seamless shopping experience are at the heart of everything we do.
        </p>
      </div>
    </div>
  );
}
