import {
  faArrowAltCircleRight,
  faArrowLeft,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

// renders a dropdown menu
export function DropdownMenu({
  children,
  toggleDropdown,
  dropdownName,
  openDropdown,
  title,
  openMenu,
}) {
  return (
    <li className="relative group">
      <span
        onClick={() => toggleDropdown(dropdownName)}
        tabIndex={0}
        aria-label={`open ${dropdownName} dropdown`}
      >
        <span>{title}</span>
        <FontAwesomeIcon icon={faCaretDown} className="text-xs ml-1" />
      </span>
        <ul
          className={`left-0 z-40 rounded-md shadow-md ${
            openMenu && openDropdown === dropdownName
              ? "bg-white text-black"
              : "bg-zinc-900 text-white"
          } ${
            openDropdown === dropdownName
              ? "fixed flex flex-col text-xl w-full h-screen top-0 p-4 pt-[10vh] items-center overflow-y-auto  gap-20  text-left"
              : "absolute top-full hidden md:group-hover:flex flex-col  gap-6 py-10 pl-10 pr-20 bg-opacity-95"
          }`}
        >
          {children}
          {openDropdown === dropdownName ? (
            <li
              className={`${
                openMenu ? "text-black" : "text-white"
              } hover:cursor-pointer hover:text-blue-800 font-extralight p-2 border-t border-slate-100`}
              onClick={() => toggleDropdown("")}
              tabIndex={0}
              aria-label="close dropdown"
            >
              <FontAwesomeIcon icon={faArrowLeft} size="xs" className="mr-2" />
              Back
            </li>
          ) : null}
        </ul>
    </li>
  );
}

// renders a navigation item
export function NavItem({ title, href, closeMenuAndNavigate }) {
  if (!title || !href) return null;
  return (
    <li className="hover:text-blue-900">
      <Link href={href} onClick={() => closeMenuAndNavigate({ href })}>
        <span>{title}</span>
      </Link>
    </li>
  );
}

// renders a navigation button
export function NavButton({ title, href, closeMenuAndNavigate }) {
  if (!title || !href) return null;
  return (
    <li className="btn">
      <Link href={href} onClick={() => closeMenuAndNavigate({ href })}>
        {title}
      </Link>
    </li>
  );
}
