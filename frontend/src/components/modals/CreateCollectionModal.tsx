import React, { useState } from "react";

const CreateCollectionModal = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [collectionName, setCollectionName] = useState("");
  const [collectionDescription, setCollectionDescription] = useState("");

  return (
    <>
      <button
        style={{
          color: "white",
          backgroundColor: "transparent",
          border: "none",
          cursor: "pointer",
        }}
        onClick={() => setShowModal(true)}
      >
        Create a Collection
      </button>

      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            onClick={() => setShowModal(false)}
          >
            <div
              className="relative my-6 mx-auto w-2/6"
              onClick={(e) => e.stopPropagation()} 
            >
              {/* content */}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/* header */}
                <div className="flex items-center justify-center px-6 py-4 rounded-t">
                  <h3 className="text-2xl font-bold">Create a Collection</h3>
                </div>
                <hr className="mb-4" />
                {/* body */}
                <div className="relative px-6 flex-auto">
                  <div className="mb-4">
                    <label htmlFor="collectionName" className="block text-gray-700 text-sm font-medium mb-2">
                      Give your collection a name
                    </label>
                    <input
                      id="collectionName"
                      type="text"
                      value={collectionName}
                      onChange={(e) => setCollectionName(e.target.value)}
                      className=" appearance-none py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="untitled list"
                      style={{
                        border: "none",
                        borderBottom: "2px solid gray", 
                        borderRadius: "0",
                        width: "100%",
                      }}
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="collectionDescription" className="block text-gray-700 text-sm font-medium mb-2">
                      Describe your collection
                    </label>
                    <textarea
                      id="collectionDescription"
                      value={collectionDescription}
                      onChange={(e) => setCollectionDescription(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="collection description"
                    ></textarea>
                  </div>
                </div>
                {/* footer */}
                <div className="flex items-center justify-end p-4 ">
                  <button
                    className="bg-white text-black border-2 border-black rounded-md px-4 py-1 mx-1"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-black text-white border-2 border-black rounded-md px-4 py-1 mx-1"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default CreateCollectionModal;
