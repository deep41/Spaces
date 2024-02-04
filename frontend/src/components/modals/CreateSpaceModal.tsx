import { useEffect, useRef, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

const CreateSpaceModal = () => {
  const [showModal, setShowModal] = useState(false);
  const fileInputRef: any = useRef(null);
  const [addedImagesList, setAddedImagesList] = useState<string[]>([]);
  const [spaceTags, setSpaceTags] = useState("");
  const [spaceName, setSpaceName] = useState("");
  const [spaceDescription, setSpaceDescription] = useState("");
  const [placeId, setPlaceId] = useState(null);
  const [collectionNames, setCollectionNames] = useState<string[]>([]);
  const [selectedCollection, setSelectedCollection] = useState<string>("");

  const handleDivClick = (event: any) => {
    event.stopPropagation();
    // Trigger the click event on the hidden file input
    fileInputRef.current.click();
  };

  const handleFileUpload = async (event: any) => {
    const file = event.target.files[0];
    console.log(file);
    // console.log(await ())

    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const content = e.target.result;
        setAddedImagesList([...addedImagesList, content]);
      };

      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!!token) {
      fetchCollectionsNames();
    }
  }, []);

  const fetchCollectionsNames = async () => {
    try {
      const response = await fetch("http://localhost:3000/collectionNames", {
        method: "GET",
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setCollectionNames([...data.collectionNames]);
        console.log(collectionNames);
        setSelectedCollection(collectionNames[0]);
      } else {
        console.error("Failed to fetch collections");
      }
    } catch (error) {
      console.error("Error fetching collections:", error);
    }
  };

  // const onCollectionSelect = (key: string) => {};


  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("User not authenticated");
        return;
      }

      const tagsArray = spaceTags.split(" ").map(tag => tag.replace("#", ""));

      const formData = {
        spaceName: spaceName,
        spaceDescription: spaceDescription,
        spacetags: tagsArray,
        spaceImage: addedImagesList, // Assuming you want to use the first added image
        placeId: placeId,
        collectionNames: selectedCollection
      };  

      console.log(formData)

      const response = await fetch("http://localhost:3000/space", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Space added successfully!");
        setShowModal(false);
      } else {
        console.error("Failed to add space");
      }

    } catch (error) {
      console.error("Error submitting space:", error);
    }
  };

  return (
    <>
      <button
        className="text-white bg-transparent border-none cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        Add Space
      </button>

      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            // onClick={() => setShowModal(false)}
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between px-6 py-4  rounded-t">
                  <h3 className="text-3xl font-semibold">Add a Space</h3>
                </div>
                {/*body*/}
                <div className="relative px-6 flex-auto">
                  <div className="rounded-md p-2">
                    <div className="text-2xl text-black">Space Name</div>
                    <GooglePlacesAutocomplete
                      apiKey="AIzaSyBprJC4VwGTWaT9a7rI5reRU17jqXSuAIY"
                      selectProps={{
                        // value,
                        onChange(newValue: any, _) {
                          const placeName = newValue.label;
                          const placeId = newValue.value.place_id;
                          setPlaceId(placeId);
                          setSpaceName(placeName);
                        },
                      }}
                    />
                  </div>
                  <div className="p-2">
                    <div className="text-2xl text-black ">
                      Add to Collection
                    </div>
                    {collectionNames && (
                      <select
                        name="cars"
                        id="cars"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        onChange={(e: any) => {
                          setSelectedCollection(e.target.value);
                        }}
                        value={selectedCollection}
                      >
                        {collectionNames.map((item) => (
                          <option value={item}>{item}</option>
                        ))}
                      </select>
                    )}
                  </div>
                  <div className="rounded-md p-2">
                    <div className="text-2xl text-black">Add Image</div>
                    <div className="grid grid-container grid-cols-4 gap-2 ">
                      {addedImagesList &&
                        addedImagesList.map((item, i) => (
                          <AddCollectionImage key={i} item={item} />
                        ))}
                      <AddCollectionImageAdd
                        onClick={(e: any) => handleDivClick(e)}
                      />
                      <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        onChange={handleFileUpload}
                      />
                    </div>
                  </div>
                  <div className="rounded-md p-2">
                    <div className="text-2xl text-black">Add Tag</div>
                    <div className="mb-4">
                      <input
                        id="spaceTags"
                        value={spaceTags}
                        onChange={(e) => setSpaceTags(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="#tag1 #tag2"
                      ></input>
                    </div>
                  </div>
                  <div className="rounded-md p-2">
                    <div className="text-2xl text-black">Add Description</div>
                    <textarea
                      id="spaceDescription"
                      value={spaceDescription}
                      onChange={(e) => setSpaceDescription(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder=""
                    ></textarea>
                  </div>
                  {/* <div className="rounded-md p-2">
                    <div className="text-2xl text-black">Add location</div>
                  </div> */}
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-4 ">
                  <button
                    className="bg-white text-black border-2 border-black rounded-md  px-4 py-1 mx-1 hover:bg-gray-100"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-black text-white border-2 border-black rounded-md  px-4 py-1 mx-1 hover:bg-black/85"
                    type="button"
                    onClick={handleSubmit}
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

const AddCollectionImage = (props: { item: string }) => {
  const {
    item = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2264&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  } = props;

  return (
    <>
      <div>
        <img src={item} className="w-28 h-28 rounded-md"></img>
      </div>
    </>
  );
};

const AddCollectionImageAdd = (props: { onClick: any }) => {
  const { onClick } = props;
  return (
    <div
      className="flex items-center w-28 h-28 border-dotted border-gray-600 border-2 rounded-md text-center justify-center"
      onClick={onClick}
    >
      <div className="text-4xl w-full text-gray-600">+</div>
    </div>
  );
};

export default CreateSpaceModal;
