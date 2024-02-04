import React, { useState } from "react";

const CreateCollectionModal = (props: { onUpdated: any }) => {
  const { onUpdated } = props;
  const [showModal, setShowModal] = React.useState(false);
  const [collectionName, setCollectionName] = useState("");
  const [collectionDescription, setCollectionDescription] = useState("");

  // Function to generate a random pastel gradient
  const generateRandomPastelGradient = () => {
    const h = Math.floor(Math.random() * 360);
    const pastelGradient = `linear-gradient(135deg, hsl(${h}, 100%, 80%), hsl(${(h + 30) % 360
      }, 100%, 85%))`;
    return pastelGradient;
  };

  // Function to create a collection
  const createCollection = async () => {
    const collectionImage = generateRandomPastelGradient(); // Generate a random gradient for the collection image
    try {
      const response = await fetch("http://localhost:3000/collection", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          collectionName,
          collectionDescription,
          collectionImage,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data); // Handle success response
        setShowModal(false); // Close the modal on success
        onUpdated();
      } else {
        console.error("Failed to create collection");
      }
    } catch (error) {
      console.error("Error creating collection:", error);
    }
  };

  return (
    <>
      <button
        className="text-white bg-transparent border-none cursor-pointer flex items-center justify-center"
        onClick={() => setShowModal(true)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
        </svg>

        <span className="ml-2">Create Collection</span>
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
                  <h3 className="text-2xl font-bold">Create Collection</h3>
                </div>
                <hr className="mb-4" />
                {/* body */}
                <div className="relative px-6 flex-auto">
                  <div className="mb-4">
                    <label
                      htmlFor="collectionName"
                      className="block text-gray-700 text-sm font-medium mb-2"
                    >
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
                    <label
                      htmlFor="collectionDescription"
                      className="block text-gray-700 text-sm font-medium mb-2"
                    >
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
                    onClick={createCollection}
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
