import { Link } from "react-router-dom";

const NavProfileImage = (props: { link: string; imamgeLink: string }) => {
  let { link, imamgeLink } = props;
  return (
    <>
      <li>
        <Link to={link} className="hover:text-slate-500 rounded-3xl">
          <img
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2264&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Profile Image"
            className="h-6 w-6 rounded-full"
          />
        </Link>
      </li>
    </>
  );
};

export default NavProfileImage;
