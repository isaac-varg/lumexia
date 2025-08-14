"use client"
import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { TbArrowLeft, TbHome, TbSlash } from "react-icons/tb";

const PageBreadcrumbs = () => {
  const pathname = usePathname();
  const router = useRouter();
  const segments = pathname.split("/").filter((segment) => segment !== "");

  return (
    <div className="flex flex-row space-x-2 items-center">

      <button className="btn btn-soft py-1 px-2" onClick={() => router.back()}>
        <TbArrowLeft className="text-2xl btn-soft" />
      </button>

      <button className="btn btn-soft py-1 px-2" onClick={() => router.push('/')}>
        <TbHome className="text-2xl btn-soft" />
      </button>

      {segments.map((segment, index) => {
        const isLast = index === segments.length - 1;
        const path = `/${segments.slice(0, index + 1).join("/")}`

        const handleClick = () => {
          if (isLast) {
            router.refresh();
            return;
          }
          router.push(path)
        }

        return (
          <React.Fragment key={index}>
            <TbSlash className="text-2xl text-base-content/40" />
            <button
              className="btn btn-ghost font-poppins items-center text-lg font-medium "
              onClick={() => handleClick()}
            >
              {segment}
            </button>
          </React.Fragment>
        )
      })}

    </div>
  );
};

export default PageBreadcrumbs;

