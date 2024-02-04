import { useEffect, useState } from "react";
import { useSpaceStore } from "../../store/SpaceStore";
import SpaceAddComment from "./SpaceAddComment";
import SpaceComment from "./SpaceComment";
import { CommentType } from "./constants";

const SpaceCommentsView = () => {
  const [comments, setComments] = useState<CommentType[]>([]);

  const spaceItem = useSpaceStore((store) => store.spaceItem);
  const spaceId = spaceItem?._id;
  useEffect(() => {
    setComments(spaceItem?.comments || []);
  }, []);

  const refreshComments = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/space/Comments?spaceID=${spaceId}`,
        {
          method: "GET",
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.ok) {
        const data: any = await response.json();
        console.log(data);
        setComments(data.comments);
      } else {
        console.error("Failed to fetch collections");
      }
    } catch (error) {
      console.error("Error fetching collections:", error);
    }
  };

  return (
    <>
      <div style={{ width: "calc(100vw * .35)" }}>
        <div className="text-3xl">Comments</div>
        {comments &&
          comments.map((item, index) => (
            <SpaceComment item={item} key={index} />
          ))}

        <SpaceAddComment
          onAdd={() => {
            refreshComments();
          }}
        />
      </div>
    </>
  );
};

export default SpaceCommentsView;
