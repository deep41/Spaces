import SpaceAddComment from "./SpaceAddComment";
import SpaceComment from "./SpaceComment";
import { CommentType } from "./constants";

const SpaceCommentsView = (props: any) => {
  const { comments }: { comments: CommentType[] } = props;
  return (
    <>
      <div style={{ width: "calc(100vw * .35)" }}>
        <div className="text-3xl">Comments</div>
        {comments &&
          comments.map((item) => <SpaceComment item={item} key={item.time} />)}

        <SpaceAddComment />
      </div>
    </>
  );
};

export default SpaceCommentsView;
