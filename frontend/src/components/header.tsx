import { useState } from "react";
import NavBarItem from "./navBarItem";
import NavBar from "./navBar";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      <div className="sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 bg-white supports-backdrop-blur:bg-white/95">
        <div className="max-w-8xl mx-auto">
          <div className="py-4 border-b border-slate-900/10 lg:border-0 mx-4 lg:mx-0">
            <div className="relative flex items-center">
              {/* <a
                className="mr-3 flex-none w-[2.0625rem] overflow-hidden md:w-auto"
                href={isLoggedIn ? "/dashboard" : "/"}
              >
                <img
                  alt="logo"
                  src="/images/wolfjobs-logo.png"
                  className="h-10 p-0"
                />

              </a> */}
              <ul className="ml-4 flex space-x-8">
                <NavBarItem link="/home" text="Home" />
                <NavBarItem link="/explore" text="Explore" />
                <NavBarItem link="/near" text="Near me" />
                {/* {role == "Manager" && isLoggedIn && (
                )}
                {role == "Applicant" && isLoggedIn && (
                  <NavBarItem link="/dashboard" text="My Applications" />
                )}
                {isLoggedIn && <NavBarItem link="/explore" text="All jobs" />} */}
              </ul>
              <NavBar />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
