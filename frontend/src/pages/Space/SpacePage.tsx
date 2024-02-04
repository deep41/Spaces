import { useEffect } from "react";
import { useSpaceStore } from "../../store/SpaceStore";
import SpaceComments from "./SpaceCommentsView";
import SpaceImageRow from "./SpaceImageRow";
import SpaceMap from "./SpaceMap";
import { useNavigate } from "react-router-dom";

const SpacePage = () => {
  const spaceItem = useSpaceStore((store) => store.spaceItem);
  const navigate = useNavigate();
  useEffect(() => {
    if (!spaceItem) {
      navigate("/home");
    }
  }, []);

  return (
    <>
      <div style={{ width: "100vw", height: "calc(100vh-40px)" }}>
        <div className="flex flex-row">
          <div className="" style={{ width: "calc(100vw * 0.65)" }}>
            <div className="px-4 pt-2">
              <div className="flex flex-col">
                <div className="text-7xl py-4">{spaceItem?.spaceName}</div>
                <div className="text-1xl">{spaceItem?.spaceDescriptions}</div>
                <div className="mt-4">
                  <SpaceImageRow spaceImage={spaceItem?.spaceImage} />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-100/20">
            <SpaceMap />
            <SpaceComments />
          </div>
        </div>
      </div>
    </>
  );
};

export default SpacePage;
