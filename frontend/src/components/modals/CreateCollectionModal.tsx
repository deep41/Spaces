import React from "react";

const CreateCollectionModal = () => {
  const [showModal, setShowModal] = React.useState(false);
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
        Create Collection
      </button>

      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            onClick={() => setShowModal(false)}
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between px-6 py-4  rounded-t">
                  <h3 className="text-3xl font-semibold">Modal Title</h3>
                </div>
                {/*body*/}
                <div className="relative px-6 flex-auto">
                  <p className="text-lg leading-relaxed">
                    I always felt like I could do anything. That's the main
                    thing people are controlled by! Thoughts- their perception
                    of themselves! They're slowed down by their perception of
                    themselves. If you're taught you can't do anything, you
                    won't do anything. I was taught I could do everything.
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-4 ">
                  <button
                    className="bg-white text-black border-2 border-black rounded-md  px-4 py-1 mx-1"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-black text-white border-2 border-black rounded-md  px-4 py-1 mx-1"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Save Changes
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
