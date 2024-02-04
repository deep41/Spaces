import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Maps from "./partials/maps";
import { Space, useSpaceStore } from "../store/SpaceStore";
import { useCommunitySearchStore } from "../store/CommunitySearchStore";

const CommunitySearchPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!tag) {
      navigate("/explore");
    } else {
      fetchSpacesByTag();
    }
  }, []);

  const tag = useCommunitySearchStore((store) => store.tag);
  const updateTag = useCommunitySearchStore((store) => store.updateTag);

  const [selectedSpaces, setSelectedSpaces] = useState<any[]>([]);

  const fetchSpacesByTag = async () => {
    try {
      const response = await fetch(`http://localhost:3000/community/${tag}`, {
        method: "GET",
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setSelectedSpaces(data.spaces);
      } else {
        console.error("Failed to fetch collections");
      }
    } catch (error) {
      console.error("Error fetching collections:", error);
    }
  };

  // Extract coordinates from all spaces inside all collections
  const allCoordinates: any[] = selectedSpaces.map(
    (space: Space) => space.spaceCoordinate
  );
  //   const allCoordinates: any[] = [];
  //TODO: redo
  const updateSpaceItem = useSpaceStore((store) => store.updateSpaceItem);

  return (
    <>
      <div className="flex flex-row" style={{ height: "calc(100vh - 40px)" }}>
        <div className="" style={{ width: "calc(100vw * 0.7)" }}>
          <Maps coordinates={allCoordinates} />
        </div>
        <div className=" bg-gray-100/30" style={{ width: "calc(100vw * 0.3)" }}>
          <div className="pw-10 ph-2">
            <div className="flex flex-row">
              <div
                className="text-3xl mx-4 mt-4"
                onClick={() => {
                  updateTag(null);
                  navigate("/explore");
                }}
              >
                ← #{tag}
              </div>
            </div>

            <div className="grid-container grid grid-cols-3 ">
              {!!selectedSpaces &&
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

export default CommunitySearchPage;
