import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white p-4 flex flex-col items-center justify-between">
      <div className="w-full flex flex-col md:flex-row items-center md:justify-between align-center gap-3">
        <p>© 2024 Freight Genie</p>
        <ul className="list-none flex items-center text-xs">
          <li className="mx-2">
            <Link href="/privacy">Privacy Policy</Link>
          </li>
          <li className="mx-2">
            <Link href="/terms">Terms and Conditions</Link>
          </li>
        </ul>
      </div>
      <hr className="w-full md:w-1/3 border-1 border-gray-200 my-2" />
      <div className="w-full flex flex-col items-center justify-center">
        <div className="flex flex-col text-center items-center md:items-end mt-4 md:mt-0 gap-2">
          <p className="mb-2 font-normal text-sm text-center">
            &copy; {new Date().getFullYear()} Freight Genie by Hazmed
            Moreno. This is a demo application. All rights reserved.
          </p>
        </div>
        <Link
          href={"https://github.com/hmorlive/freight-genie"}
          target="_black"
          aria-label="Link to Github Repo"
          title="Link to Github Repo"
        >
          <FontAwesomeIcon icon={faGithub} />
        </Link>
      </div>
    </footer>
  );
}
