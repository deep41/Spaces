import { useSpaceStore } from "../../store/SpaceStore";

const SpaceAddComment = () => {
  const spaceItem = useSpaceStore((store) => store.spaceItem);
  const spaceId = spaceItem?._id;
  return (
    <>
      <div>
        {/* <textarea
          placeholder="Type your comment here..."
          value={commentText}
          onChange={handleCommentChange}
          rows={2} // Adjust the number of rows as needed
          cols={50} // Adjust the number of columns as needed
        ></textarea>
        <button onClick={handleAddComment}>Add Comment</button> */}
      </div>
    </>
  );
};

export default SpaceAddComment;
