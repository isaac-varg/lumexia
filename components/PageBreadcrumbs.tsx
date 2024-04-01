"use client"
import React from "react";
import { usePathname } from "next/navigation";

const PageBreadcrumbs = () => {
  const pathname = usePathname();

  const segments = pathname.split("/").filter((segment) => segment !== "");

  return (
    <div className="flex items-center space-x-2">
      <a href="/" className="text-gray-500 hover:text-gray-700">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10.707 3.293a1 1 0 010 1.414L6.414 9H17a1 1 0 010 2H6.414l4.293 4.293a1 1 0 11-1.414 1.414l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </a>
      {segments.map((segment, index) => (
        <React.Fragment key={index}>
          <span className="text-gray-500">/</span>
          <a
            href={`/${segments.slice(0, index + 1).join("/")}`}
            className="text-gray-500 hover:text-gray-700"
          >
            {segment}
          </a>
        </React.Fragment>
      ))}
    </div>
  );
};

export default PageBreadcrumbs;
