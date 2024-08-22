import Dialog from "@/components/Dialog";
import React, { useEffect, useState } from "react";
import { Wizard } from "react-use-wizard";
import Step3A from "./Step3A";
import Step3B from "./Step3B";
import { ItemDataForSearch } from "../../ItemSearch";
import { Item } from "@/types/item";

const AddItemDialog = ({ items }: { items: ItemDataForSearch[], }) => {

  const [selectedItem, setSelectedItem] = useState<Item | null>(null)

  const handleItemClick = (item: any) => {
    setSelectedItem(item)
  };

  return (
    <>
      <Dialog.Root identifier="AddBomItemDialog">
        <Wizard>
          <Step3A items={items} onItemSelection={handleItemClick} isItemSelected={selectedItem !== null} />
          <Step3B selectedItem={selectedItem} />
        </Wizard>
      </Dialog.Root>
    </>
  );
};

export default AddItemDialog;
