import { useState } from "react";
import NavBarItem from "./navBarItem";
import NavProfileImage from "./navProfileImage";

const NavBar = () => {
  //   const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  // const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <>
      <div className="relative hidden lg:flex items-center ml-auto mr-8">
        <nav className="text-sm leading-6 font-semibold text-slate-700 ">
          <ul className="flex space-x-8">
            {/* {isLoggedIn && <NavBarItem link="/profile" text="Profile" />}
            {isLoggedIn && <NavBarItem link="/logout" text="Log Out" />} */}
            <NavBarItem link="/profile" text="User Name" />
            <NavProfileImage link="/profile" imamgeLink="User Name" />
          </ul>
        </nav>
      </div>
    </>
  );
};

export default NavBar;
