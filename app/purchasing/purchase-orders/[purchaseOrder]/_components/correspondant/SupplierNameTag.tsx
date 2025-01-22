"use client";

import { useRouter } from "next/navigation";
import { Supplier } from "@prisma/client";
import Image from "next/image";

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
      <div className="w-16 h-16">
        <Image
            src={'https://picsum.photos/200'}
            width={200}
            height={200}
            alt="Supplier picture"
            className="rounded-full"
        />
    </div>

      <div>
        <h2 className="font-semibold font-inter">{supplier.name}</h2>
      </div>
    </span>
  );
};

export default SupplierNameTag;
