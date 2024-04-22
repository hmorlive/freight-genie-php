"use client";
import { useEffect } from "react";
import { ScrollProvider, useScrollBlock } from "./nav-scroll-context";

export function NavScrollProvider({ children }) {
  const { blockScroll } = useScrollBlock();

  useEffect(() => {
    document.body.classList.toggle("no-scroll", blockScroll);
  }, [blockScroll]);

  return (
    <ScrollProvider>
      <body className={`${changa.className} flex flex-col min-h-screen`}>
        {children}
      </body>
    </ScrollProvider>
  );
}
