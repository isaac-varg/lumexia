"use client";
import React from "react";
import AliasDialog from "./AliasDialog";
import ActionButton from "@/components/ActionButton";
import Card from "@/components/Card";
import Layout from "@/components/Layout";
import { TbPlus } from "react-icons/tb";
import useDialog from "@/hooks/useDialog";
import { Item } from "@/types/item";
import { AliasType } from "@/types/aliasType";
import { useItemDashboardActions } from "@/store/itemDashboardSlice";
import { Supplier } from "@/actions/purchasing/suppliers/getAll";

const AliasDialogTitleRow = ({
    item,
    aliasTypes,
    suppliers,
}: {
    item: Item;
    aliasTypes: AliasType[];
    suppliers: Supplier[]
}) => {
    const dialog = useDialog();

    const { setAliasDialogMode, setSelectedAlias } = useItemDashboardActions()
    const handleClick = () => {
        setSelectedAlias(null)
        setAliasDialogMode('create')
        dialog.showDialog("aliasDialog")
    }


    return (
        <>
            <AliasDialog item={item} aliasTypes={aliasTypes} suppliers={suppliers} />
            <Layout.Row>
                <Card.Title>Aliases</Card.Title>
                <ActionButton onClick={() => handleClick()}>
                    <TbPlus />
                </ActionButton>
            </Layout.Row>
        </>
    );
};

export default AliasDialogTitleRow;
