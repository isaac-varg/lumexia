import Card from "@/components/Card";
import LabelDataPair from "@/components/Text/LabelDataPair";
import { Alias } from "@/types/alias";
import React from "react";
import { Item } from "@/types/item";
import AliasDialogTitleRow from "./AliasDialogTitleRow";
import aliasTypeActions from "@/actions/inventory/aliasTypes";
import supplierActions from "@/actions/purchasing/supplierActions";

const AliasesPanel = async ({ aliases, item }: { aliases: Alias[]; item: Item }) => {

    const aliasTypes = await aliasTypeActions.getAll();

    const suppliers = await supplierActions.getAll();
    
    return (
        <>
            <Card.Root>
                <AliasDialogTitleRow item={item} aliasTypes={aliasTypes}  suppliers={suppliers}/>
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
