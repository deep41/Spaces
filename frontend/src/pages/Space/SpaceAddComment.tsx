import { useSpaceStore } from "../../store/SpaceStore";

const SpaceAddComment = () => {
  const spaceItem = useSpaceStore((store) => store.spaceItem);
  const spaceId = spaceItem?._id;
  return (
    <>
      <div>Add Comment</div>
    </>
  );
};

export default SpaceAddComment;
