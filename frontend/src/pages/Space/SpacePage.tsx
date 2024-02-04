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
                <div className="flex flex-row justify-between">
                  <div className="text-7xl py-4">{spaceItem?.spaceName}</div>
                  <div className="mt-10 mr-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  {spaceItem?.spaceAddress}
                </div>
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
