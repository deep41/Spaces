import SpaceImage from "./SpaceImage";

const SpaceImageRow = () => {
  return (
    <>
      <div className="text-3xl">Images</div>
      <div className="py-2 mx-1 flex flex-row overflow-y-scroll overflow-">
        <SpaceImage />
        <SpaceImage />
        <SpaceImage />
        <SpaceImage />
      </div>
    </>
  );
};

export default SpaceImageRow;
