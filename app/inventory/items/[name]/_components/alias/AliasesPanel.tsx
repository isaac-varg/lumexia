import Card from "@/components/Card";
import LabelDataPair from "@/components/Text/LabelDataPair";
import { Alias } from "@/types/alias";
import React from "react";
import { Item } from "@/types/item";
import AliasDialogTitleRow from "./AliasDialogTitleRow";
import aliasTypeActions from "@/actions/inventory/aliasTypes";
import supplierActions from "@/actions/purchasing/supplierActions";
import { staticRecords } from "@/configs/staticRecords";
import { IAliasWithSupplier } from "../../_functions/getAliases";
import Aliases from "./Aliases";

const AliasesPanel = async ({ aliases, item }: { aliases: IAliasWithSupplier[]; item: Item }) => {

    const aliasTypes = await aliasTypeActions.getAll();

    const suppliers = await supplierActions.getAll();

    return (
        <>
            <Card.Root>
                <AliasDialogTitleRow item={item} aliasTypes={aliasTypes} suppliers={suppliers} />
                <Aliases />
            </Card.Root>
        </>
    );
};

export default AliasesPanel;
