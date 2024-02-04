import SpaceImage from "./SpaceImage";

const SpaceImageRow = (props: { spaceImage: string[] | undefined }) => {
  const { spaceImage } = props;
  return (
    <>
      {!!spaceImage && (
        <div>
          <div className="text-3xl">Images</div>
          <div className="py-2 mx-1 flex flex-row overflow-y-scroll overflow-">
            {spaceImage.map((item) => (
              <SpaceImage imageLink={item} />
            ))}
            {/* <SpaceImage imageLink=""/>
            <SpaceImage />
            <SpaceImage />
            <SpaceImage /> */}
          </div>
        </div>
      )}
    </>
  );
};

export default SpaceImageRow;
