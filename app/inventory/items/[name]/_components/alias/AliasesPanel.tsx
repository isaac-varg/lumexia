import ActionButton from "@/components/ActionButton";
import Card from "@/components/Card";
import Layout from "@/components/Layout";
import LabelDataPair from "@/components/Text/LabelDataPair";
import { Alias } from "@/types/alias";
import React from "react";
import { TbPlus } from "react-icons/tb";
import AliasDialog from "./AliasDialog";
import { Item } from "@/types/item";
import AliasDialogTitleRow from "./AliasDialogTitleRow";
import aliasTypeActions from "@/actions/inventory/aliasTypes";

const AliasesPanel = async ({ aliases, item }: { aliases: Alias[]; item: Item }) => {

    const aliasTypes = await aliasTypeActions.getAll();
  return (
    <>
      <Card.Root>
        <AliasDialogTitleRow item={item} aliasTypes={aliasTypes} />
        {aliases.map((alias: Alias) => (
          <LabelDataPair
            key={alias.id}
            label={alias.aliasType ? alias.aliasType.name : "Alias"}
            data={alias.name}
          />
        ))}
      </Card.Root>
    </>
  );
};

export default AliasesPanel;
