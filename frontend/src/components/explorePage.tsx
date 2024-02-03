import React, { useState } from 'react';

const ExplorePage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Placeholder data for squares
  const placeholders = [
    { title: "Community 1", places: "20 Places" },
    { title: "Community 2", places: "15 Places" },
    { title: "Community 3", places: "30 Places" },
    { title: "Community 4", places: "25 Places" },
    // Add more if needed
  ];

  return (
    <div className="flex flex-col items-center mt-8">
      <div className="flex items-center max-w-2xl w-full border-2 border-gray-300 rounded-2xl overflow-hidden">
        <input
          type="text"
          placeholder="Search by city"
          className="py-2 px-4 w-full outline-none"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button className="flex items-center justify-center px-4 border-l">
          <svg className="w-6 h-6 text-gray-600" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1112 0A6 6 0 012 8z" clipRule="evenodd"/><path fillRule="evenodd" d="M12.293 12.293a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
        </button>
      </div>
      <div className="w-full max-w-5xl mt-10">
        <h1 className="text-2xl font-semibold">City's Communities</h1>
        <hr className="my-2 p-5" />
        {/* Squares with Texts */}
        <div className="grid grid-cols-4 gap-4">
          {placeholders.map((placeholder, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-48 h-48 bg-gray-200 rounded-lg"></div>
              <p className="mt-2 font-semibold">{placeholder.title}</p>
              <p className="text-gray-500">{placeholder.places}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
