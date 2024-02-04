const SpaceImage = (props: { imageLink?: string }) => {
  const {
    imageLink = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2264&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  } = props;
  return (
    <>
      <div className="pr-6 py-2" style={{ flex: "0 0 auto" }}>
        <img
          src={"data:image/jpeg;base64," + imageLink.substring(20)}
          alt="Failed to load"
          className=" rounded-md"
          height="240px"
          width="300px"
        />
      </div>
    </>
  );
};

export default SpaceImage;
