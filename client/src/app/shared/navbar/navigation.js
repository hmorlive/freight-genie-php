"use client";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { DropdownMenu, NavButton, NavItem } from "./nav-items";
import Link from "next/link";

// renders nav bar
export default function Navigation() {
  const [openMenu, setMenuOpen] = useState(false);
  const [openDropdown, setDropdownOpen] = useState("");

  const toggleDropdown = (dropdown) => {
    setDropdownOpen(openDropdown !== "" ? "" : dropdown);
  };

  const toggleMenu = () => {
    setMenuOpen(!openMenu);
    toggleDropdown("");
  };

  const closeMenuAndNavigate = () => {
    setMenuOpen(false);
    setDropdownOpen("");
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    openMenu || openDropdown !== ""
      ? document.body.classList.add("overflow-hidden")
      : document.body.classList.remove("overflow-hidden");
  }, [openMenu, openDropdown]);

  return (
    <header
      className={`md:mx-auto bg-white w-full ${
        openMenu ? "text-black" : "text-black"
      } flex justify-center items-center sticky top-0 z-20`}
    >
      <nav
        className={`bg-opacity-95 flex items-center w-full p-5 md:p-4 justify-between md:rounded-md`}
      >
        <Link
          href={"/"}
          title="Go to home page"
          className={`flex gap-2 items-center z-30`}
        >
          <img src="logo.png" alt="Freight Genie Logo" className="w-[60px] h-auto max-w-1/2 diagonal-rounded" />
          <span className="text-3xl font-bold text-sky-600">FreightGenie</span>
        </Link>
        <button
          aria-label="toggle navigation menu"
          onClick={toggleMenu}
          className="md:hidden z-20"
        >
          <FontAwesomeIcon
            icon={openMenu ? faTimes : faBars}
            className={`text-black fa-lg`}
          />
        </button>
        <div
          className={`${
            openMenu
              ? "fixed top-0 right-0 h-screen w-full items-center justify-center flex bg-white overflow-y-auto"
              : "hidden"
          } md:relative md:flex md:w-auto h-fit text-base md:text-sm`}
        >
          <ul
            className={`${
              openMenu ? "p-4 pt-[10vh]" : null
            } flex ml-0 list-none text-xl flex-col gap-20  sm:gap-6 justify-start overflow-scroll md:overflow-visible md:justify-center items-center h-full md:flex-row md:text-sm`}
          >
            <NavItem
              title="Home"
              href="/"
              closeMenuAndNavigate={closeMenuAndNavigate}
            />
            <NavItem title={"Contact"} href="/contact" closeMenuAndNavigate={closeMenuAndNavigate} />
            <NavItem
              title="About"
              href="/about"
              closeMenuAndNavigate={closeMenuAndNavigate}
            />
            <NavButton
              title="Track"
              href="/track"
              closeMenuAndNavigate={closeMenuAndNavigate}
            />
          </ul>
        </div>
      </nav>
    </header>
  );
}
