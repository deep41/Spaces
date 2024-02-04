import { useState } from "react";
import { useSpaceStore } from "../../store/SpaceStore";

const SpaceAddComment = (props: { onAdd: any }) => {
  const { onAdd } = props;
  const spaceItem = useSpaceStore((store) => store.spaceItem);
  const spaceId = spaceItem?._id;
  const [comment, setComment] = useState<string>("");

  const handleComment = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/space/AddComment?spaceID=${spaceId}`,
        {
          method: "POST",
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            commentData: comment,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setComment("");
        onAdd();
        // setCollections(data.collections);
      } else {
        console.error("Failed to fetch collections");
      }
    } catch (error) {
      console.error("Error fetching collections:", error);
    }
  };

  return (
    <>
      <div className="flex flex-row">
        <div className="w-2" />
        <textarea
          placeholder="Type your comment here..."
          value={comment}
          onChange={(e: any) => {
            setComment(e?.target?.value || "");
          }}
          rows={1} // Adjust the number of rows as needed
          cols={40} // Adjust the number of columns as needed
          className="border-2 border-black rounded-md px-2 py-1"
        ></textarea>
        <div className="w-2" />
        <button
          onClick={(e: any) => {
            e.preventDefault();
            handleComment();
          }}
          className="
           bg-black/80 rounded-md text-white px-4 py-1 "
        >
          Add Comment
        </button>
      </div>
    </>
  );
};

export default SpaceAddComment;
