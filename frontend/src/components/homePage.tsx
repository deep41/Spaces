import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Maps from "./partials/maps";
import CreateSpaceModal from "./modals/CreateSpaceModal";
import CreateCollectionModal from "./modals/CreateCollectionModal";
import { Space, useSpaceStore } from "../store/SpaceStore";

const HomePage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [collections, setCollections] = useState<
    {
      _id: string;
      collectionName: string;
      collectionImage: string;
      spaces: { spaceCoordinate: { latitude: number; longitude: number } }[];
    }[]
  >([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!!!token) {
      navigate("/");
    } else {
      fetchCollections();
    }
  }, []);

  const [selectedCollection, setSelectedCollection] = useState<string | null>(
    null
  );
  const [selectedSpaces, setSelectedSpaces] = useState<any[]>([]);

  const fetchCollections = async () => {
    try {
      const response = await fetch("http://localhost:3000/collections", {
        method: "GET",
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setCollections(data.collections);
      } else {
        console.error("Failed to fetch collections");
      }
    } catch (error) {
      console.error("Error fetching collections:", error);
    }
  };

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  // Extract coordinates from all spaces inside all collections
  const allCoordinates = collections.flatMap((collection) =>
    collection.spaces.map((space) => space.spaceCoordinate)
  );
  const updateSpaceItem = useSpaceStore((store) => store.updateSpaceItem);

  return (
    <>
      <div className="flex flex-row" style={{ height: "calc(100vh - 40px)" }}>
        <div className="" style={{ width: "calc(100vw * 0.7)" }}>
          <Maps coordinates={allCoordinates} />
        </div>
        <div className=" bg-gray-100/30" style={{ width: "calc(100vw * 0.3)" }}>
          <div className="pw-10 ph-2">
            {!selectedCollection && (
              <div className="text-3xl mx-8 my-4">My Collections</div>
            )}
            <hr />
            {!!selectedCollection && (
              <div className="flex flex-row">
                <div
                  className="text-3xl mx-4 mt-4"
                  onClick={() => {
                    setSelectedCollection(null);
                  }}
                >
                  ← {selectedCollection}
                </div>
              </div>
            )}
            <div className="grid-container grid grid-cols-3 ">
              {!selectedCollection &&
                collections.map(
                  (collection: {
                    _id: string;
                    collectionName: string;
                    collectionImage: string;
                    spaces: any[];
                  }) => (
                    <CollectionItem
                      key={collection._id}
                      text={collection.collectionName}
                      onClick={(e: any) => {
                        setSelectedCollection(collection.collectionName);
                        setSelectedSpaces(collection.spaces);
                      }}
                      collectionImage={collection.collectionImage}
                    />
                  )
                )}
            </div>
            <div className="grid-container grid grid-cols-3 ">
              {!!selectedCollection &&
                selectedSpaces.map((space: Space) => (
                  <CollectionItem
                    key={space._id}
                    text={space.spaceName}
                    imageLink={space?.spaceImage[0]}
                    onClick={(e: any) => {
                      // setSelectedCollection(space.spaceName);
                      console.log(space._id);
                      updateSpaceItem(space);
                      navigate("/space");
                    }}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-4 right-4">
        <button
          onClick={toggleModal}
          className="bg-black text-white rounded-full p-4 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
      </div>
      {/* Modal */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "80px",
            right: "20px",
            backgroundColor: "black",
            padding: "20px",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <CreateSpaceModal
            onUpdated={() => {
              fetchCollections();
            }}
          />
          <CreateCollectionModal
            onUpdated={() => {
              fetchCollections();
            }}
          />
        </div>
      )}
    </>
  );
};

const CollectionItem = (props: any) => {
  const {
    // imageLink = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2264&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    imageLink,
    text,
    onClick,
    collectionImage,
  } = props;

  return (
    <>
      <div
        className="flex flex-col items-center rounded-md hover:bg-gray-200/50 gap-2 pb-2 pt-1 "
        onClick={(e: any) => onClick(e)}
      >
        {!!imageLink && (
          <div className="mx-4 my-2">
            <img
              src={"data:image/jpeg;base64," + imageLink.substring(20)}
              alt="Profile Image"
              className="rounded-md w-20 h-20 object-fill"
            />
          </div>
        )}
        {!imageLink && !!collectionImage && (
          <div className="mx-4 my-2">
            <div
              className="w-20 h-20 rounded-md object-fill"
              style={{ background: collectionImage }}
            ></div>
          </div>
        )}
        <div className="mx-4 overflow-ellipsis line-clamp-2">{text}</div>
      </div>
    </>
  );
};

export default HomePage;
