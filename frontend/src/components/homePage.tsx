import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!!!token) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <div className="flex flex-row" style={{ height: "calc(100vh - 40px)" }}>
        <div className="" style={{ width: "calc(100vw * 0.7)" }}>
          <h1>Hello</h1>
        </div>
        <div className=" bg-gray-100/30" style={{ width: "calc(100vw * 0.3)" }}>
          <div className="pw-10 ph-2">
            <div className="text-3xl mx-4 mt-4">My Collections</div>
            <div className="grid-container grid grid-cols-3 ">
              <SpaceItem text={"Item 1"} />
              <SpaceItem text={"Item 2"} />
              <SpaceItem text={"Item 3"} />
              <SpaceItem text={"Item 4"} />
              <SpaceItem text={"Item 5"} />
              <SpaceItem text={"Item 6"} />
              <SpaceItem text={"Item 7"} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const SpaceItem = (props: any) => {
  const {
    imageLink = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2264&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    text,
  } = props;

  return (
    <>
      <div className="flex flex-col items-center rounded-md hover:bg-gray-200/50 gap-2 pb-2 pt-1 ">
        <div className="mx-4 my-2">
          <img
            src={imageLink}
            alt="Profile Image"
            className="rounded-md w-20 h-20 object-fill"
          />
        </div>
        <div>{text}</div>
      </div>
    </>
  );
};

export default HomePage;
