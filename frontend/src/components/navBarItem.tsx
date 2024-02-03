import { Link } from "react-router-dom";

const NavBarItem = (props: {
  link: string;
  text: string;
  disabled?: boolean;
  onClick?: () => void;
}) => {
  let { link, text, disabled = false, onClick } = props;
  return (
    <>
      <li>
        {!disabled ? (
          <Link
            to={link}
            className={`hover:text-slate-500  ${
              disabled ? "disabled-link" : ""
            }`}
          >
            {text}
          </Link>
        ) : (
          <div
            className="hover:text-slate-500"
            onClick={() => {
              onClick && onClick();
            }}
          >
            {text}
          </div>
        )}
      </li>
    </>
  );
};

export default NavBarItem;
