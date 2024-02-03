import moment from "moment";
import { CommentType } from "./constants";

const SpaceComment = (props: any) => {
  const { item }: { item: CommentType } = props;
  const time = moment(item.time).format("MMM d, h:mm A");
  return (
    <>
      <div className="bg-gray-100 rounded-md my-2 mx-1 px-2 py-1 mr-4">
        <div className="flex flex-row justify-between">
          <div className="text-sm text-gray-500">{item.name}</div>
          <div className="text-sm text-gray-500">{time}</div>
        </div>
        <div className="text-lg">{item.content}</div>
      </div>
    </>
  );
};

export default SpaceComment;
