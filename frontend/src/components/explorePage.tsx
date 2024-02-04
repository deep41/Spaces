import React, { useState, useEffect } from "react";
import { useCommunitySearchStore } from "../store/CommunitySearchStore";
import { useNavigate } from "react-router-dom";

const ExplorePage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [tags, setTags] = useState([]);

  useEffect(() => {
    // Function to fetch all tags
    const fetchTags = async () => {
      try {
        const response = await fetch("http://localhost:3000/getAllTags");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const tagData = data.tags.map((item: any) => {
          return { data: item, color: generateRandomPastelGradient() };
        });
        setTags(tagData);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    fetchTags();
    updateTag(null);
  }, []);

  const handleSearchChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

  const generateRandomPastelGradient = () => {
    const h = Math.floor(Math.random() * 360);
    const pastelGradient = `linear-gradient(135deg, hsl(${h}, 100%, 80%), hsl(${
      (h + 30) % 360
    }, 100%, 85%))`;
    return pastelGradient;
  };

  const filteredTags = tags.filter((tag: any) =>
    tag.data.tag.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const updateTag = useCommunitySearchStore((store) => store.updateTag);

  return (
    <div className="flex flex-col items-center mt-8">
      <div className="flex items-center max-w-2xl w-full border-2 border-gray-300 rounded-2xl overflow-hidden">
        <input
          type="text"
          placeholder="Search by tags"
          className="py-2 px-4 w-full outline-none"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button className="flex items-center justify-center px-4 border-l">
          <svg
            className="w-6 h-6 text-gray-600"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1112 0A6 6 0 012 8z"
              clipRule="evenodd"
            />
            <path
              fillRule="evenodd"
              d="M12.293 12.293a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <div className="w-full max-w-5xl mt-10">
        <h1 className="text-2xl font-semibold">Raleigh's Communities</h1>
        <hr className="my-2 p-5" />
        {/* Dynamic Squares with Texts for Tags */}
        <div className="grid grid-cols-4 gap-4">
          {filteredTags.length > 0 ? (
            filteredTags.map((tag: any, index) => (
              <button
                onClick={(e: any) => {
                  e.preventDefault();
                  updateTag(tag.data.tag);
                  navigate("/community");
                }}
              >
                <div key={index} className="flex flex-col items-center">
                  <div
                    className="w-48 h-48 rounded-lg"
                    style={{ background: tag.color }}
                  ></div>
                  <p className="mt-2 font-semibold">#{tag.data.tag}</p>
                  <p className="text-gray-500">{tag.data.count} Spaces</p>{" "}
                  {/* Update this as needed */}
                </div>
              </button>
            ))
          ) : (
            <div>No matching tags found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
