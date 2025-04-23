import prisma from "@/lib/prisma"
import Panel from "../Panel"
import ItemTypeChart from "./ItemTypeChart";

const Items = async () => {

    const itemTypeCounts = await prisma.item.groupBy({
        by: ['itemTypeId'],
        _count: {
            _all: true
        },

    })

    const itemTypeIds = itemTypeCounts.map((item) => item.itemTypeId);

    const itemTypes = await prisma.itemType.findMany({
        where: {
            id: {
                in: itemTypeIds,
            },
        },
        select: {
            id: true,
            name: true,
        },
    });

    const itemTypeNameMap = new Map(itemTypes.map((type) => [type.id, type.name]));

    const itemCountsWithTypeNames = itemTypeCounts.map((itemCount) => ({
        itemTypeId: itemCount.itemTypeId,
        count: itemCount._count._all,
        itemTypeName: itemTypeNameMap.get(itemCount.itemTypeId),
    }));


    return (
        <Panel title="Items" titlePath="/inventory/items">

        <ItemTypeChart itemTypes={itemCountsWithTypeNames}/>
        </Panel>
    )
}

export default Items
