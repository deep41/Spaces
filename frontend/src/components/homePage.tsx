const HomePage = () => {
  return (
    <>
      <div
        className="grid grid-flow-col"
        style={{ height: "calc(100vh - 40px)" }}
      >
        <div className="col-span-7">
          <h1>Hello</h1>
        </div>
        <div className="col-span-4 bg-gray-100/30">
          <div className="pw-10 ph-2">
            <div className="text-xl">My Spaces</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
