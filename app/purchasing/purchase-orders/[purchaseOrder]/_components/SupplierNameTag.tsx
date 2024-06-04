"use client";

import { Supplier } from "@/types/supplier";
import { useRouter } from "next/navigation";

const SupplierNameTag = ({ supplier }: { supplier: Supplier }) => {
  const router = useRouter();

  const handleClick = () => {
    const formattedName = supplier.name.replace(/\s+/g, "-").toLowerCase();
    router.push(
      `/purchasing/suppliers/${`${formattedName}?id=${supplier.id}`} `
    );
  };

  return (
    <span className="flex flex-row gap-x-4 items-center hover:cursor-pointer" onClick={handleClick}>
      <div className="bg-limed-spruce-400 rounded-full w-16 h-16" />

      <div>
        <h2 className="font-semibold font-inter">{supplier.name}</h2>
        <h2 className="font-medium text-slate-600">12 previous orders</h2>
      </div>
    </span>
  );
};

export default SupplierNameTag;
